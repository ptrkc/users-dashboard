import { ArrowLeftIcon } from '@/components/Icons';
import { Button } from '@/components/Button';
import { PageContainer } from '@/components/PageContainer';
import { UserForm } from '@/components/UserForm';
import { CreateUser, useAPI, User } from '@/hooks/useApi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';

export default function AddUserPage() {
  const router = useRouter();
  const goBack = () => router.back();
  const methods = useForm<CreateUser>();
  const { setToast } = useToast();

  const { isLoading = false, createUser } = useAPI<User>();

  const onSubmit = async (userData: CreateUser) => {
    if (userData.email === '') delete userData.email;
    if (userData.role === '') delete userData.role;
    const { data, error } = await createUser(userData);
    if (data && !error) {
      setToast({ type: 'ok', message: 'User created!' });
      router.push(`/users/${data.id}`);
    } else {
      setToast({ type: 'error', message: `Error ${error}` });
    }
  };

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
          <Button
            onClick={methods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            color="green"
          >
            save and add
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-tl-lg p-8 h-full grow shadow-soft">
        <h2 className="text-lg font-bold text-shadow mb-8">User information</h2>
        <UserForm methods={methods} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </PageContainer>
  );
}
