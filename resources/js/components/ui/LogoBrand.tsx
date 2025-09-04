import { router } from '@inertiajs/react';
import styles from './LogoBrand.module.css';
import Logo from '@/../assets/ringerike-logo.svg';

const LogoBrand = () => {

  return (
      <div className={styles.brand} onClick={() => router.visit(route('login'))}>
        <img src={Logo} alt="Logo Ringerike kommune" className={styles.logo}/>
        <span className={styles.brandText}>UTSLIPP</span>
      </div>
  )
};

export default LogoBrand;
