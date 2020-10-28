import { Client } from "../Client"
import { ChatMessage } from "./Message"
import { UserProfile, UserProfilePartial } from "./Profile"
export class Thread {
    constructor(public client: Client, thread: Thread) {
        Object.assign(this, thread)
    }

    /**
     * Checks if a thread is a DM thread or not.
     */
    dm(): boolean {
        if (this.type == 0) {
            return true
        } else {
            return false
        }
    }

    /**
     * Refreshes the cached Thread with new data, or refreshes with API call if data is not provided.
     * 
     * @param data The optional thread data to repopulate with.
     */
    async recache(data?: Thread, type?: "user"): Promise<void> {
        if (data) {
            Object.assign(this, data)
        } else {
            const res = await this.client.requestManager.get(`chat/thread/${this.threadId}`)
            Object.assign(this, res.thread)
        }
        this.client.threads.set(this.threadId, this)
    }

    /**
     * Joins the thread.
     */
    async join() {
        // Perhaps the extra URL parameters specify an amount of messages to cache?
        // https://service.narvii.com/api/v1/x235196899/s/chat/thread/b32d61bc-d261-46c3-b2c4-3cd947d21493/member?start=0&size=100&type=default&cv=1.2
        return await this.client.requestManager.post(`chat/thread/${this.threadId}/member/${this.client.self.uid}`)
    }

    async send(content: string, type = 0, attachment: null = null): Promise<ChatMessage> {
        if (!this.client.threads.has(this.threadId)) await this.recache()
        const res = await this.client.requestManager.post(`chat/thread/${this.threadId}/message`, {
            type: type,
            content: content,
            attachedObject: attachment
        })
        return new ChatMessage(this.client, res as any)
    }

    async invite(user: UserProfilePartial | UserProfile | UserProfile[] | UserProfilePartial[]) {
        const ids = []
        if (Array.isArray(user)) {
            user.forEach((userobj: UserProfile | UserProfilePartial) => {
                ids.push(userobj.uid)
            })
        } else {
            ids.push(user.uid)
        }
        const res = await this.client.requestManager.post(`chat/thread/${this.threadId}/member/invite`, {
            uids: ids
        })
        return res
    }
}

export interface Thread {
    userAddedTopicList: any[];
    uid: string;
    membersQuota: number;
    membersSummary: MembersSummary[];
    threadId: string;
    keywords: string;
    membersCount: number;
    strategyInfo: string;
    isPinned: boolean;
    title: string;
    tipInfo: TipInfo;
    membershipStatus: number;
    content: string;
    needHidden: boolean;
    alertOption: number;
    lastReadTime: Date;
    type: number;
    status: number;
    publishToGlobal: number;
    modifiedTime?: any;
    lastMessageSummary: LastMessageSummary;
    condition: number;
    icon: string;
    latestActivityTime: Date;
    author: Author;
    extensions: Extensions2;
    ndcId: number;
    createdTime?: any;
}

export interface MembersSummary {
    status: number;
    uid: string;
    membershipStatus: number;
    role: number;
    nickname: string;
    icon: string;
}

export interface TipOptionList {
    value: number;
    icon: string;
}

export interface TipCustomOption {
    value?: any;
    icon: string;
}

export interface TipInfo {
    tipOptionList: TipOptionList[];
    tipMaxCoin: number;
    tippersCount: number;
    tippable: boolean;
    tipMinCoin: number;
    tipCustomOption: TipCustomOption;
    tippedCoins: number;
}

export interface Extensions {
    replyMessageId: string;
}

export interface LastMessageSummary {
    uid: string;
    type: number;
    mediaType: number;
    content: string;
    extensions: Extensions;
    messageId: string;
    createdTime: Date;
    isHidden: boolean;
    mediaValue?: any;
}

export interface Author {
    status: number;
    isNicknameVerified: boolean;
    uid: string;
    level: number;
    followingStatus: number;
    accountMembershipStatus: number;
    isGlobal: boolean;
    membershipStatus: number;
    reputation: number;
    role: number;
    ndcId: number;
    membersCount: number;
    nickname: string;
    icon: string;
}

export interface ScreeningRoomPermission {
    action: number;
    uidList: any[];
}

export interface Extensions2 {
    viewOnly: boolean;
    coHost: string[];
    language: string;
    membersCanInvite: boolean;
    screeningRoomPermission: ScreeningRoomPermission;
    bm: any[];
    avchatMemberUidList: string[];
    creatorUid: string;
    visibility: number;
    bannedMemberUidList: string[];
    lastMembersSummaryUpdateTime: number;
    fansOnly: boolean;
    announcement: string;
    channelType: number;
    pinAnnouncement: boolean;
    vvChatJoinType: number;
}