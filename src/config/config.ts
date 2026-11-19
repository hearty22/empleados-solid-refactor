export interface IConfig{
  port: number;
  mongodburi: string;
};
class Config implements IConfig{
  port: number;
  mongodburi: string;
  constructor() {
    this.port = Number(process.env.PORT) || 4444;
    this.mongodburi = String(process.env.MONGO_URI) || 'mongodb://localhost:27017/employees_db'
  }
}

export const config = new Config();
