import { client as WebSocketClient } from 'websocket';
import events from 'events';
import { request } from 'undici'
import { getJSONResponse, heartBeater, cache } from './util';

/*let Sodium: any;

export class VoiceConnection {
    guildID: any;
    channelID: any;
    clientWS: any;
    ws: WebSocketClient;
    WSconnection: any;
    wsHeartBeater: heartBeater;
    constructor(data: any) {
        this.guildID = data.guildID;
        this.channelID = data.channelID;
        this.clientWS = data.ws;
        //this.userID = data.userID;

        try {
            Sodium = require('libsodium-wrappers');
        } catch (e) {
            throw new Error('libsodium-wrappers not found. To use voice, please install libsodium-wrappers.');
        }

        
    }

    public async connect() {
        
    }
}*/
