import { SelectedPointProvider } from './selected-point-context';
import { SidebarProvider } from './sidebar-context';
import { TilsynFormProvider } from './tilsyn-form-context';

const TilsynContext = ({ children }: { children: React.ReactNode }) => {
    return (
        <TilsynFormProvider>
            <SelectedPointProvider>
                <SidebarProvider>{children}</SidebarProvider>
            </SelectedPointProvider>
        </TilsynFormProvider>
    );
};

export default TilsynContext;
