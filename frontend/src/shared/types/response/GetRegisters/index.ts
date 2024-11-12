export interface GetRegisters {
  message: string;
  data: Data[];
}

interface Data {
  id: number;
  employeeId: number;
  date: Date;
  type: string;
  employee: Employee;
}

interface Employee {
  id: number;
  name: string;
  tagId: string;
}
