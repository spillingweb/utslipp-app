import { Data, User } from '@/types';
import { TILSYN_STATUS } from './tilsynStatus';

export const getFilterSelectOptions = (users: Data<User>, projects: { name: string; id: number }[]) => [
    { value: 'null', text: 'Velg felt' },
    {
        value: 'bygning',
        text: 'Bygningstype',
        options: [
            { value: 'B', text: 'Bolig' },
            { value: 'H', text: 'Fritidsbolig' },
            { value: 'N', text: 'Næringsbygg' },
            { value: 'I', text: 'Ingen bygning' },
        ],
    },
    {
        value: 'project_id',
        text: 'Prosjekt',
        options: projects.map((project) => ({ value: project.id, text: `${project.id} - ${project.name}` })),
    },
    { value: 'status', text: 'Status', options: TILSYN_STATUS.map((status) => ({ value: status.value, text: status.text })) },
    {
        value: 'hjemmel',
        text: 'Hjemmel',
        options: [
            { value: '27-2', text: '§ 27-2 i plan- og bygningsloven (tilknytningsplikt)' },
            { value: '7', text: '§ 7 i forurensningsloven (ulovlig forurensning)' },
            { value: '18', text: '§ 18 i forurensningsloven (trekke tilbake tillatelse)' },
            { value: '12-16', text: '§ 12-16 i forurensningsforskriften (ulovliggjøre utslipp)' },
            { value: 'other', text: 'Annen hjemmel' },
        ],
    },
    { value: 'saksbeh', text: 'Saksbehandler', options: users.data.map((user) => ({ value: user.name, text: user.name })) },
    { value: 'frist', text: 'Frist' },
    {
        value: 'sone',
        text: 'Sone',
        options: [
            { value: '1', text: '1 - Steinsfjorden' },
            { value: '2', text: '2 - Sogna' },
            { value: '3', text: '3 - Tyrifjorden' },
            { value: '4', text: '4 - Randselva/Storelva' },
            { value: '5', text: '5 - Begna' },
            { value: '6', text: '6 - Lysakervassdraget' },
            { value: '7', text: '7 - Sandviksvassdraget' },
        ],
    },
];
