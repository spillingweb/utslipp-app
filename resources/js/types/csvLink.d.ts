declare module 'react-csv' {
    import * as React from 'react';

    export interface CSVLinkProps {
        data: object[] | string;
        headers?: { label: string; key: string }[];
        filename?: string;
        separator?: string;
        enclosingCharacter?: string;
        target?: string;
        uFEFF?: boolean;
        children?: React.ReactNode;
        asyncOnClick?: boolean;
        onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void | Promise<any>;
        ref?: React.Ref<HTMLAnchorElement>;
    }

    export class CSVLink extends React.Component<CSVLinkProps> {}
}