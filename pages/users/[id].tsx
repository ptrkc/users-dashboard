import { ArrowLeftIcon } from '@/components/Icons';
import { PageContainer } from '@/components/PageContainer';
import { UserForm } from '@/components/UserForm';
import { CreateUser, useAPI, User } from '@/hooks/useApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.back();

  const {
    data: userData,
    error,
    isLoading: isGettingUser = true,
    getUser,
  } = useAPI();
  const {
    data: updatedData,
    isLoading: isUpdatingUser = false,
    updateUser,
  } = useAPI();

  const methods = useForm<CreateUser>();

  useEffect(() => {
    if (updatedData) window.alert('User updated!');
  }, [updatedData]);

  useEffect(() => {
    if (error) {
      window.alert(`User not found or no valid id (Status ${error}).`);
      router.push('/users');
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      Object.entries(userData as User).forEach(([key, value]) => {
        // ugly but TS was not accepting validKeys.includes(key)
        if (
          key === 'role' ||
          key === 'email' ||
          key === 'first_name' ||
          key === 'last_name'
        )
          methods.setValue(key, value);
      });
    }
  }, [userData]);

  useEffect(() => {
    const getDefaultValues = async () => {
      if (typeof id === 'string') {
        await getUser(id);
      }
    };
    getDefaultValues();
  }, [id]);

  const onSubmit = async (userData: CreateUser) => {
    if (userData.email === '') delete userData.email;
    if (userData.role === '') delete userData.role;
    if (typeof id === 'string') {
      await updateUser(id, { ...userData, id });
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
            <h1 className="text-2xl font-bold text-shadow">Edit User</h1>
          </div>
          <button
            onClick={methods.handleSubmit(onSubmit)}
            disabled={isUpdatingUser || isGettingUser}
            className="bg-[#52D8B0] disabled:bg-[#9fe4cf] disabled:cursor-wait text-white hover:shadow-hard hover:-translate-y-1 transition-all px-4 py-3 rounded-xl font-semibold text-sm"
          >
            save user
          </button>
        </div>
      </div>
      <div className="bg-white rounded-tl-lg p-8 h-full grow shadow-soft">
        <h2 className="text-lg font-bold text-shadow mb-8">User information</h2>
        <UserForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={isUpdatingUser || isGettingUser}
        />
      </div>
    </PageContainer>
  );
}
