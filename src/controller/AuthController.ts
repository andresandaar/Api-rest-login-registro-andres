import { AppDataSource } from "../data-source"
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { ValidatorOptions, validate } from "class-validator";
export class AuthController {
   private static userRepository = AppDataSource.getRepository(User);
   //https://apuntes.de/typescript/classes-static-members/#gsc.tab=0

   static login = async (req: Request, res: Response) => {
      const { username, password } = req.body;
      if (!(username && password)) return res.status(400).json({ message: 'Username & Password are required!' });

      let user: User;
      try {                                                                                                       //pregunta si en la bd existe el usuario, se podria tambien escribir username:username
         user = await this.userRepository.findOneOrFail({ where: { username } });
      } catch (error) {
         return res.status(400).json({ message: 'Username or Password incorrect!' });
      }
      //Check password
      if (!user.checkPassword(password)) return res.status(400).json({ message: 'Username or Password incorrect!' });
      //Generate token
      const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
      /*  let jwtPayload;
      jwtPayload = <any>jwt.verify(token, config.jwtSecret); */
      res.json({ message: 'Ok', token/* ,jwtPayload */ });
      // res.send(user);
   }

   static changePassword = async (req: Request, res: Response) => {
      const id = res.locals.jwtPayload.userId;
      const { oldPassword, newPassword } = req.body;
      if (!(oldPassword && newPassword)) return res.status(400).json({ message: 'Old password & new password are required' });
      let user: User;
      try {
         user = await this.userRepository.findOneOrFail({ where: { id } });
      } catch (error) {
         return res.status(401).send({ message: 'Something goes wrong!' })
      }
      //check password
      if (!user.checkPassword(oldPassword)) return res.status(401).send({ message: 'check your old Password' });
      user.password = newPassword;
      // validate
      const validatetionOpt: ValidatorOptions = { validationError: { target: false, value: false } };
      const errors = await validate(user, validatetionOpt);
      if (errors.length) return res.status(400).json(errors);
      //Hash password
      user.hashPassword();
      this.userRepository.save(user);
      res.json({ message: 'Password change' })
   }

}