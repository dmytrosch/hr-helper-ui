'use client';

import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className={styles.backButtonContainer}>
      <button
        type="button"
        onClick={() => router.back()}
        className={styles.backLink}
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
    </div>
  );
}
