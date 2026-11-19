interface ICause  {code : number}

export class EmployeeError extends Error {
  cause: ICause;
  constructor(message: string, cause: ICause) {
    super(message);
    this.message = message;
    this.cause = cause;
  }
}
