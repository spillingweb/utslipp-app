import { FormEventHandler } from 'react';
import styles from './Form.module.css';

const Form = ({ onSubmit, children }: { onSubmit: FormEventHandler; children: React.ReactNode }) => {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {children}
        </form>
    );
};

export default Form;
