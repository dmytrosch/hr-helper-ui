import EmployeeTable from '@/components/EmployeesTable';
import { getClient } from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import styles from './employees.module.css';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      first_name
      last_name
      email
      city
      phone
      join_date
      birthday
      position {
        position_name
      }
      project {
        name
      }
    }
  }
`;

export default async function EmployeesPage() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_EMPLOYEES,
    fetchPolicy: 'no-cache',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2}>Employee Directory</Title>
        <Text type="secondary">
          Detailed overview of your team members and their projects.
        </Text>
      </div>
      <EmployeeTable employees={data.employees} />
    </div>
  );
}
