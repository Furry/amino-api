import { EventEmitter } from "events"

/**
 * The base class for every client.
 * @extends {EventEmitter}
 */
export default class BaseClient extends EventEmitter {
    constructor(opts = {}) {
        super()
    }
}