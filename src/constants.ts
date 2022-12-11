export class Constants {
    static readonly opcodes = {
        DISPATCH: 0,
        HEARTBEAT: 1,
        IDENTIFY: 2,
        PRESENCE_UPDATE: 3,
        VOICE_STATE_UPDATE: 4,
        RESUME: 6,
        RECONNECT: 7,
        REQUEST_GUILD_MEMBERS: 8,
        INVALID_SESSION: 9,
        HELLO: 10,
        HEARTBEAT_ACK: 11
    }

    static readonly events = {
        ready: 'ready',
        messageCreate: 'messageCreate',
        messageUpdate: 'messageUpdate',
        messageDelete: 'messageDelete',
        messageDeleteBulk: 'messageDeleteBulk',
        messageReactionAdd: 'messageReactionAdd',
        messageReactionRemove: 'messageReactionRemove',
        messageReactionRemoveAll: 'messageReactionRemoveAll',
        messageReactionRemoveEmoji: 'messageReactionRemoveEmoji',
        guildCreate: 'guildCreate',
        guildUpdate: 'guildUpdate',
        guildDelete: 'guildDelete',
        guildBanAdd: 'guildBanAdd',
        guildBanRemove: 'guildBanRemove',
        guildEmojisUpdate: 'guildEmojisUpdate',
        guildIntegrationsUpdate: 'guildIntegrationsUpdate',
        guildMemberAdd: 'guildMemberAdd',
        guildMemberRemove: 'guildMemberRemove',
        guildMemberUpdate: 'guildMemberUpdate',
        guildMembersChunk: 'guildMembersChunk',
        guildRoleCreate: 'guildRoleCreate',
        guildRoleUpdate: 'guildRoleUpdate',
        guildRoleDelete: 'guildRoleDelete',
        inviteCreate: 'inviteCreate',
        inviteDelete: 'inviteDelete',
        presenceUpdate: 'presenceUpdate',
        typingStart: 'typingStart',
        userUpdate: 'userUpdate',
        voiceStateUpdate: 'voiceStateUpdate',
        voiceServerUpdate: 'voiceServerUpdate',
        webhooksUpdate: 'webhooksUpdate',
        interactionCreate: 'interactionCreate',
        shardReady: 'shardReady',
        shardResume: 'shardResume',
        shardDisconnect: 'shardDisconnect',
        shardError: 'shardError',
        shardReconnecting: 'shardReconnecting',
        invalidSession: 'invalidSession',
        raw: 'raw',
        debug: 'debug',
        warn: 'warn',
        error: 'error',
        rateLimit: 'rateLimit',
        shardRateLimit: 'shardRateLimit'
    }

    static readonly intents = {
        guilds: 1 << 0,
        guildMembers: 1 << 1,
        guildBans: 1 << 2,
        guildEmojis: 1 << 3,
        guildIntegrations: 1 << 4,
        guildWebhooks: 1 << 5,
        guildInvites: 1 << 6,
        guildVoiceStates: 1 << 7,
        guildPresences: 1 << 8,
        guildMessages: 1 << 9,
        guildMessageReactions: 1 << 10,
        guildMessageTyping: 1 << 11,
        directMessages: 1 << 12,
        directMessageReactions: 1 << 13,
        directMessageTyping: 1 << 14,
        messageContent: 1 << 15,
        guildScheduledEvents: 1 << 16,
        autoModerationConfiguration: 1 << 20,
        autoModerationExecution: 1 << 21,
    }

    static readonly messageTypes = {
        default: 0,
        recipientAdd: 1,
        recipientRemove: 2,
        call: 3,
        channelNameChange: 4,
        channelIconChange: 5,
        channelPinnedMessage: 6,
        guildMemberJoin: 7,
        userPremiumGuildSubscription: 8,
        userPremiumGuildSubscriptionTier1: 9,
        userPremiumGuildSubscriptionTier2: 10,
        userPremiumGuildSubscriptionTier3: 11,
        channelFollowAdd: 12,
        guildDiscoveryDisqualified: 14,
        guildDiscoveryRequalified: 15,
        reply: 19,
        applicationCommand: 20,
        threadStarterMessage: 21,
        guildInviteReminder: 22,
        contextMenuCommand: 23,
        threadStart: 24,
        threadUpdate: 25,
        threadDelete: 26,
        threadListSync: 27,
        threadMemberUpdate: 28,
        threadMembersUpdate: 29,
        guildScheduledEventCreate: 30,
        guildScheduledEventUpdate: 31,
        guildScheduledEventDelete: 32,
        channelThreadCreated: 33,
        replyThreadCreated: 34,
        guildScheduledEventCreateRequest: 35,
        guildScheduledEventUpdateRequest: 36,
        guildScheduledEventDeleteRequest: 37,
        threadMemberJoin: 38,
        threadMemberLeave: 39,
        threadMemberJoinRequest: 42,
        threadMemberLeaveRequest: 43,
        threadMemberUpdateRequest: 44,
        threadMembersUpdateRequest: 45,
        threadMemberJoinRequestApproved: 46,
        threadMemberJoinRequestDenied: 47,
        threadMemberLeaveRequestApproved: 48,
        threadMemberLeaveRequestDenied: 49,
        threadMemberUpdateRequestApproved: 50,
        threadMemberUpdateRequestDenied: 51,
        threadMembersUpdateRequestApproved: 52,
        threadMembersUpdateRequestDenied: 53,
    }

    static readonly interactionTypes = {
        chatInput: 1,
    }

}

export class GatewayIntents {
    static readonly Guilds: any = 1 << 0
    static readonly GuildMembers: any = 1 << 1
    static readonly GuildBans: any = 1 << 2
    static readonly GuildEmojis: any = 1 << 3
    static readonly GuildIntegrations: any = 1 << 4
    static readonly GuildWebhooks: any = 1 << 5
    static readonly GuildInvites: any = 1 << 6
    static readonly GuildVoiceStates: any = 1 << 7
    static readonly GuildPresences: any = 1 << 8
    static readonly GuildMessages: any = 1 << 9
    static readonly GuildMessageReactions: any = 1 << 10
    static readonly GuildMessageTyping: any = 1 << 11
    static readonly DirectMessages: any = 1 << 12
    static readonly DirectMessageReactions: any = 1 << 13
    static readonly DirectMessageTyping: any = 1 << 14
    static readonly MessageContent: any = 1 << 15
    static readonly GuildScheduledEvents: any = 1 << 16
    static readonly AutoModerationConfiguration: any = 1 << 20
    static readonly AutoModerationExecution: any = 1 << 21
}

export class GatewayEvents {
    static readonly Ready: any =  'ready'
    static readonly MessageCreate: any =  'messageCreate'
    static readonly MessageUpdate: any =  'messageUpdate'
    static readonly MessageDelete: any =  'messageDelete'
    static readonly MessageDeleteBulk: any =  'messageDeleteBulk'
    static readonly MessageReactionAdd: any =  'messageReactionAdd'
    static readonly MessageReactionRemove: any =  'messageReactionRemove'
    static readonly MessageReactionRemoveAll: any =  'messageReactionRemoveAll'
    static readonly MessageReactionRemoveEmoji: any =  'messageReactionRemoveEmoji'
    static readonly GuildCreate: any =  'guildCreate'
    static readonly GuildUpdate: any =  'guildUpdate'
    static readonly GuildDelete: any =  'guildDelete'
    static readonly GuildBanAdd: any =  'guildBanAdd'
    static readonly GuildBanRemove: any =  'guildBanRemove'
    static readonly GuildEmojisUpdate: any =  'guildEmojisUpdate'
    static readonly GuildIntegrationsUpdate: any =  'guildIntegrationsUpdate'
    static readonly GuildMemberAdd: any =  'guildMemberAdd'
    static readonly GuildMemberRemove: any =  'guildMemberRemove'
    static readonly GuildMemberUpdate: any =  'guildMemberUpdate'
    static readonly GuildMembersChunk: any =  'guildMembersChunk'
    static readonly GuildRoleCreate: any =  'guildRoleCreate'
    static readonly GuildRoleUpdate: any =  'guildRoleUpdate'
    static readonly GuildRoleDelete: any =  'guildRoleDelete'
    static readonly InviteCreate: any =  'inviteCreate'
    static readonly InviteDelete: any =  'inviteDelete'
    static readonly PresenceUpdate: any =  'presenceUpdate'
    static readonly TypingStart: any =  'typingStart'
    static readonly UserUpdate: any =  'userUpdate'
    static readonly VoiceStateUpdate: any =  'voiceStateUpdate'
    static readonly VoiceServerUpdate: any =  'voiceServerUpdate'
    static readonly WebhooksUpdate: any =  'webhooksUpdate'
    static readonly InteractionCreate: any =  'interactionCreate'
    static readonly ShardReady: any =  'shardReady'
    static readonly ShardResume: any =  'shardResume'
    static readonly ShardDisconnect: any =  'shardDisconnect'
    static readonly ShardError: any =  'shardError'
    static readonly ShardReconnecting: any =  'shardReconnecting'
    static readonly InvalidSession: any =  'invalidSession'
    static readonly Raw: any =  'raw'
    static readonly Debug: any =  'debug'
    static readonly Warn: any =  'warn'
    static readonly Error: any =  'error'
    static readonly RateLimit: any =  'rateLimit'
    static readonly ShardRateLimit: any =  'shardRateLimit'
}