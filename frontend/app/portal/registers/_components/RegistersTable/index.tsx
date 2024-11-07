"use client";

import { GetRegisters } from "@/src/types/response/GetRegisters";
import { useEffect, useState } from "react";
import { fetchRegisters } from "./actions";
import { Table, TableProps } from "antd";

export const RegistersTable = () => {
  const [registers, setRegisters] = useState<GetRegisters["data"]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchRegisters();
      setRegisters(data);
    })();
  }, []);

  const columns: TableProps<GetRegisters["data"][0]>["columns"] = [
    {
      title: "Nome",
      dataIndex: "employee",
      key: "name",
      render: (employee) => employee.name,
    },
    {
      title: "",
      dataIndex: "employee",
      key: "name",
      render: (employee) => employee.name,
    },
  ];

  return (
    <Table<GetRegisters["data"][0]> columns={columns} dataSource={registers} />
  );
};
