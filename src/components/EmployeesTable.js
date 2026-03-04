"use client";
import { Table, Tag, Button, Space } from "antd";
import PropTypes from 'prop-types';
import Typography from "antd/es/typography";
import { Eye, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import styles from "../app/employees/employees.module.css";

const { Text } = Typography;

export default function EmployeesTable({ employees }) {
  const columns = [
    {
      title: "Name",
      key: "full_name",
      render: (_, record) => (
        <span className={styles.employeeName}>
          {record.first_name} {record.last_name}
        </span>
      ),
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Position",
      dataIndex: ["position", "position_name"],
      key: "position",
      render: (text) => <Tag color="blue">{text || "N/A"}</Tag>,
    },
    {
      title: "Project",
      dataIndex: ["project", "name"],
      key: "project",
      render: (text) =>
        text ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Text type="secondary">No Project</Text>
        ),
    },
    {
      title: "Contacts",
      key: "contacts",
      render: (_, record) => (
        <Space orientation="vertical" size={0}>
          <small className={styles.contactItem}>
            <Mail size={12} /> {record.email}
          </small>
          <small className={styles.contactItem}>
            <Phone size={12} /> {record.phone}
          </small>
        </Space>
      ),
    },
    {
      title: "Location",
      dataIndex: "city",
      key: "city",
      render: (text) => (
        <Space size={4}>
          <MapPin size={14} /> {text}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link href={`/employees/${record.id}`}>
          <Button type="link" icon={<Eye size={16} />}>
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={employees}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1000 }}
    />
  );
}

EmployeesTable.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired
}