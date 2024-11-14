"use client";
import { useAppContext } from "@/app/_hooks/UseAppContext";
import { LoginForm } from "@/src/shared/types/Forms/LoginForm";
import { Button, Col, Form, Input, Row } from "antd";
import { login } from "./actions";
import { useRouter } from "next/navigation";
export const LoginComponent = () => {
  const { messageApi } = useAppContext();
  const router = useRouter();

  return (
    <Form
      className="w-full"
      name="form"
      autoComplete="off"
      onFinish={(values) => {
        login(values, messageApi, router);
      }}
    >
      <Row justify={"center"}>
        <Col span={13}>
          <Form.Item<LoginForm>
            label="Usuario"
            name="login"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Informe um usuario" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={13}>
          <Form.Item<LoginForm>
            label="Senha"
            name="password"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "Informe uma senha valida" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={13} className="text-center" style={{ textAlign: "center" }}>
          <Form.Item>
            <Button type="primary" style={{ width: "40%" }} htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
