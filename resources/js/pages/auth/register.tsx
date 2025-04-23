import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/AuthLayout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        Name form field
                    </div>

                    <div className="grid gap-2">
                       Email form field
                    </div>

                    <div className="grid gap-2">
                       Password form field
                    </div>

                    <div className="grid gap-2">
                        Confirm password form field
                    </div>

                    Button create account
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    Text link to login
                </div>
            </form>
        </AuthLayout>
    );
}
