import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Link from 'next/link';
import { Users, Briefcase, MapPin, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const GET_STATS = gql`
  query GetStats {
    employees {
      id
    }
  }
`;

export default async function HomePage() {
  const client = getClient();
  const { data } = await client.query({ query: GET_STATS });
  const totalEmployees = data?.employees?.length || 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title>HR Helper Dashboard</Title>
        <Text type="secondary" className={styles.headerSubtitle}>
          Welcome back! Here is an overview of your organization.
        </Text>
      </header>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <Card variant="borderless" className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconWrapper} ${styles['iconWrapper--blue']}`}>
                <Users color="#1890ff" size={24} />
              </div>
              <div>
                <Text type="secondary" block="true">Total Employees</Text>
                <Title level={3} className={styles.statTitle}>{totalEmployees}</Title>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card variant="borderless" className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconWrapper} ${styles['iconWrapper--green']}`}>
                <Briefcase color="#52c41a" size={24} />
              </div>
              <div>
                <Text type="secondary" block="true">Active Projects</Text>
                <Title level={3} className={styles.statTitle}>12</Title>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card variant="borderless" className={styles.card}>
            <div className={styles.cardBody}>
              <div className={`${styles.iconWrapper} ${styles['iconWrapper--orange']}`}>
                <MapPin color="#faad14" size={24} />
              </div>
              <div>
                <Text type="secondary" block="true">Office Locations</Text>
                <Title level={3} className={styles.statTitle}>4</Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider className={styles.divider} />

      <section>
        <Title level={3}>Quick Actions</Title>
        <Row gutter={[16, 16]}>
          <Col>
            <Link href="/employees">
              <Button type="primary" size="large" icon={<ArrowRight size={16} />}>
                View Employee Directory
              </Button>
            </Link>
          </Col>
          <Col>
            <Button size="large">Generate Reports</Button>
          </Col>
        </Row>
      </section>
    </div>
  );
}