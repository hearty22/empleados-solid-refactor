import { Router } from "express";
import { employeeHandler, EmployeeHandler } from "./employee.handler";

export class EmployeeRouter{
    router  : Router;
    handlers :  EmployeeHandler;
    constructor(){
        this.router = Router();
        this.handlers = employeeHandler;
        this.initRoutes()
    }
    private initRoutes() : void {
        this.router.get("/employee/", this.handlers.getAll);
        this.router.get("/employee/:id", this.handlers.getById);
        this.router.post("/employee/", this.handlers.post)
    }
}
export const employeeRouter = new EmployeeRouter()