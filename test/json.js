// import { NextFunction, Request, Response } from "express";

// function walkBody(body:any):any{
// if(Array.isArray(body)){
//     for(let key=0; key <body.length; key++){
//         const value=body[key];
//         if (typeof value === "object"){
//             walkBody(value);
//         }else if(typeof value === "number"){
//             body[key] = value + 1;
//         }
//     }
// }
//     else if (typeof body === "object") {
//         for (const [key, value] of Object.entries(body)) {
//             const value = body[key];
//             if (typeof value === "object") {
//                 walkBody(value);
//             } else if (typeof value === "number") {
//                 body[key] = value + 1;
//             }
//         }
//     }
//     return body;
// }

// export async function json(req: Request): Promise<string> {
//     return JSON.stringify(walkBody(req.body))
// }

function walkBody(body) {
    if (Array.isArray(body)) {
        for (let key = 0; key < body.length; key++) {
            const value = body[key];
            if (typeof value === "object") {
                walkBody(value);
            } else if (typeof value === "number") {
                body[key] = value + 1;
            }
        }
    } else if (typeof body === "object") {
        for (const [key, value] of Object.entries(body)) {
            const value = body[key];
            if (typeof value === "object") {
                walkBody(value);
            } else if (typeof value === "number") {
                body[key] = value + 1;
            }
        }
    }
    return body;
}

async function json(req, smallData) {

    const modifiedRequestBody = walkBody(req.body);
    
    const response = {
        modifiedRequestBody,
        smallData
    };
    
    return JSON.stringify(response);
}


module.exports = { json };
