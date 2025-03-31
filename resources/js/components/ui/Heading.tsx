import styles from "./heading.module.css";

type HeadingProps = {
    level: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    className?: string;
}

const Heading = ({level, children, className}: HeadingProps) => {

    const otherClasses = className ? className : "";

    switch(level) {
        case 1:
            return <h1 className={`${styles.h1} ${otherClasses}`}>{children}</h1>;
        case 2:
            return <h2 className={`${styles.h2} ${otherClasses}`}>{children}</h2>;
        case 3:
            return <h3 className={`${styles.h3} ${otherClasses}`}>{children}</h3>;
        case 4:
            return <h4 className={`${styles.h4} ${otherClasses}`}>{children}</h4>;
        default:
            return <h1 className={`${styles.h1} ${otherClasses}`}>{children}</h1>;
    }

};  

export default Heading;