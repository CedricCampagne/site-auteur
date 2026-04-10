import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { UserRole } from "../models/UserRole";
import { Chronicle } from "../models/Chronicle";
import { Book } from "../models/Book";
import { Comment } from "../models/Comment";

const isProd = process.env.NODE_ENV === "production";

export const sequelize = isProd
  ? new Sequelize(process.env.DATABASE_URL!, {
      dialect: "postgres",
      logging: false,
      models: [User, Role, UserRole, Chronicle, Book, Comment],
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        acquire: 30000, // Timeout plus large pour éviter les erreurs réseau
      }
    })
  : new Sequelize({
      dialect: process.env.DB_DIALECT as "postgres" || "postgres",
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      logging: false,
      models: [User, Role, UserRole, Chronicle, Book, Comment],
    });


//Fonction de connexion avec retry
export const connectWithRetry = async (retries = 10, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("DB connection successful");
      return;
    } catch (err: any) {
      console.error(`DB connection failed. Retries left: ${retries - 1}`);
      console.error(err.message);
      retries--;
      await new Promise(res => setTimeout(res, delay));
    }
  }

  console.error("Could not connect to DB after multiple retries.");
  process.exit(1);
};
