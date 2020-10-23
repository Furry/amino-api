import WebSocket from "ws"

import { Client } from "../Client";
import { EventEmitter } from "events"

import { ChatMessage } from "../structs/Message"

export interface SocketManagerEvents {
    "message": (message: ChatMessage) => void,
    "leave": (message: ChatMessage) => void,
    "join": (message: ChatMessage) => void,
    "delete": (message: ChatMessage) => void
}

export declare interface SocketManager {
    on<U extends keyof SocketManagerEvents>(
      event: U, listener: SocketManagerEvents[U]
    ): this;

    emit<U extends keyof SocketManagerEvents>(
      event: U, ...args: Parameters<SocketManagerEvents[U]>
    ): boolean;
}

export class SocketManager extends EventEmitter {
    constructor() {
        super()
    }

    start(client: Client) {
        if (!client.self.uid) throw "You must log in to use this feature."
        const wsc = new WebSocket(`wss://ws4.narvii.com/?signbody=010C200EF6EEFF26E8D809B3BF7B644038C3171CA79E831920B62ED4A22FE765AA6C383024D31E9BD1%7C1583100825258`, {
            headers: {
                NDCDEVICEID: client.deviceID,
                ...client.requestManager.headers,
                AUID: client.self.uid,
                "NDC-MSG-SIG": "AXFuxvjq3Drs589R8UmpwsuB1kp3" // LOOK INTO
            }
        })

        setInterval(() => {
            //wsc.send("heartbeat")
        }, 5000)

        wsc.on("message", (messagePre: string) => {
            const message = JSON.parse(messagePre);
            console.log(message)
            switch (message.t) {
                case 1000:
                    switch(message.o.chatMessage.type) {
                        case 102: return this.emit("leave", new ChatMessage(client, message.o))
                        case 101: return this.emit("join", new ChatMessage(client, message.o))
                        case 100: return this.emit("delete", new ChatMessage(client, message.o))
                        default: return this.emit("message", new ChatMessage(client, message.o))
                    };
                default:
                    console.log(message)
            }
        })
    }
}