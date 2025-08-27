import Button from '@/components/ui/Button';
import Flash from '@/components/ui/Flash';
import { TilsynObject } from '@/types';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';

const TableButtons = ({ tilsynObjects, tableRef }: { tilsynObjects: TilsynObject[]; tableRef: React.RefObject<HTMLTableElement | null> }) => {
    const [flashMessage, setFlashMessage] = useState<{ success: string | null; error: string | null } | null>(null);

    const headers = [
        { label: 'Sone', key: 'sone' },
        { label: 'Prosjekt', key: 'project_id' },
        { label: 'Saksbehandler', key: 'saksbeh' },
        { label: 'Gnr', key: 'gnr' },
        { label: 'Bnr', key: 'bnr' },
        { label: 'Fnr', key: 'fnr' },
        { label: 'Adresse', key: 'adresse' },
        { label: 'Bygning', key: 'bygning' },
        { label: 'Hjemmel', key: 'hjemmel' },
        { label: 'Status', key: 'status' },
        { label: 'Frist', key: 'frist' },
        { label: 'Saksnummer', key: 'saksnummer' },
        { label: 'Kommentar', key: 'kommentar' },
        { label: 'Svarskjema', key: 'svarskjema' },
        { label: 'KomTek', key: 'komtek' },
        { label: 'Kontroll', key: 'kontroll' },
        { label: 'Arkiv', key: 'arkiv' },
        { label: 'Opprettet', key: 'created_at' },
        { label: 'Oppdatert', key: 'updated_at' },
        { label: 'Oppdatert av', key: 'endret_av' },
    ];

    const handleCopyTable = async () => {
        const table = tableRef.current;
        if (table) {
            try {
                const tableHtml = table.outerHTML;
                const type = 'text/html';
                const blob = new Blob([tableHtml], { type });
                const data = [new ClipboardItem({ [type]: blob })];
                await navigator.clipboard.write(data);
                setFlashMessage({ success: 'Tabellen er kopiert!', error: null });
            } catch (err) {
                console.error('Failed to copy table: ', err);
                setFlashMessage({ success: null, error: 'Kunne ikke kopiere tabellen til utklippstavlen.' });
            }
        }
    };

    const handlePrintTable = useReactToPrint({
        contentRef: tableRef,
        documentTitle: `Tilsynsobjekter ${new Date().toISOString().slice(0, 10)}`,
        pageStyle: 'background: transparent; margin: 2rem; @media print { @page { size: A3 landscape; }',
    });

    return (
        <>
            {flashMessage && <Flash message={flashMessage} />}
            <CSVLink data={tilsynObjects} headers={headers} filename={`tilsyn_objects_${new Date().toISOString().slice(0, 10)}.csv`}>
                <Button>Last ned CSV</Button>
            </CSVLink>
            <Button onClick={handleCopyTable}>Kopier til utklippstavle</Button>
            <Button onClick={handlePrintTable}>Skriv ut</Button>
        </>
    );
};

export default TableButtons;
