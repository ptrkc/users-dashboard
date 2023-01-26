import { FormInput } from '@/components/FormInput';
import { FormSelect } from '@/components/FormSelect';
import { ArrowLeftIcon } from '@/components/Icons';
import { PageContainer } from '@/components/PageContainer';
import { CreateUser, useAPI } from '@/hooks/useApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function AddUserPage() {
  const router = useRouter();
  const goBack = () => router.back();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();
  const { data, isLoading, createUser } = useAPI();

  const onSubmit = async (userData: CreateUser) => {
    if (userData.email === '') delete userData.email;
    if (userData.role === '') delete userData.role;
    await createUser(userData);
  };

  useEffect(() => {
    if (data) window.alert('User created!');
  }, [data]);

  const validateEmail = (value: string | undefined) => {
    if (!value) return true;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return emailRegex.test(value) ? true : 'Invalid email';
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
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="bg-[#52D8B0] disabled:bg-[#9fe4cf] disabled:cursor-wait text-white hover:shadow-hard hover:-translate-y-1 transition-all px-4 py-3 rounded-xl font-semibold text-sm"
          >
            save and add
          </button>
        </div>
      </div>
      <div className="bg-white rounded-tl-lg p-8 h-full grow shadow-soft">
        <h2 className="text-lg font-bold text-shadow mb-8">User information</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-8 flex-wrap"
        >
          <div>
            <FormInput
              {...register('first_name', { required: true })}
              type="text"
              label="First name"
              placeholder="insert first name"
              required
            />
            {errors?.first_name && (
              <p className="text-red-600 mt-2">{'First name is required'}</p>
            )}
          </div>
          <div>
            <FormInput
              {...register('last_name', { required: true })}
              type="text"
              label="Last name"
              placeholder="insert last name"
              required
            />
            {errors?.last_name && (
              <p className="text-red-600 mt-2">{'Last name is required'}</p>
            )}
          </div>
          <div>
            <FormInput
              {...register('email', { validate: validateEmail })}
              type="email"
              label="Email"
              placeholder="insert email address"
            />
            {errors?.email && (
              <p className="text-red-600 mt-2">{errors.email.message}</p>
            )}
          </div>
          <FormSelect label="Role" defaultValue="" {...register('role')}>
            <option value="">select role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="DEV">DEV</option>
          </FormSelect>
        </form>
      </div>
    </PageContainer>
  );
}
