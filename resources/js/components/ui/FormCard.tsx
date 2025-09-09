import Card from './Card';
import Form from './Form';
import styles from './FormCard.module.css';
import Heading from './Heading';

type FormCardProps = {
    onSubmit: (e: React.FormEvent) => void;
    center?: boolean;
    heading?: string;
    children: React.ReactNode;
};

const FormCard = ({ onSubmit, center = true, heading, children }: FormCardProps) => {
    const className = center ? styles.center : undefined;

    return (
        <div className={className}>
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
