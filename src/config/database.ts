import mongoose from "mongoose";
export class DatabaseConfig {
  private static instance: mongoose.Connection;
  private constructor() { };
  public static async getInstance(uri: string): Promise<mongoose.Connection>{
    try {
      if (!DatabaseConfig.instance) {
        let client = await mongoose.connect(uri);
        console.log("conexion exitosa con la base de datos");

        DatabaseConfig.instance = client.connection;
      };
      return DatabaseConfig.instance;
    } catch (error) {
      console.log("error en la conexion con la base de datos")
      console.error(error);
      process.exit(1);
    }
  };
}
