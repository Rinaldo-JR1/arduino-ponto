"use client";
import { dateService } from "@/src/services/DateService";
import { EmployeeService } from "@/src/services/EmployeeService";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { handleEmployeeStatus } from "@/src/utils/handleEmployeeStatus";
import { Button, Col, Drawer, Row, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { CreateEmployee } from "../CreateEmployee/intex";
import { PlusOutlined } from "@ant-design/icons";
import { handleEmployeeActions } from "@/src/utils/handleEmployeeActions";
import { useAppContext } from "@/app/_hooks/UseAppContext";

type Props = {};
export const TableEmployee = ({}: Props) => {
  const [employees, setEmployees] = useState<GetEmployee["data"]>([]);
  const [open, setOpen] = useState(false);
  const {  messageApi } = useAppContext();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data, status } = await EmployeeService.getEmployees();
      if (status === 200) {
        setEmployees(data.data);
      }
    })();
  }, []);

  const columns: TableProps<GetEmployee["data"][0]>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <>{id}</>,
    },
    {
      title: "Nome",
      dataIndex: "name",
      render: (name) => name,
    },
    {
      title: "status",
      dataIndex: "status",
      render: (status) => handleEmployeeStatus(status),
    },
    {
      title: "Ações",
      render: (employee) =>
        handleEmployeeActions(employee.status, employee.id, setEmployees,messageApi),
    },
  ];

  return (
    <div>
      <Row justify={"end"} className="mt-4 mb-4 mr-4">
        <Button icon={<PlusOutlined />} type="primary" onClick={showDrawer}>
          Criar funcionário
        </Button>
      </Row>
      <Row>
        <Col span={24}>
          <Table<GetEmployee["data"][0]>
            columns={columns}
            dataSource={employees}
          />
        </Col>
      </Row>
      <Drawer
        size="large"
        title="Criar funcionario"
        onClose={onClose}
        open={open}
      >
        <CreateEmployee setEmployees={setEmployees} />
      </Drawer>
    </div>
  );
};
