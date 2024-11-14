import { RegisterService } from "@/src/services/RegisterService";

const registerService = new RegisterService();
export const fetchRegisters = async () => {
  const { data, status } = await registerService.getRegisters();
  if (status === 200) {
    return data.data;
  } else {
    return [];
  }
};
