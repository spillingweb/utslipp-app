import { type HTMLAttributes } from 'react';
import styles from './InputError.module.css';

export default function InputError({ message, ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? <p className={styles.errorMessage} {...props}>{message}</p> : null;
}
