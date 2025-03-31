import { type HTMLAttributes } from 'react';

export default function InputError({ message, ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? <p {...props}>{message}</p> : null;
}
