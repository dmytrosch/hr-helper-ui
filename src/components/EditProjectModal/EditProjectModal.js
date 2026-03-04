'use client';

import React, { useState } from 'react';
import { Modal, Button, Form, Input, Switch, message } from 'antd';
import { Edit2 } from 'lucide-react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styles from './EditProjectModal.module.css';
import { useMutation } from '@apollo/client/react';

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $updatedData: ProjectUpdatingPayload!) {
    updateProject(id: $id, updatedData: $updatedData) {
      id
      name
      isActive
    }
  }
`;

export default function EditProjectModal({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      message.success('Project updated successfully');
      setIsModalOpen(false);
      router.refresh();
    },
    onError: (error) => message.error(error.message),
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    updateProject({
      variables: {
        id: project.id,
        updatedData: {
          name: values.name,
          contact_person: values.contact_person,
          contact_email: values.contact_email,
          isActive: values.isActive,
        },
      },
    });
  };

  return (
    <>
      <Button icon={<Edit2 size={16} />} onClick={() => setIsModalOpen(true)}>
        Edit Project
      </Button>

      <Modal
        title="Edit Project Details"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          className={styles.modalForm}
          initialValues={project}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_person"
            label="Contact Person"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact_email"
            label="Contact Email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Project Active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
