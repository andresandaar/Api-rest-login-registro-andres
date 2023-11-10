import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"
import { validate } from "class-validator"


export class UserController {

    private static userRepository = AppDataSource.getRepository(User);
    
    static getAll = async (req: Request, res: Response) => {
        try {
            const users: User[] = await this.userRepository.find();
            if (users.length > 0) {
                res.send(users);
            } else {
                res.status(400).json({ message: 'No results found' });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        //const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await this.userRepository.findOneOrFail({ where: { id } })
            res.send(user)
        } catch (error) {
            return res.status(404).json({ message: 'No result' });
        }
    }

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body;

        const user = Object.assign(new User(), {
            username, password, role
        });
        // validate
        const errors = await validate(user);
        if (errors.length) return res.status(400).json(errors);
        try {
            await this.userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'Username alredy exist' });
        }
        //all ok
        res.send('User  created')
    }

    static editUser = async (req: Request, res: Response) => {
        let user;
        const id = parseInt(req.params.id);
        const { username, role } = req.body;

        try {
            user = await this.userRepository.findOneOrFail({ where: { id } });
            user.username = username;
            user.role = role;
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        // validate
        const errors = await validate(user);
        if (errors.length) return res.status(400).json(errors);

        //try to save user
        try {
            await this.userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'Username alredy in use' });
        }
        res.status(201).json({ message: 'User update' });
    }

    static delateUser = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: User;
        try {
            user = await this.userRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        //Remove user
        this.userRepository.delete(id);
        res.status(201).json({ message: 'User delete' });
    }

}