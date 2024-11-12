"use client";

import { GetRegisters } from "@/src/shared/types/response/GetRegisters";
import { useEffect, useState } from "react";
import { fetchRegisters } from "./actions";
import { Table, TableProps } from "antd";
import { handleRegisterType } from "@/src/utils/HandleRegisterType";
import { dateService } from "@/src/services/DateService";

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
      title: "Data do registro",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{dateService.datetimeToHumanDate(date)}</>,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type) => <>{handleRegisterType(type)}</>,
    },
  ];

  return (
    <Table<GetRegisters["data"][0]> columns={columns} dataSource={registers} />
  );
};
