import "dotenv/config";
import express, { Express } from "express";
import { config , type IConfig} from "./config/config";
import { DatabaseConfig } from "./config/database";
import { employeeRouter } from "./modules/employee/employee.routes";
class Server {
  app: Express;
  config: IConfig;
  database: DatabaseConfig;
  constructor() {
    this.config = config;
    this.app = express();
    this.database = DatabaseConfig.getInstance(this.config.mongodburi);
  };
  init(): void {
    try {
      this.app.use(express.json());
      this.app.use("/api",employeeRouter.router)
      this.app.listen(this.config.port, () => {
        console.log(`Servidor escuchando en el port ${this.config.port}`);
      })
    } catch (error) {
      console.error(error);
    }
  }
}
const app = new Server();
app.init()
