import { useAppContext } from "@/app/_hooks/UseAppContext";
import { EmployeeForm } from "@/src/shared/types/Forms/EmployeeForm";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { Col, Form, Row, Input, Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import { createEmployee } from "./actions";

type Props = {
  setEmployees: Dispatch<SetStateAction<GetEmployee["data"]>>;
};
export const CreateEmployee = ({ setEmployees }: Props) => {
  const { setLoading, messageApi } = useAppContext();
  return (
    <div>
      <Form
        className="w-full"
        name="form"
        autoComplete="off"
        onFinish={(values) => {
          createEmployee(values, setLoading, messageApi, setEmployees);
        }}
      >
        <Row justify={"center"}>
          <Col span={24}>
            <Form.Item<EmployeeForm>
              label="Nome"
              name="name"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Informe o nome" }]}
            >
              <Input size="large" placeholder="Informe o nome" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col >
            <Form.Item<EmployeeForm>
              label="Tag UID"
              name="tagId"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Informe uma tag" },
                { max: 8, message: "Tag deve ter 8 caracteres" },
              ]}
            >
              <Input.OTP length={8} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col
            span={13}
            className="text-center"
            style={{ textAlign: "center" }}
          >
            <Form.Item>
              <Button type="primary" style={{ width: "40%" }} htmlType="submit">
                Criar funcionario
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
