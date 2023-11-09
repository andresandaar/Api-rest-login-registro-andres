import { Entity, PrimaryGeneratedColumn, Column,Unique, CreateDateColumn,UpdateDateColumn } from "typeorm"
import {  MinLength,IsNotEmpty} from "class-validator";
@Entity()
@Unique(['username'])
//TODO IsEmail
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column() //Crea una column en la BD
    @MinLength(10)
     username: string

    @Column()
    @MinLength(10) //contraseña minima de 10 caracteres
     password: string

    @Column()
    @IsNotEmpty()//No permite que el campo venga vacio
     role: string

    @Column()
    @CreateDateColumn() //Cuando se ha creado el usuario 
     createdAt: Date;

    @Column()
    @UpdateDateColumn() //Cuando se ha modificado el usuario 
     updateAt: Date;


}
