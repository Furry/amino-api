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

    /**
     * Deletes the message
     */
    async delete() {
        await this.client.requestManager.delete(`chat/thread/${this.threadId}/message/${this.messageId}`)
    }

    /**
     * Replys to a sent message
     * @param content The message you want to reply with
     * @param type The message type
     * @param attachment Attachment raw data
     */
    async reply(content: string, type = 0, attachment: null = null) {
        const res = await this.client.requestManager.post(`chat/thread/${this.threadId}/message`, {
            type: type,
            content: content,
            attachedObject: attachment,
            replyMessageId: this.messageId
        })
        return new ChatMessage(this.client, res as any)
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