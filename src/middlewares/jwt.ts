import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken";
import config from "../config/config";
//https://openwebinars.net/blog/que-es-json-web-token-y-como-funciona/
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    const token = <string>req.headers['auth'];//Este token viene del fron-end en el encabezado

    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        console.log(jwtPayload)
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send({ message: 'Not Authorized' })
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
}