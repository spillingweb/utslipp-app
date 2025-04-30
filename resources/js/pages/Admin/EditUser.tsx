import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import Input from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import AppLayout from '@/layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ROLE_RADIO_OPTIONS } from './CreateUser';
import styles from './CreateUser.module.css';
import { Data, Role, User } from './Index';

type RegisterForm = {
    name: string;
    email: string;
    role: string;
};

const EditUser = ({ user }: { roles: Data<Role>; user: { data: User } }) => {
    const { data, setData, post, processing, errors } = useForm<Required<RegisterForm>>({
        name: user.data.name,
        email: user.data.email,
        role: user.data.role,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.edit'));
    };

    const handleRoleChange = (roleName: string) => {
        if (data.role !== roleName) {
            setData('role', roleName);
        }
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

                <fieldset>
                    <legend>Velg rolle for brukeren</legend>
                    <div className={styles.radioBtns}>
                        {ROLE_RADIO_OPTIONS.map((option) => (
                            <Radio
                                key={option.value}
                                label={option.label}
                                name="roles"
                                id={option.value}
                                value={option.value}
                                onChange={() => handleRoleChange(option.value)}
                                checked={data.role === option.value}
                            />
                        ))}
                    </div>
                </fieldset>

                <div className={styles.cta}>
                    <Button type="submit" tabIndex={5} disabled={processing}>
                        Oppdater bruker
                    </Button>
                    <Button variant="secondary" tabIndex={4} disabled={processing} onClick={() => router.get(route('admin'))}>
                        Avbryt
                    </Button>
                </div>
            </FormCard>
        </AppLayout>
    );
};

export default EditUser;
