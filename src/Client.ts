import { EventEmitter } from "events"
import WebSocket from "ws"

import { UserAccount } from "./structs/Account"
import { UserProfile } from "./structs/Profile"
import { Account } from "./structs/Account"
import { RequestManager } from "./managers/RequestManager"
import { SocketManager } from "./managers/SocketManager"
import { Thread } from "./structs/Thread"

export class Client extends SocketManager {
    requestManager = new RequestManager({"User-Agent": "JavaScript;amino-api;api,init-cycle"})
    private _self: Account = new Account(this, {} as UserAccount)

    public threads: Map<string, Thread> = new Map()
    public users: Map<string, UserProfile> = new Map()

    constructor() {
        super();
    }

    // The instance of the account owner
    public get self() { return this._self }
    public get deviceID() { return "01A1D20632BF568909214A9E22EF09DE4BEB27522EA3554C8659D730C77AF1ED22412BEC2B4D9F7219" }

    /**
     * Targets the API framework to operate in a specific community.
     * 
     * @param communityID the ID of the community, or g for global.
     */
    target(communityID: string | "g") {
        this.requestManager.community = communityID
    }

    /**
     * Logs into Amino, setting all headers and parameters for future requests. This funciton returns the account the bot is connected to.
     * 
     * @param email The accounts email
     * @param password The accounts password
     */
    async login(email: string, password: string): Promise<Account> {
        const response = await this.requestManager.post("auth/login", {
            email: email,
            secret: `0 ${password}`,
            deviceID: this.deviceID, // genAlphaNum(86)
        })
        if (!response.auid) {
            throw "Error logging in" // Update custom err
        }
        const result = response as UserAccount
        this.requestManager.headers = {...this.requestManager.headers, NDCAUTH: `sid=${result.sid}`}
        this._self.refresh(result)
        return this.self
    }

    listen() {
        this.start(this)
    }

    async joinCommunity(id: string) {
        //const response = 
    }

    // add docs
    async fetchUser(uid: string): Promise<UserProfile> {
        const res = await this.requestManager.get("user-profile/" + uid)
        return new UserProfile(this, res.userProfile)
    }

    async searchUsers(query: string, start: number = 0, size: number = 25): Promise<Array<UserProfile>> {
        const res = await this.requestManager.get(`user-profile?type=name&q=${query}&start=${start}&size=${size}`)
        return res.userProfileList.map((user: UserProfile) => new UserProfile(this, user))
    }

}