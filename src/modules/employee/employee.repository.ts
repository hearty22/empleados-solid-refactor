import { EmployeeModel } from "../../models/employee";
import { EmployeeType } from "../../interfaces/employee";
import { EmployeeError } from "./employee.error";
interface IEmployeeRepository {
  create(empleado: EmployeeType): Promise<EmployeeType>;
  get(): Promise<EmployeeType[]>;
  getById(id: string): Promise<EmployeeType>;
}
class EmployeeRepository implements IEmployeeRepository {
  async create(empleado: EmployeeType) {
    const { name, position, baseSalary, yearsOfService } = empleado;
    if (!name || !position) {
      throw new EmployeeError("Nombre y puesto son obligatorios", {
        code : 400
      }
);
    }
    if (typeof baseSalary !== "number" || baseSalary <= 0) {
      throw new EmployeeError("El salario base debe ser mayor a 0", {
        code: 400
      });
    }
    if (
      typeof yearsOfService !== "number" ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      throw new EmployeeError("La antigüedad debe ser un entero mayor o igual a 0", {
        code: 400
      });
    }
    const bonus = empleado.baseSalary * 0.02 * empleado.yearsOfService;
    const finalSalary = empleado.baseSalary + bonus;
    const empleadoNuevo = await EmployeeModel.create({
      name: empleado.name,
      position: empleado.position,
      baseSalary: empleado.baseSalary,
      yearsOfService: empleado.yearsOfService,
      finalSalary: finalSalary,
    });
    return empleadoNuevo;
  }
  async get() {
    const empleados = await EmployeeModel.find().sort({ createdAt: -1 });
    return empleados;
  }
  async getById(id: string) {
    const empleado = await EmployeeModel.findById(id);
    if (!empleado) {
      throw new EmployeeError("Empleado no encontrado", {
        code : 404
      });
    }
    return empleado;
  }
}
export const employeeRepository = new EmployeeRepository();
