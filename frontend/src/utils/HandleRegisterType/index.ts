import { RegisterType } from "@/src/shared/enums/RegisterTypeEnum";

export const handleRegisterType = (type: string) => {
  if (type === RegisterType.ENTRANCE) {
    return "Entrada";
  }
  if (type === RegisterType.EXIT) {
    return "Saída";
  }
  return "Desconhecido";
};
