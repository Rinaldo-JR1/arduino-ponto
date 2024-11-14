import { RegisterType } from "@/src/shared/enums/RegisterTypeEnum";
import { Tag } from "antd";

export const handleRegisterType = (type: string) => {
  if (type === RegisterType.ENTRANCE) {
    return <Tag color="green">Entrada</Tag>;
  }
  if (type === RegisterType.EXIT) {
    return <Tag color="red">Saída</Tag>;
  }
  return <Tag>Desconhecido</Tag>;
};
