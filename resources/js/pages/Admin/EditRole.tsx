import FormCard from "@/components/ui/FormCard";
import AppLayout from "@/layouts/AppLayout";

const EditRole = () => {
  return (
    <AppLayout>
        <h1>Rediger Rolle</h1>
        <FormCard onSubmit={() => console.log('Form submitted')}>
            <div>
            <label htmlFor="roleName">Rolle Navn:</label>
            <input type="text" id="roleName" name="roleName" aria-required />
            </div>
            <div>
            <label htmlFor="roleDescription">Beskrivelse:</label>
            <textarea id="roleDescription" name="roleDescription" aria-required></textarea>
            </div>
            <button type="submit">Lagre Endringer</button>
        </FormCard>
    </AppLayout>
  )
};

export default EditRole;
