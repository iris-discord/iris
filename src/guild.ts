import { request } from "undici";
import { getJSONResponse } from "./util";

let token: any;

export async function setData(botToken: any) {
    token = botToken;
}

export async function fetchGuild(guildID: any) {
    const response = await request(`https://discord.com/api/v10/guilds/${guildID}`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${token}`
        }
    });

    const data = await getJSONResponse(response.body);

    return new Guild(data);
}

async function fetchGuildVoiceStates(guildID: any, token: any) {
    const response = await request(`https://discord.com/api/v10/guilds/${guildID}/voice-states`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${token}`,
        },
    });

    return await getJSONResponse(response.body);
}

async function fetchGuildChannels(guildID: any, token: any) {
    const response = await request(`https://discord.com/api/v10/guilds/${guildID}/channels`, {
        method: "GET",
        headers: {
            Authorization: `Bot ${token}`
        }
    });

    return await getJSONResponse(response.body);
}

export class Guild {
    id: any;
    name: any;
    icon: any;
    description: any;
    splash: any;
    discoverySplash: any;
    features: any;
    emojis: any;
    banner: any;
    ownerId: any;
    applicationId: any;
    region: any;
    afkChannelId: any;
    afkTimeout: any;
    aflChannelId: any;
    systemChannelId: any;
    widgetEnabled: any;
    widgetChannelId: any;
    verificatioLevel: any;
    roles: Map<any, any>;
    defaultMessageNotifications: any;
    explicitContentFilter: any;
    mfaLevel: any;
    maxPresences: any;
    maxMembers: any;
    maxVideoChannelUsers: any;
    vanityUrlCode: any;
    premiumTier: any;
    premiumSubscriptionCount: any;
    systemChannelFlags: any;
    preferredLocale: any;
    publicUpdatesChannelId: any;
    rulesChannelId: any;
    channels: Map<any, any>;
    voiceStates: Map<any, any>;
    constructor(guildData: any) {
        this.id = guildData.id;
        this.name = guildData.name;
        this.icon = guildData.icon;
        this.description = guildData.description;
        this.splash = guildData.splash;
        this.discoverySplash = guildData.discovery_splash;
        this.features = guildData.features;
        this.emojis = guildData.emojis;
        this.banner = guildData.banner;
        this.ownerId = guildData.owner_id;
        this.applicationId = guildData.application_id;
        this.region = guildData.region;
        this.channels = new Map();
        this.afkChannelId = guildData.afk_channel_id;
        this.afkTimeout = guildData.afk_timeout;
        this.aflChannelId = guildData.afk_channel_id;
        this.afkTimeout = guildData.afk_timeout;
        this.systemChannelId = guildData.system_channel_id;
        this.widgetEnabled = guildData.widget_enabled;
        this.widgetChannelId = guildData.widget_channel_id;
        this.verificatioLevel = guildData.verification_level;
        this.roles = new Map();
        this.defaultMessageNotifications = guildData.default_message_notifications;
        this.explicitContentFilter = guildData.explicit_content_filter;
        this.mfaLevel = guildData.mfa_level;
        this.maxPresences = guildData.max_presences;
        this.maxMembers = guildData.max_members;
        this.maxVideoChannelUsers = guildData.max_video_channel_users;
        this.vanityUrlCode = guildData.vanity_url_code;
        this.premiumTier = guildData.premium_tier;
        this.premiumSubscriptionCount = guildData.premium_subscription_count;
        this.systemChannelFlags = guildData.system_channel_flags;
        this.preferredLocale = guildData.preferred_locale;
        this.publicUpdatesChannelId = guildData.public_updates_channel_id;
        this.rulesChannelId = guildData.rules_channel_id;
        this.voiceStates = this.#parseVoiceStates(guildData.voice_states);

        this.#fetchChannels();

    }

    #parseVoiceStates(voiceStates: any) {
        const voiceStatesMap = new Map();

        if (voiceStates) {
            for (const voiceState of voiceStates) {
                voiceStatesMap.set(voiceState.user_id, voiceState);
            }
        }

        return voiceStatesMap;
    }

    async #fetchChannels() {
        await fetchGuildChannels(this.id, token).then((channels: any) => {
            for (const channel of channels) {
                this.channels.set(channel.id, channel);
            }
        });
    }

    async fetchChannels() {
        const channels = await fetchGuildChannels(this.id, token);
        const channelsMap = new Map();

        for (const channel of channels) {
            channelsMap.set(channel.id, channel);
        }

        return channelsMap;
    }

    async updateVoiceStates(voiceState: any) {
        this.voiceStates.set(voiceState.user_id, voiceState);
    }
}