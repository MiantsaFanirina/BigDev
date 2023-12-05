// JWT
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const cookieJwtAuth = (req: any, res: any, next: any) => {

    // get the cookie in the request headers
    const tokenStartIndex = req.headers.cookie.indexOf('token=') + 'token='.length;
    const tokenEndIndex = req.headers.cookie.indexOf(';', tokenStartIndex);
    const token = req.headers.cookie.substring(tokenStartIndex, tokenEndIndex !== -1 ? tokenEndIndex : undefined);
    try {
        const user = jwt.verify(token, process.env.TOKEN_KEY as string);
        req.user = user;
        next();
    } catch (err: any) {
        res.status(401).json({message: "Unauthorized"});
    }

};

