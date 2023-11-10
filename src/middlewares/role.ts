import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import {User} from "../entity/User";

//https://openwebinars.net/blog/que-es-json-web-token-y-como-funciona/
export const checkRole = (roles:Array<string>) => {

    return async  (req: Request, res: Response, next: NextFunction) => {
     const id =res.locals.jwtPayload.userId;
     const userRepository = AppDataSource.getRepository(User);
     let user:User;
     try {
        user =await userRepository.findOneOrFail({ where: { id} });
     } catch (error) {
       return res.status(401).send({message:'Not authorized'})
     }
     //Check
     const {role}=user;
     if(roles.includes(role)){
         next();
     }else{
        res.status(401).send({message:'Not authorized'});
     }
    }

}