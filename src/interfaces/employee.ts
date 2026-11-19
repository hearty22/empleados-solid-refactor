
import { Document } from "mongoose";
export interface IEmployee extends Document
{
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
};
export type EmployeeType = Omit<IEmployee, keyof Document>;
