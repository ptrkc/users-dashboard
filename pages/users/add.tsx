import { FormInput } from '@/components/FormInput';
import { FormSelect } from '@/components/FormSelect';
import { ArrowLeftIcon } from '@/components/Icons';
import { PageContainer } from '@/components/PageContainer';
import { useRouter } from 'next/router';

export default function AddUserPage() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <PageContainer
      title="Add User"
      className="pl-4 pt-4 pr-0 pb-0 flex flex-col gap-4 h-full"
    >
      <div className="bg-white rounded-l-lg p-8 shadow-soft">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex justify-center items-center gap-8">
            <button
              onClick={goBack}
              className="w-10 h-10 rounded-full text-white bg-[#DBA97C] flex justify-center items-center p-3 shrink-0"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="text-2xl font-bold text-shadow">Add new user</h1>
          </div>
          <button className="bg-[#52D8B0] text-white hover:shadow-hard hover:-translate-y-1 transition-all px-4 py-3 rounded-xl font-semibold text-sm">
            save and add
          </button>
        </div>
      </div>
      <div className="bg-white rounded-tl-lg p-8 h-full grow shadow-soft">
        <h2 className="text-lg font-bold text-shadow mb-8">User information</h2>
        <form className="flex gap-8 flex-wrap">
          <FormInput
            type="text"
            label="First name"
            placeholder="insert first name"
            required
          />
          <FormInput
            type="text"
            label="Last name"
            placeholder="insert last name"
            required
          />
          <FormInput
            type="email"
            label="Email"
            placeholder="insert email address"
          />
          <FormSelect label="Role" defaultValue="">
            <option value="">select role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="DEV">DEV</option>
          </FormSelect>
        </form>
      </div>
    </PageContainer>
  );
}
