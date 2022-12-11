import { request } from 'undici';
import { Guild, fetchGuild } from './guild';

let token: any;

export async function setData(botToken: any) {
    token = botToken;
}

export class Message {
    type: any;
    tts: any;
    timestamp: any;
    pinned: any;
    nonce: any;
    referencedMessage: any;
    mentions: any;
    mentionRoles: any;
    mentionEveryone: any;
    member: any;
    id: any;
    flags: any;
    embeds: any;
    components: any;
    content: any;
    channelId: any;
    author: any;
    attachments: any;
    guildId: any;
    constructor(data: any) {
        this.type = data.type;
        this.tts = data.tts;
        this.timestamp = data.timestamp;
        this.pinned = data.pinned;
        this.nonce = data.nonce;
        this.referencedMessage = data.referenced_message;
        this.mentions = data.mentions;
        this.mentionRoles = data.mention_roles;
        this.mentionEveryone = data.mention_everyone;
        this.member = data.member;
        this.id = data.id;
        this.flags = data.flags;
        this.embeds = data.embeds;
        this.components = data.components;
        this.content = data.content;
        this.channelId = data.channel_id;
        this.author = data.author;
        this.attachments = data.attachments;
        this.guildId = data.guild_id;
    }

    get guild() {
        return fetchGuild(this.guildId);
    }

    async reply(content: any) {
        if (typeof content === 'string') {
            const data =  {
                content: content,
                message_reference: {
                    message_id: this.id,
                    channel_id: this.channelId,
                    guild_id: this.guildId
                }
            }

            const res = await request(`https://discord.com/api/v10/channels/${this.channelId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else if (typeof content === "object") {
            const data = {
                content: content.content,
                embeds: content.embeds,
                message_reference: {
                    message_id: this.id,
                    channel_id: this.channelId,
                    guild_id: this.guildId
                }
            }

            const res = await request(`https://discord.com/api/v10/channels/${this.channelId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
    }
}