'use client';
import React from 'react';
import { Menu, Layout, Typography } from 'antd';
import { Home, Users, Settings, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const { Header } = Layout;
const { Text } = Typography;

export default function Navbar() {
  const pathname = usePathname();
  const selectedKey = pathname.startsWith('/employees') ? 'employees' : 'home';

  const menuItems = [
    {
      key: 'home',
      icon: <Home size={16} />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: 'employees',
      icon: <Users size={16} />,
      label: <Link href="/employees">Employees</Link>,
    },
    {
      key: 'projects',
      icon: <Briefcase size={16} />,
      label: <Link href="/projects">Projects</Link>,
    },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <Text strong className={styles.logoText}>HR Helper</Text>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        className={styles.menu}
      />
      <div className={styles.settingsIcon}>
        <Settings size={20} />
      </div>
    </Header>
  );
}