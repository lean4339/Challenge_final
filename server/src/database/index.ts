import {Sequelize} from "sequelize";

const database = "App";
const username = "lean";
const password = "example";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});
export { sequelize }
