import FilterByProject from '@/components/TilsynObjects/FilterByProject';
import TilsynObjectsTable from '@/components/TilsynObjects/TilsynObjectsTable';
import { Input } from '@/components/ui/Input';
import Pagination from '@/components/ui/Pagination';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head, router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Index.module.css';
import TableButtons from '../../components/TilsynObjects/TableButtons';

type TilsynObjectsProps = {
    tilsynObjects: {
        data: TilsynObject[];
        meta: { from: number; to: number; total: number; links: { url: string | null; label: string; active: boolean }[] };
    };
    project_id: string;
    search: string;
};

const TilsynObjects = ({ tilsynObjects, project_id, search }: TilsynObjectsProps) => {
    const isInitialRender = useRef(true);
    const tableRef = useRef<HTMLTableElement | null>(null);

    const [inputValue, setInputValue] = useState<string>(search);
    const [searchTerm, setSearchTerm] = useState<string>(search);
    const [selectedProject, setSelectedProject] = useState<string>(project_id);
    const [pageNumber, setPageNumber] = useState<string>('1');
    const [sortColumn, setSortColumn] = useState<string>('frist');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Update page number when pagination links are clicked
    const updatedPageNumber = (link: { url: string | null; label: string; active: boolean }) => {
        setPageNumber(link.url ? link.url.split('=')[1] : '1');
    };

    // Construct the URL for fetching TilsynObjects with current filters and sorting
    const tilsynObjectsUrl = useMemo(() => {
        const url = new URL(route('tilsyn_objects'));
        if (selectedProject) {
            url.searchParams.append('project_id', selectedProject);
        }
        if (searchTerm) {
            url.searchParams.append('search', searchTerm);
        }
        url.searchParams.append('page', pageNumber);
        url.searchParams.append('sort_by', sortColumn === 'saksbehandler' ? 'saksbeh' : sortColumn === 'prosjekt' ? 'project_id' : sortColumn);
        url.searchParams.append('sort_direction', sortDirection);
        return url.toString();
    }, [searchTerm, pageNumber, selectedProject, sortColumn, sortDirection]);

    // Effect to handle initial render and URL updates
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

    // Effect to handle input value changes and debounce search
    useEffect(() => {
        if (inputValue === searchTerm) return;
        // Debounce the search input to avoid too many requests
        const handler = setTimeout(() => {
            setSearchTerm(inputValue);
            setPageNumber('1'); // Reset to first page on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue, searchTerm]);

    return (
        <AppLayout>
            <Head title="Tilsynsobjekter" />
            <div className={styles.searchAndExport}>
                <Input name="search" placeholder="Søk" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                <X size={16} className={styles.clearIcon} onClick={() => setInputValue('')} />
                <FilterByProject selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                <TableButtons tilsynObjects={tilsynObjects.data} tableRef={tableRef} />
            </div>
            {tilsynObjects.data.length === 0 && (
                <div className={styles.noResults}>
                    <p>Ingen tilsynsobjekter funnet.</p>
                </div>
            )}
            {tilsynObjects.data.length > 0 && (
                <TilsynObjectsTable
                    ref={tableRef}
                    tilsynObjects={tilsynObjects.data}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    setSortDirection={setSortDirection}
                />
            )}
            <Pagination meta={tilsynObjects.meta} updatedPageNumber={updatedPageNumber} />
        </AppLayout>
    );
};

export default TilsynObjects;
