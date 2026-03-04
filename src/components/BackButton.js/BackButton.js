import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './BackButton.module.css'

export default function BackButton({ route = '/', label = 'Back' }) {
  return <div className={styles.backButtonContainer}>
    <Link href={route} className={styles.backLink}>
      <ArrowLeft size={18} />
      <span>{label}</span>
    </Link>
  </div>
}

BackButton.propTypes = {
  route: PropTypes.string,
  label: PropTypes.string
}