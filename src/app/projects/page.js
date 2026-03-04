import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { Card, Tag, Button } from 'antd';
import { User, Mail, Plus } from 'lucide-react';
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import Link from 'next/link';
import styles from './projects.module.css';


const GET_PROJECTS = gql`
  query GetProjects($filter: ProjectFilters) {
    projects(filter: $filter) {
      id
      name
      contact_person
      contact_email
      isActive
      employees {
        id
      }
    }
  }
`;

export default async function ProjectsPage({ searchParams }) {
  const { filter } = await searchParams;
  const client = getClient();

  const { data } = await client.query({
    query: GET_PROJECTS,
    variables: { filter: filter || null },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Title level={2}>Projects</Title>
          <Text type="secondary">Manage company projects and teams</Text>
        </div>
        <Button type="primary" icon={<Plus size={16} />} size="large">
          New Project
        </Button>
      </div>

      <div className={styles.grid}>
        {data.projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} style={{ textDecoration: 'none' }}>
            <Card
              title={project.name}
              className={styles.projectCard}
              extra={
                <Tag color={project.isActive ? "green" : "red"}>
                  {project.isActive ? "Active" : "Inactive"}
                </Tag>
              }
            >
              <div className={styles.cardContent}>
                <div className={styles.infoLine}>
                  <User size={16} />
                  <span>{project.contact_person}</span>
                </div>
                <div className={styles.infoLine}>
                  <Mail size={16} />
                  <span>{project.contact_email}</span>
                </div>
                <div className={styles.infoLine} style={{ marginTop: 8 }}>
                  <Text strong>
                    {project.employees?.length || 0} Employees assigned
                  </Text>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}