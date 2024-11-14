import { EmployeeService } from "@/src/services/EmployeeService";
import { EmployeeForm } from "@/src/shared/types/Forms/EmployeeForm";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { MessageInstance } from "antd/es/message/interface";
import { Dispatch, SetStateAction } from "react";

export const createEmployee = async (
  form: EmployeeForm,
  setLoading: Dispatch<SetStateAction<boolean>>,
  messageApi: MessageInstance,
  setEmployees: Dispatch<SetStateAction<GetEmployee["data"]>>
) => {
  setLoading(true);
  const { data, status } = await EmployeeService.createEmployee(form);
  if (status === 200) {
    messageApi.success(data.message);
    setEmployees((prev) => [...prev, data.data]);
  } else {
    messageApi.error(data.message);
  }
  setLoading(false);
};
