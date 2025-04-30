import Card from './Card';
import Form from './Form';
import styles from './FormCard.module.css';
import Heading from './Heading';
import LogoBrand from './LogoBrand';

type FormCardProps = {
    onSubmit: (e: React.FormEvent) => void;
    center?: boolean;
    heading?: string;
    logo?: boolean;
    children: React.ReactNode;
};

const FormCard = ({ onSubmit, center = true, heading, logo = false, children }: FormCardProps) => {
    const className = center ? styles.centerContent : undefined;

    return (
        <div className={className}>
            {logo && <LogoBrand />}
            <Card>
                {heading && (
                    <Heading level={2} className={styles.heading}>
                        {heading}
                    </Heading>
                )}
                <Form onSubmit={onSubmit}>{children}</Form>
            </Card>
        </div>
    );
};

export default FormCard;
