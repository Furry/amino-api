import fetch from "node-fetch"
import BaseClient from "../client/BaseClient"
import RESTRequest from "./RESTRequest"
import { buildRoute } from "./RESTRouter"

export default class RESTManager {
    private _target = "g";
    constructor(public client: BaseClient, authorization: string) {
        
    }

    /**
     * Gets the current targetted community.
     */
    get target() {
        return this._target
    }

    /**
     * Constructs a new API route
     */
    get api() {
        return buildRoute(this)
    }

    async request() {
        const request = new RESTRequest(this, "THREAD")
        request.execute("THREAD", [])
    }
}

