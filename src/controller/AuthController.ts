import { AppDataSource } from "../data-source"
import {Request, Response } from "express";
import { User } from "../entity/User";

export class AuthController {

//https://apuntes.de/typescript/classes-static-members/#gsc.tab=0

    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!(username && password)) res.status(400).json({ message: 'Username & Password are required!' });    
         const userRepository = AppDataSource.getRepository(User);
         let user: User;
        try {                                                                                                       //pregunta si en la bd existe el usuario, se podria tambien escribir username:username
           user = await userRepository.findOneOrFail({where:{username}});
        } catch (error) {
           return res.status(400).json({ message: 'Username or Password incorrect!' });
        }
        res.send(user);
    }

}