import { EmployeeStatusEnum } from "@/src/shared/enums/EmployeeStatusEnum";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { Button, Tag } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { Dispatch, SetStateAction } from "react";
import { inactiveEmployee } from "./actions";

export const handleEmployeeActions = (
  status: string,
  userId: number,
  setEmployees: Dispatch<SetStateAction<GetEmployee["data"]>>,
  messageApi: MessageInstance
) => {
  if (status === EmployeeStatusEnum.INACTIVE) {
    return <Tag color="red">Funcionario já desativado</Tag>;
  }
  return (
    <Button
      type="primary"
      onClick={() => {
        inactiveEmployee(userId, setEmployees, messageApi);
      }}
    >
      Desativar
    </Button>
  );
};
