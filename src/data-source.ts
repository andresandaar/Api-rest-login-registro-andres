import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import config from "./config/config";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.db_host,
    port: Number(config.db_port),
    username: config.db_user,
    password: config.db_password,
    database: config.db_database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
