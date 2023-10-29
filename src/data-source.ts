import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./../db/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
});
