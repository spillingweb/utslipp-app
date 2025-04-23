import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import AuthLayout from '@/layouts/AuthLayout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset password">
            <Head title="Reset password" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                       Email form field
                    </div>

                    <div className="grid gap-2">
                       Password form field
                    </div>

                    <div className="grid gap-2">
                       Confirm password form field
                    </div>

                    Button reset password
                </div>
            </form>
        </AuthLayout>
    );
}
