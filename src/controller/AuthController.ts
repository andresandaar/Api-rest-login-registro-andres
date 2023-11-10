import { AppDataSource } from "../data-source"
import {Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
export class AuthController {
private static  userRepository = AppDataSource.getRepository(User);
//https://apuntes.de/typescript/classes-static-members/#gsc.tab=0

    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) return res.status(400).json({ message: 'Username & Password are required!' });    

         let user: User;
        try {                                                                                                       //pregunta si en la bd existe el usuario, se podria tambien escribir username:username
           user = await this.userRepository.findOneOrFail({where:{username}});
        } catch (error) {
           return res.status(400).json({ message: 'Username or Password incorrect!' });
        }
        //Check password
        if (!user.checkPassword(password)) return res.status(400).json({ message: 'Username or Password incorrect!' });
        //Generate token
        const token =jwt.sign({userId:user.id, username:user.username},config.jwtSecret,{expiresIn:'1h'});
        /*  let jwtPayload;
        jwtPayload = <any>jwt.verify(token, config.jwtSecret); */
        res.json({message:'Ok',token/* ,jwtPayload */});
       // res.send(user);
    }

}