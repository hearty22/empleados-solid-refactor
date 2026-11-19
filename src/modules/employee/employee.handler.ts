import { Request, response, Response } from "express";
import { employeeRepository } from "./employee.repository";
import { IEmployee } from "../../interfaces/employee";
import { EmployeeError } from "./employee.error"
export interface IEmployeeHandler {
  post(request: Request<IEmployee>, response: Response): Promise<Response>;
  getAll(request: Request, respnse : Response): Promise<Response>;
  getById(request: Request, response: Response): Promise<Response>;
}

export class EmployeeHandler implements IEmployeeHandler {
  async post(
    request: Request<IEmployee>,
    response: Response
  ): Promise<Response> {
    try {
      const serv = await employeeRepository.create(request.body);
      return response.status(201).json({
        message: "empleado creado exitosamente",
        code: 201,
        empleado: serv
      })
    } catch (error) {
      if(error instanceof EmployeeError){
        return response.status(error.cause.code).json({
          message: error.message,
          code : error.cause.code
        })
      };
      return response.status(500).json({
        message: "Error interno en crear al empleado",
        code: 500,
        error: error
      })
    }
  };
  async getAll(
    request : Request,
    response: Response
  ): Promise<Response> {
    try {
      const empl = await employeeRepository.get();
      return response.status(200).json({
        message: "Emplados obtenidos exitosamente",
        code: 200,
        empleados: empl
      })
    } catch (error) {
      return response.status(500).json({
        message: "Error interno en obtener a los empleados",
        code: 500,
        error: error
      })
    }

  };
  async getById(
    request: Request,
    response : Response
  ): Promise<Response> {
    try {
      const employee = await employeeRepository.getById(String(request.params.id));
      return response.status(200).json({
        message: "Emplado obtenido correctamente",
        code : 200,
        empleado: employee
      });
    } catch (error) {
      if(error instanceof EmployeeError){
        return response.status(error.cause.code).json({
          message: error.message,
          code : error.cause.code
        })
      };
      return response.status(500).json({
        message: "Error interno en obtener al empleado",
        code: 500,
        error: error
      })
    }
  }
}
export const employeeHandler = new EmployeeHandler()