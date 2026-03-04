import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import Link from 'next/link';

import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import { ArrowLeft, User, Mail, Activity } from 'lucide-react';

import EditProjectModal from "@/components/EditProjectModal/EditProjectModal";
import styles from './ProjectPage.module.css';
import BackButton from "@/components/BackButton/BackButton";
import DeleteProjectButton from "@/components/DeleteProjectButton";

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      contact_person
      contact_email
      isActive
      employees {
        id
        first_name
        last_name
        position { position_name }
      }
    }
  }
`;

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const client = getClient();

  const { data } = await client.query({
    query: GET_PROJECT,
    variables: { id },
  });

  const project = data?.project;
  if (!project) notFound();

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.header}>
        <div className={styles.projectInfo}>
          <Title level={2} style={{ margin: 0 }}>{project.name}</Title>
          <Tag color={project.isActive ? "green" : "red"} style={{ marginTop: 8 }}>
            {project.isActive ? "Active" : "Inactive"}
          </Tag>
        </div>

        <div className={styles.actionButtons}>
          <EditProjectModal project={project} />
          <DeleteProjectButton
            projectId={project.id}
            projectName={project.name}
          />
        </div>
      </div>

      <div className={styles.cardGrid}>
        <Card title="Project Details" variant="borderless">
          <div className={styles.infoItem}>
            <span className={styles.label}>Contact Person</span>
            <span className={styles.value}><User size={14} /> {project.contact_person}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Contact Email</span>
            <span className={styles.value}><Mail size={14} /> {project.contact_email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>
              <Activity size={14} /> {project.isActive ? "Ongoing" : "Completed/Paused"}
            </span>
          </div>
        </Card>

        <Card title="Team Members" variant="borderless">
          {project.employees?.length > 0 ? (
            project.employees.map(emp => (
              <div key={emp.id} className={styles.employeeListItem}>
                <Link href={`/employees/${emp.id}`}>
                  {emp.first_name} {emp.last_name}
                </Link>
                <Text type="secondary" size="small"> {emp.position?.position_name}</Text>
              </div>
            ))
          ) : (
            <Text type="secondary">No employees assigned yet.</Text>
          )}
        </Card>
      </div>
    </div>
  );
}