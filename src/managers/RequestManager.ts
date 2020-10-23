import fetch from "node-fetch"

import { objectToURI } from "../utils/formatting/urls"

interface RequestOptions {
    dataType: "uri" | "body",
    response: "json" | "text"
}

/**
 * The manager for all HTTP requests.
 * It houses requirements for all structures
 * and classes to make their own requests.  
 */
export class RequestManager {
    private _headers: {[key: string]: any} = {}
    private _community: string | "g" = "g"
    constructor(headers: {[key: string]: any}) {
        this._headers = headers
    }

    // Getter & Setter for our headers
    public get headers() { return this._headers }
    public set headers(newHeaders: {[key: string]: any}) { this._headers = newHeaders }

    // For selecting the community
    public get community() { return this._community + "/" }
    public set community(target: string) { this._community = target }

    // Getters for version & API url
    private get version() { return "v1/" }
    public get apiUrl() { return "https://service.narvii.com/api/" + this.version + this.community + "s/" }

    /**
     * The base method for all GET related requests for the Amino api.
     * 
     * @param endpoint The endpoint this request should target. Extends RequestManager.apiUrl
     * @param options = { dataType: "uri", response: "json"} the options to be sent alongside the request.
     * 
     * @throws AminoError
     */
    public async get(
        endpoint: string,
        options: RequestOptions = { dataType: "uri", response: "json"}
        ): Promise<{[key: string]: any}> {

        const response = await fetch(this.apiUrl + endpoint, {headers: this.headers})

        if (options.response == "json") {
            const res = response.json()
            return res
        } else {
            const res = response.text()
            return res as any
        }
    }

    /**
     * The base method for all Post related requests for the Amino api.
     * 
     * @param endpoint The endpoint this request should target. Extends RequestManager.apiUrl
     * @param data = The data to be sent along side this request.
     * @param options = { dataType: "uri", response: "json"} the options to be sent alongside the request.
     * 
     * @throws AminoError
     */
    public async post(
        endpoint: string,
        data: {[key: string]: any} = {},
        options: RequestOptions = { dataType: "body", response: "json"}
        ): Promise<{[key: string]: any}> {

        const requestOptions: {[key: string]: any} = { method: "POST" }
        let url = this.apiUrl + endpoint

        if (options.dataType == "uri") {
            url = objectToURI(url, data)
        } else {
            requestOptions["headers"] = this.headers
            requestOptions["body"] = JSON.stringify(data)
        }

        const response = await fetch(url, requestOptions)

        if (options.response == "json") {
            const res = response.json()
            return res
        } else {
            const res = response.text()
            return res as any
        }
    }

    /**
     * The base method for all DELETE related requests for the Amino api.
     * 
     * @param endpoint The endpoint this request should target. Extends RequestManager.apiUrl
     * @param options = { dataType: "uri", response: "json"} the options to be sent alongside the request.
     * 
     * @throws AminoError
     */
    public async delete(
        endpoint: string,
        options: RequestOptions = { dataType: "uri", response: "json"}
        ): Promise<{[key: string]: any}> {

        const requestOptions: {[key: string]: any} = { method: "DELETE" }
        requestOptions["headers"] = this.headers

        const response = await fetch(this.apiUrl + endpoint, requestOptions)

        if (options.response == "json") {
            const res = response.json()
            return res
        } else {
            const res = response.text()
            return res as any
        }
    }
}