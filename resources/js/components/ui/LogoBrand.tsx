import styles from '@/components/ui/LogoBrand.module.css';
import Logo from '@/../assets/ringerike-logo.svg';

const LogoBrand = () => {

  return (
      <div className={styles.brand}>
        <img src={Logo} alt="Logo Ringerike kommune" className={styles.logo}/>
        <span>UTSLIPP</span>
      </div>
  )
};

export default LogoBrand;
