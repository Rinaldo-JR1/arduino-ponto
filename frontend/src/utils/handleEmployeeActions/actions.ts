import { EmployeeService } from "@/src/services/EmployeeService";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { MessageInstance } from "antd/es/message/interface";
import { Dispatch, SetStateAction } from "react";

export const inactiveEmployee = async (
  id: number,
  setEmployees: Dispatch<SetStateAction<GetEmployee["data"]>>,
  messageApi: MessageInstance
) => {
  const { data, status } = await EmployeeService.inactive(id);
  if (status === 200) {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, ...data.data } : employee
      )
    );
    messageApi.success(data.message);
    return;
  }
  messageApi.error(data.message);
};
