import { FilterProvider } from './filter-context';
import { SelectedPointProvider } from './selected-point-context';
import { SidebarProvider } from './sidebar-context';
import { TilsynFormProvider } from './tilsyn-form-context';

const TilsynContext = ({ children }: { children: React.ReactNode }) => {
    return (
        <TilsynFormProvider>
            <SelectedPointProvider>
                <FilterProvider>
                    <SidebarProvider>{children}</SidebarProvider>
                </FilterProvider>
            </SelectedPointProvider>
        </TilsynFormProvider>
    );
};

export default TilsynContext;
