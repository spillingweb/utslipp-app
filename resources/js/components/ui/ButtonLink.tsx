import styles from './ButtonLink.module.css';

type ButtonLinkProps = React.ComponentPropsWithoutRef<'button'>

const ButtonLink = ({children, ...props}: ButtonLinkProps) => {
    return <button className={styles.buttonLink} {...props}>{children}</button>;
};

export default ButtonLink;
