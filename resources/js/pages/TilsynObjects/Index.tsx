import TilsynObjectsTable from '@/components/TilsynObjects/TilsynObjectsTable';
import Button from '@/components/ui/Button';
import Flash from '@/components/ui/Flash';
import { Input } from '@/components/ui/Input';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Index.module.css';

type TilsynObjectsProps = {
    tilsynObjects: {
        data: TilsynObject[];
        meta: { from: number; to: number; total: number; links: { url: string | null; label: string; active: boolean }[] };
    };
    project_id: string;
    search: string;
};

const TilsynObjects = ({ tilsynObjects, project_id, search }: TilsynObjectsProps) => {
    const { flash } = usePage<{ flash: { success: string | null; error: string | null } }>().props;
    const { projects } = usePage<{ projects: { id: number; name: string; number: string }[] }>().props;
    const isInitialRender = useRef(true);

    const [inputValue, setInputValue] = useState<string>(search);
    const [searchTerm, setSearchTerm] = useState<string>(search);
    const [selectedProject, setSelectedProject] = useState<string>(project_id);
    const [pageNumber, setPageNumber] = useState<string>('1');

    const updatedPageNumber = (link: { url: string | null; label: string; active: boolean }) => {
        setPageNumber(link.url ? link.url.split("=")[1] : '1');
    };

    const tilsynObjectsUrl = useMemo(() => {
        const url = new URL(route('tilsyn_objects'));
        url.searchParams.append("page", pageNumber);
        if (selectedProject) {
            url.searchParams.append('project_id', selectedProject);
        }
        if (searchTerm) {
            url.searchParams.append('search', searchTerm);
        }
        return url.toString();
    }, [searchTerm, pageNumber, selectedProject]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        router.visit(tilsynObjectsUrl, {
            preserveState: true,
            preserveScroll: true,
            // replace: true,
        });
    }, [tilsynObjectsUrl]);

    useEffect(() => {
        if (inputValue === searchTerm) return;
        // Debounce the search input to avoid too many requests
        const handler = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue, searchTerm]);

    console.log(tilsynObjects);

    return (
        <AppLayout>
            <Head title="Tilsynsobjekter" />
            <Flash message={flash} />
            <div className={styles.searchAndExport}>
                <Input name="search" placeholder="Søk" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                <Select name="filter" onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
                    <option value="">Alle prosjekter</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {`${project.number} - ${project.name}`}
                        </option>
                    ))}
                    <option value="null">Uten prosjekt</option>
                </Select>
                <Button onClick={() => console.log('Empty')}>Kopier til utklippstavle</Button>
                <Button onClick={() => console.log('Empty')}>Eksporter til Excel</Button>
                <Button onClick={() => console.log('Empty')}>Skriv ut</Button>
            </div>
            <TilsynObjectsTable tilsynObjects={tilsynObjects.data} />
            <Pagination meta={tilsynObjects.meta} updatedPageNumber={updatedPageNumber} />
        </AppLayout>
    );
};

export default TilsynObjects;
