import { Client } from "../Client"
import { Thread } from "./Thread"

export class UserProfile {
    constructor(public client: Client, data: UserProfile) {
        Object.assign(this, data)
        this.thread = new Thread(client, { threadId: this.uid } as Thread)
    }

    async getDMThread() {
        const res = await this.client.requestManager.get(`chat/thread?type=exist-single&q=${this.uid}`)
        this.thread = new Thread(this.client, res.threadList[0])
        return this.thread
    }
}

export class UserProfilePartial {
    constructor(public client: Client, data: UserProfilePartial) {
        Object.assign(this, data)
    }

    async getDMThread() {
        const res = await this.client.requestManager.get(`chat/thread?type=exist-single&q=${this.uid}`)
        this.thread = new Thread(this.client, res.threadList[0])
        return this.thread
    }
}

/* START OF TYPINGS */

export interface UserProfile {
    thread?: Thread;
    status: number;
    moodSticker?: any;
    itemsCount: number;
    consecutiveCheckInDays?: any;
    uid: string;
    modifiedTime: Date;
    followingStatus: number;
    onlineStatus: number;
    accountMembershipStatus: number;
    isGlobal: boolean;
    reputation: number;
    postsCount: number;
    membersCount: number;
    nickname: string;
    mediaList?: any;
    icon?: any;
    isNicknameVerified: boolean;
    mood?: any;
    level: number;
    notificationSubscriptionStatus: number;
    pushEnabled: boolean;
    membershipStatus: number;
    content?: any;
    joinedCount: number;
    role: number;
    commentsCount: number;
    aminoId: string;
    ndcId: number;
    createdTime: Date;
    extensions?: any;
    storiesCount: number;
    blogsCount: number;
}

export interface UserProfilePartial {
    thread?: Thread;
    uid: string;
    status: number;
    icon: string;
    reputation: number;
    role: number;
    nickname: string;
    level: number;
    accountMembershipStatus: number;
}