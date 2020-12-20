import Thread from "../structs/Thread";
import RESTManager from "./RESTManager";

import * as Constants from "../utils/Constants"

// interface Methods {
//     "THREAD": {
//         args: [ ThreadID : String ],
//         returns: Thread
//     },
//     "DEFAULT": {
//         args: [ ],
//         returns: null
//     }
// }

// export default class RESTRequest {
//     public readonly path: string;
//     constructor(private rest: RESTManager, private method: keyof Methods) {
//         this.path = `${Constants.API.PATH}/${Constants.API.VERSION}/`
//     }

//     async execute<T extends keyof Methods>(target: T, args: Methods[T]["args"] = []): Promise<(Methods[T]["returns"])> {
//         return "" as any
//     }
// }


const Methods = {
    "THREAD": {
        args: [ String ],
        returns: Thread,
        assembly: `chat/thread/{}`
    }
}

export default class RESTRequest {
    public readonly path: string;
    constructor(private rest: RESTManager, private method: keyof typeof Methods) {

    }

    async execute<T extends keyof typeof Methods>(target: T, args: keyof typeof Methods[T]["args"]) {

    }
}