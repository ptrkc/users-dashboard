import { ArrowLeftIcon, SpinnerIcon } from '@/components/Icons';
import { LoadingButton } from '@/components/LoadingButton';
import { PageContainer } from '@/components/PageContainer';
import { UserForm } from '@/components/UserForm';
import { CreateUser, useAPI, User } from '@/hooks/useApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const goBack = () => router.back();
  const [user, setUser] = useState<User>();

  const { isLoading: isGettingUser = true, getUser } = useAPI<User>();
  const { isLoading: isUpdatingUser = false, updateUser } = useAPI<User>();
  const { isLoading: isDeletingUser = false, deleteUser } = useAPI<true>();

  const methods = useForm<CreateUser>();

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
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
  }, [user]);

  useEffect(() => {
    const getDefaultValues = async () => {
      if (typeof id === 'string') {
        const { data: userData, error } = await getUser(id);
        if (error) {
          window.alert(`User not found or no valid id (Error ${error}).`);
          return router.push('/users');
        }
        setUser(userData);
      }
    };
    getDefaultValues();
  }, [id]);

  const confirmDeleteUser = async () => {
    const isSure = window.confirm(
      'Are you sure you want to delete this user?\nThis action cannot be undone.'
    );
    if (isSure && user) {
      const { error } = await deleteUser(user.id);
      if (!error) {
        window.alert('User deleted!');
        router.push('/users');
      } else {
        window.alert(`Error ${error}`);
      }
    }
  };

  const onSubmit = async (userData: CreateUser) => {
    if (userData.email === '') delete userData.email;
    if (userData.role === '') delete userData.role;
    if (typeof id === 'string') {
      const { error } = await updateUser(id, { ...userData, id });
      if (!error) {
        window.alert('User updated!');
      } else {
        window.alert(`Error ${error}`);
      }
    }
  };

  return (
    <PageContainer
      title="Edit User"
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
          <div className="flex gap-2">
            <LoadingButton
              onClick={methods.handleSubmit(onSubmit)}
              disabled={isUpdatingUser || isGettingUser || isDeletingUser}
              isLoading={isUpdatingUser}
              color="green"
            >
              update user
            </LoadingButton>
            <LoadingButton
              onClick={confirmDeleteUser}
              disabled={isUpdatingUser || isGettingUser || isDeletingUser}
              isLoading={isDeletingUser}
              color="red"
            >
              delete user
            </LoadingButton>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-tl-lg p-8 h-full grow shadow-soft">
        <h2 className="text-lg font-bold text-shadow mb-8 flex justify-start items-center gap-2">
          User information
          {isGettingUser && (
            <span className="h-4 w-4">
              <SpinnerIcon />
            </span>
          )}
        </h2>
        <UserForm
          methods={methods}
          onSubmit={onSubmit}
          isLoading={isUpdatingUser || isGettingUser}
        />
      </div>
    </PageContainer>
  );
}
