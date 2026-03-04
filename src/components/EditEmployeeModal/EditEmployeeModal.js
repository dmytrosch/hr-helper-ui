'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import { Edit2 } from 'lucide-react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client/react';

import styles from './EditEmployeeModal.module.css';

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
      message.success('Profile updated successfully');
      setIsModalOpen(false);
      router.refresh();
    },
    onError: (error) => {
      message.error(`Update failed: ${error.message}`);
    }
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateEmployee({
        variables: {
          id: employee.id,
          updatedData: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone || null,
            city: values.city || null,
            birthday: values.birthday ? values.birthday.toISOString() : null,
            join_date: values.join_date ? values.join_date.toISOString() : null,
          }
        }
      });
    } catch (info) {
      console.log('Validation Failed:', info);
    }
  };

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
        okText="Save Changes"
        width={600}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          className={styles.modalForm}
          initialValues={{
            ...employee,
            birthday: employee.birthday ? dayjs(Number(employee.birthday)) : null,
            join_date: employee.join_date ? dayjs(Number(employee.join_date)) : null,
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

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="example@company.com" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number">
            <Input placeholder="+380..." />
          </Form.Item>

          <Form.Item name="city" label="City">
            <Input placeholder="e.g. Kyiv" />
          </Form.Item>

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
      name: PropTypes.string.isRequired
    })
  })
}