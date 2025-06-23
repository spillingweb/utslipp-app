import AppLayout from '@/layouts/AppLayout';
import { Data, TilsynObject } from '@/types';

const EditTilsynObject = ({ tilsynObject }: { tilsynObject: Data<TilsynObject> }) => {
    console.log('Editing Tilsyn Object:', tilsynObject);
    return (
        <AppLayout>
            <h1>Edit Tilsyn Object</h1>
            {/* Add your form or components for editing the Tilsyn Object here */}
            <p>{`This is where you can edit the details of tilsyn object ${tilsynObject.data.id}`}</p>
            {/* Example form could go here */}
        </AppLayout>
    );
};

export default EditTilsynObject;
