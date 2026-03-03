import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

export const metadata = {
  title: 'HR Helper',
  description: 'Employees management system',
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1677ff',
                borderRadius: 8,
              },
            }}
          >
            <main style={{ padding: '20px' }}>
              {children}
            </main>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}