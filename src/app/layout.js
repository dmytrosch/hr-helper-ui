import 'antd/dist/reset.css';
import './globals.css';
import styles from './layout.module.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Layout from 'antd/lib/layout';
import Content from 'antd/lib/layout/layout';
import Navbar from '@/components/Navbar/Navbar';
import { Suspense } from 'react';
import Spin from 'antd/lib/spin';
import { ApolloClientProvider } from '@/lib/ApolloClientProvider';

export const metadata = {
  title: 'HR Helper',
  description: 'Employees management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout className={styles.layout}>
            <Navbar />
            <Suspense fallback={<Spin fullscreen />}>
              <Content className={styles.content}>
                <ApolloClientProvider>{children}</ApolloClientProvider>
              </Content>
            </Suspense>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
