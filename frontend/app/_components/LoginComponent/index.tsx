"use client";
import { Button, Col, Form, Input, Row } from "antd";

export const LoginComponent = () => {
  type FieldType = {
    login: string;
    password: string;
  };
  return (
    <Form className="w-full" name="basic" autoComplete="off">
      <Row justify={"center"}>
        <Col span={13}>
          <Form.Item<FieldType>
            label="Usuario"
            name="login"
            rules={[{ required: true, message: "Informe um usuario" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col span={13}>
          <Form.Item<FieldType>
            label="Senha"
            name="password"
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
