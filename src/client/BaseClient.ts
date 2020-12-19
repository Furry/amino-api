import { EventEmitter } from "events"
import RESTManager from "../rest/RESTManager"

/**
 * The base class for every client.
 * @extends {EventEmitter}
 */
export default class BaseClient extends EventEmitter {
    private readonly rest: RESTManager
    constructor(authorization: string, opts = {}) {
        super()

        /**
         * The client's REST manager.
         * @type {RESTmanager}
         * @private
         * @readonly
         */
        this.rest = new RESTManager(this, authorization)
    }

    get api() {
        return this.rest.api
    }
}