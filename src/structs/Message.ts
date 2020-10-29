import { UserProfilePartial } from "./Profile"
import { Thread } from "./Thread"
import { Client } from "../Client"

export class ChatMessage {
    constructor(public client: Client, messageRoot: ChatMessageRoot, thread?: Thread) {
        Object.assign(this, messageRoot.chatMessage)
        this.author = new UserProfilePartial(client, this.author)
        if (!thread) {
            this.thread = new Thread(client, {threadId: this.threadId} as Thread)
        } else {
            this.thread = thread
        }
    }

    async delete() {
        await this.client.requestManager.delete(`chat/thread/${this.threadId}/message/${this.messageId}`)
    }
}

export interface ChatMessage {
    author: UserProfilePartial;
    threadId: string;
    thread: Thread
    mediaType: number;
    content: string;
    clientRefId: number;
    messageId: string;
    uid: string;
    createdTime: Date;
    type: number;
    isHidden: boolean;
    includedInSummary: boolean;
    chatBubbleId: string;
    chatBubbleVersion: number;
    extensions: Extensions;
}

// Not quite sure what this is for yet.
export interface Extensions {

}

export interface ChatMessageRoot {
    ndcId: number;
    chatMessage: ChatMessage;
    alertOption: number;
    membershipStatus: number;
}