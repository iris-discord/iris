import { client as WebSocketClient } from 'websocket';
import events from 'events';
import { request } from 'undici'
import { getJSONResponse, heartBeater, cache } from './util';
import { setData as GuildSetdata, Guild } from './guild';
import { setData as MessageSetdata, Message } from './message';
import { joinVoiceChannel } from '@discordjs/voice';
let botToken: any;
let baseApiUrl: string = 'https://discord.com/api/v10/';


const methodMap = new Map<string, import("@discordjs/voice").DiscordGatewayAdapterLibraryMethods>();

export function voiceAdapterCreator(userID: string, guildID: string): import("@discordjs/voice").DiscordGatewayAdapterCreator {
    const key = `${userID}.${guildID}`;

    return methods => {
		methodMap.set(key, methods);
		return {
			sendPayload: payload => {
				return !!payload;
			},
			destroy: () => {
				methodMap.delete(key);
			}
		};
	};
}

export class Client {
    private ws: WebSocketClient;
    private events = new events.EventEmitter();
    cache: any = new cache();
    intentsArray: any;
    intents: number;
    heartBeater: heartBeater;
    user: any;
    resumeGatewayUrl: any;
    sessionId: any;
    sessionType: any;
    VoiceConnections: any = new Map();
    connection: any;
    voiceAdpters: Map<any, any>;
    
    
    constructor(data: any) {
        this.ws = new WebSocketClient();
        this.intentsArray = data.intents;
        this.intents = 20;
        this.heartBeater = new heartBeater();
        this.voiceAdpters = new Map();

        this.heartBeater.onHeartBeat((count: number) => {
            this.events.emit('heartbeat', count);
        });

        for (const intent of this.intentsArray) {
            this.intents += intent;
        }
    }

    public on(event: string, callback: any) {
        this.events.on(event, callback);
    }

    public once(event: string, callback: any) {
        this.events.once(event, callback);
    }

    public async joinVoiceChannel(channelId: string, guildId: string, userId: string) {

        /*this.connection.sendUTF(JSON.stringify({
            op: 4,
            d: {
                guild_id: guildId,
                channel_id: channelId,
                self_mute: false,
                self_deaf: false
            }
        }));*/

        return joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: this.getGuildVoiceAdapterCreator(guildId)
        });
    }

    public getGuildVoiceAdapterCreator(guildId: string) {
        return (methods: any) => {
            this.voiceAdpters.set(guildId, methods);
            return {
                sendPayload: (payload: any) => {
                    this.connection.sendUTF(JSON.stringify(payload));
                    return true;
                },
                destroy: () => {
                    this.voiceAdpters.delete(guildId);
                }
            };
        }
    }
    
    public async login(token: string) {
        botToken = token;
        GuildSetdata(botToken);
        MessageSetdata(botToken);
        const gateWayData = await request('https://discord.com/api/v10/gateway/bot', {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`
            }
        });

        const gateWayUrl = await getJSONResponse(gateWayData.body).then((data: any) => data.url).then((url: string) => {
            return url + '?v=10&encoding=json';
        });

        this.ws.on('connectFailed', (error: any) => {
            throw new Error(error);
        });

        this.ws.on('connect', (connection: any) => {
            this.connection = connection;
            connection.on('message', async (message: any) => {
                if (message.type === 'utf8') {
                    const data = JSON.parse(message.utf8Data);
                    if (data.op === 10) {
                        this.heartBeater.start(data.d.heartbeat_interval, connection);
                    } else if (data.op === 0) {
                        if (data.t === 'READY') {
                            this.user = data.d.user;
                            this.resumeGatewayUrl = data.d.resume_gateway_url;
                            this.sessionId = data.d.session_id;
                            this.sessionType = data.d.session_type;
                            this.events.emit('ready');
                        } else if (data.t === 'GUILD_CREATE') {
                            this.cache.addGuild(new Guild(data.d));
                            this.events.emit('guildCreate', new Guild(data.d));
                        } else if (data.t === 'MESSAGE_CREATE') {
                            this.events.emit('messageCreate', new Message(data.d));
                        } else if (data.t === 'VOICE_STATE_UPDATE') {

                            //console.log(data.d);

                            if (data.d.channel_id) {
                                this.cache.addVoiceState(data.d);
                                this.cache.guilds.get(data.d.guild_id).voiceStates.set(data.d.channel_id, data.d);
                            } else {
                                this.cache.guilds.get(data.d.guild_id).voiceStates.set(data.d.channel_id, data.d);
                                this.cache.removeVoiceState(data.d);
                            }

                            const userID = this.user.id;

                            const guildID = data.d.guild_id;

                            const methods = this.voiceAdpters.get(guildID);

                            if (methods) {
                                methods.onVoiceStateUpdate(data.d);
                            }

                            this.events.emit('voiceStateUpdate', data.d);
                        } else if (data.t === 'VOICE_SERVER_UPDATE') {
                            const userID = this.user.id;

                            const guildID = data.d.guild_id;

                            const methods = this.voiceAdpters.get(guildID);

                            //console.log(methods);

                            if (methods) {
                                methods.onVoiceServerUpdate(data.d);
                            }
                        }
                    }
                }
            });

            connection.sendUTF(JSON.stringify({
                op: 2,
                d: {
                    token: token,
                    intents: this.intents,
                    properties: {
                        $os: 'linux',
                        $browser: 'iris',
                        $device: 'iris'
                    }
                }

            }));
        });

        this.ws.connect(gateWayUrl);
    }
}