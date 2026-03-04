'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import { Trash2 } from 'lucide-react';

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export default function DeleteProjectButton({ projectId, projectName }) {
  const router = useRouter();

  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      message.success(`Project "${projectName}" deleted successfully`);
      router.push('/projects');
      router.refresh();
    },
    onError: (error) => {
      message.error(`Error deleting project: ${error.message}`);
    },
  });

  return (
    <Popconfirm
      title="Delete project"
      description={`Are you sure you want to delete project "${projectName}"?`}
      onConfirm={deleteProject}
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
