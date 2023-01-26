import { ArrowLeftIcon } from '@/components/Icons';
import { PageContainer } from '@/components/PageContainer';
import { useRouter } from 'next/router';

export default function AddUserPage() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <PageContainer title="Add User" className="pl-4 pt-4 pr-0 pb-0">
      <div className="bg-white rounded-l-lg p-8">
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
    </PageContainer>
  );
}
