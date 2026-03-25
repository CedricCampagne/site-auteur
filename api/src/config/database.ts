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
<<<<<<< HEAD
      protocol: "postgres",
=======
>>>>>>> prep/db-prod
      logging: false,
      models: [User, Role, UserRole, Chronicle, Book, Comment],
      dialectOptions: {
        ssl: {
          require: true,
<<<<<<< HEAD
          rejectUnauthorized: false, // Supabase SSL
=======
          rejectUnauthorized: false,
>>>>>>> prep/db-prod
        },
      },
    })
  : new Sequelize({
<<<<<<< HEAD
      dialect: process.env.DB_DIALECT as "postgres",
=======
      dialect: process.env.DB_DIALECT as "postgres" || "postgres",
>>>>>>> prep/db-prod
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      logging: false,
      models: [User, Role, UserRole, Chronicle, Book, Comment],
<<<<<<< HEAD
    });
=======
    });
>>>>>>> prep/db-prod
