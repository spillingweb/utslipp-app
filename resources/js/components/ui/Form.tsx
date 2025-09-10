import { FormEventHandler } from 'react';
import styles from './Form.module.css';

const Form = ({ onSubmit, children, flex }: { onSubmit?: FormEventHandler; children: React.ReactNode; flex?: boolean }) => {
    return (
        <form onSubmit={onSubmit} className={`${styles.form} ${flex ? styles.flex : ''}`}>
            {children}
        </form>
    );
};

export default Form;
