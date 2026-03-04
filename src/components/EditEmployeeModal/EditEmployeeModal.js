'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import { Edit2 } from 'lucide-react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client/react';
import DataSelect from "../DataSelect/DataSelect";

import styles from "./EditEmployeeModal.module.css";

const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
    }
  }
`;
const GET_POSITIONS = gql`
  query {
    positions {
      id
      position_name
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $updatedData: EmployeeUpdatingPayload!) {
    updateEmployee(id: $id, updatedData: $updatedData) {
      id
    }
  }
`;

export default function EditEmployeeModal({ employee }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const [updateEmployee, { loading }] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      message.success("Employee updated successfully");
      setIsModalOpen(false);
      router.refresh();
    },
    onError: (err) => message.error(err.message),
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    updateEmployee({
      variables: {
        id: employee.id,
        updatedData: {
          ...values,
          birthday: values.birthday?.toISOString(),
          join_date: values.join_date?.toISOString(),
        },
      },
    });
  };
  console.log(employee, 'xxx');


  return (
    <>
      <Button
        icon={<Edit2 size={16} />}
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </Button>

      <Modal
        title={`Edit Profile: ${employee.first_name} ${employee.last_name}`}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          className={styles.modalForm}
          initialValues={{
            ...employee,
            project: employee.project?.id,
            position: employee.position?.id,
            birthday: employee.birthday
              ? dayjs(Number(employee.birthday))
              : null,
            join_date: employee.join_date
              ? dayjs(Number(employee.join_date))
              : null,
          }}
        >
          <div className={styles.row}>
            <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true }]}
            >
              <DataSelect
                query={GET_POSITIONS}
                dataKey="positions"
                labelKey="position_name"
                placeholder="Select position"
              />
            </Form.Item>

            <Form.Item name="project" label="Project">
              <DataSelect
                query={GET_PROJECTS}
                dataKey="projects"
                placeholder="Select project"
              />
            </Form.Item>
          </div>

          <div className={styles.row}>
            <Form.Item name="birthday" label="Birthday">
              <DatePicker className={styles.fullWidth} />
            </Form.Item>
            <Form.Item name="join_date" label="Join Date">
              <DatePicker className={styles.fullWidth} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

EditEmployeeModal.propTypes = {
  employee: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    join_date: PropTypes.number.isRequired,
    birthday: PropTypes.number.isRequired,
    project: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    position: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
}