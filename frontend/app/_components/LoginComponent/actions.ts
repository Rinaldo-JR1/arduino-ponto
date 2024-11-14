import { AuthService } from "@/src/services/AuthService";
import { LoginForm } from "@/src/shared/types/Forms/LoginForm";
import { MessageInstance } from "antd/es/message/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const login = async (
  form: LoginForm,
  messageApi: MessageInstance,
  router: AppRouterInstance
) => {
  try {
    const { data, status } = await AuthService.login(form.login, form.password);
    if (status === 200) {
      messageApi.success(data.message);
      router.push("/portal/pontos");
      return;
    }
    messageApi.error(data.message);
  } catch (error) {
    console.error(error);
  }
};
