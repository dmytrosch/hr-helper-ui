import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";

import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';

import { Calendar, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

import styles from './EmployeePage.module.css';
import BackButton from "@/components/BackButton/BackButton";
import DeleteEmployeeButton from "@/components/DeleteEmployeeButton";
import EditEmployeeModal from "@/components/EditEmployeeModal/EditEmployeeModal";

const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';
  const date = new Date(Number(dateValue) || dateValue);
  return date.toLocaleDateString('en', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      email
      phone
      city
      birthday
      join_date
      position { position_name }
      project { name }
    }
  }
`;

export default async function EmployeePage({ params }) {
  const { id } = await params;
  const client = getClient();

  const { data } = await client.query({
    query: GET_EMPLOYEE,
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const employee = data?.employee;

  if (!employee) {
    notFound();
  }

  return (
    <div className={styles.employeeContainer}>
      <BackButton />
      <div className={styles.employeeHeader}>
        <div className={styles.userInfo}>
          <Title level={2} style={{ margin: 0 }}>
            {employee.first_name} {employee.last_name}
          </Title>
          <Text className={styles.position} type="secondary">{employee.position?.position_name || 'No Position Assigned'}</Text>
          <Tag color="blue" style={{ width: 'fit-content', marginTop: '8px' }}>
            ID: {employee.id}
          </Tag>
        </div>

        <div className={styles.actionButtons}>
          <EditEmployeeModal employee={employee} />
          <DeleteEmployeeButton
            employeeId={employee.id}
            employeeName={`${employee.first_name} ${employee.last_name}`}
          />
        </div>
      </div>

      <div className={styles.cardGrid}>
        <Card title="Contact Information" variant="bordless">
          <div className={styles.infoItem}>
            <span className={styles.label}>Email Address</span>
            <span className={styles.value}><Mail size={14} /> {employee.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Phone Number</span>
            <span className={styles.value}><Phone size={14} /> {employee.phone}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}><MapPin size={14} /> {employee.city}</span>
          </div>
        </Card>

        <Card title="Work & Personal" variant="bordless">
          <div className={styles.infoItem}>
            <span className={styles.label}>Current Project</span>
            <span className={styles.value}>
              <Briefcase size={14} /> {employee.project?.name || 'Bench'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Join Date</span>
            <span className={styles.value}>
              <Calendar size={14} /> {formatDate(employee.join_date)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Birthday</span>
            <span className={styles.value}>
              <Calendar size={14} /> {formatDate(employee.birthday)}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}