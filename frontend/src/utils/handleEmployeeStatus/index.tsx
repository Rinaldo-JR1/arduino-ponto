import { EmployeeStatusEnum } from "@/src/shared/enums/EmployeeStatusEnum";
import { Tag } from "antd";

export const handleEmployeeStatus = (status: string) => {
  if (status === EmployeeStatusEnum.ACTIVE) {
    return <Tag color="blue">Ativo</Tag>;
  }
  return <Tag color="red">Inativo</Tag>
};
