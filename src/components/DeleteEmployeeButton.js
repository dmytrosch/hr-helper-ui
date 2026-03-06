'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import { Trash2 } from 'lucide-react';

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export default function DeleteEmployeeButton({ employeeId, employeeName }) {
  const router = useRouter();

  const [deleteEmployee, { loading }] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: employeeId },
    onCompleted: () => {
      message.success(`Employee ${employeeName} deleted successfully`);
      router.push('/employees');
      router.refresh();
    },
    onError: (error) => {
      message.error(`Error deleting employee: ${error.message}`);
    },
  });

  return (
    <Popconfirm
      title="Delete employee"
      description={`Are you sure you want to delete ${employeeName}?`}
      onConfirm={deleteEmployee}
      okText="Yes, Delete"
      cancelText="No"
      okButtonProps={{ danger: true, loading }}
    >
      <Button danger icon={<Trash2 size={16} />}>
        Delete
      </Button>
    </Popconfirm>
  );
}
