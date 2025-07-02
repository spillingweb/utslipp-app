import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import {Input} from '@/components/ui/Input';
import AppLayout from '@/layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import styles from './CreateUser.module.css';
import { Data, Role, User } from '@/types';

type RegisterForm = {
    name: string;
    email: string;
    role: string;
};

const EditUser = ({ user }: { roles: Data<Role>; user: { data: User } }) => {
    const { data, setData, put, processing, errors, cancel } = useForm<Required<RegisterForm>>({
        name: user.data.name,
        email: user.data.email,
        role: user.data.role as string,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('user.update', user.data.id), {
            onError: (errors) => {
                console.error('Error updating user:', errors);
            }
        });
    };

    const handleCancel = () => {
        cancel();
        router.get(route('admin'));
    };

    return (
        <AppLayout>
            <Head title="Endre Bruker" />
            <FormCard heading="Endre bruker" onSubmit={handleSubmit}>
                <fieldset className={styles.input}>
                    <label htmlFor="name">Navn</label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </fieldset>
                <fieldset className={styles.input}>
                    <label htmlFor="email">E-postadresse</label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </fieldset>
                <div className={styles.cta}>
                    <Button type="submit" disabled={processing}>
                        Oppdater bruker
                    </Button>
                    <Button type='button' variant="secondary" disabled={processing} onClick={handleCancel}>
                        Avbryt
                    </Button>
                </div>
            </FormCard>
        </AppLayout>
    );
};

export default EditUser;
