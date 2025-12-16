import styles from './Card.module.css';

export default function Card({ ...props }: React.ComponentProps<'div'>) {

    return <div data-slot="card" className={styles.card} {...props} />;
}
