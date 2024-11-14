"use client";
import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode };
export const Navbar = ({ children }: Props) => {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "pontos",
      label: "Pontos",
      icon: <IdcardOutlined />,
    },
    {
      key: "funcionarios",
      label: "Funcionários",
      icon: <UserOutlined />,
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      router.push("/");
    } else {
      router.push(`/portal/${e.key}`);
    }
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <Menu mode="horizontal" items={items} onClick={onClick} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>{children}</Col>
      </Row>
    </div>
  );
};
