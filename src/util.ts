import events from "events";

export async function getJSONResponse(body: any) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}
	return JSON.parse(fullBody);
}

export class heartBeater {
    private interval: any;
    private connection: any;
    hearbeatInterval: any;
    private events = new events.EventEmitter();
    heartBeatCount: number;

    constructor() {
        this.heartBeatCount = 0;
    }

    public start(interval: number, connection: any) {
        this.connection = connection;
        this.hearbeatInterval = interval;
        this.interval = setInterval(() => {
            this.connection.sendUTF(JSON.stringify({
                op: 1,
                d: null
            }));
            this.heartBeatCount++;
            this.events.emit('heartbeat');
        }, interval);
    }

    public onHeartBeat(callback: any) {
        this.events.on('heartbeat', () => {
            callback(this.heartBeatCount);
        });
    }

    public stop() {
        clearInterval(this.interval);
    }
}

export class cache {
    private cacheGuilds: any = new Map();
    private voiceStatesCache: any = new Map();

    public addGuild(guild: any) {
        this.cacheGuilds.set(guild.id, guild);
    }

    public addVoiceState(voiceState: any) {
        this.voiceStatesCache.set(voiceState.user_id, voiceState);
    }

    public removeVoiceState(voiceState: any) {
        this.voiceStatesCache.delete(voiceState.user_id);
    }

    get guilds() {
        return this.cacheGuilds;
    }

    get voiceStates() {
        return this.voiceStatesCache;
    }
}