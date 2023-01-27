import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '@/components/FormInput';
import { FormSelect } from '@/components/FormSelect';
import { CreateUser } from '@/hooks/useApi';

export function UserForm({
  methods,
  onSubmit,
  isLoading,
}: {
  isLoading: boolean;
  methods: UseFormReturn<CreateUser, any>;
  onSubmit: (userData: CreateUser) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const validateEmail = (value: string | undefined) => {
    if (!value) return true;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
    return emailRegex.test(value) ? true : 'Invalid email';
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-8 flex-wrap">
      <div>
        <FormInput
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
          {...register('email', { validate: validateEmail })}
          type="email"
          label="Email"
          placeholder="insert email address"
        />
        {errors?.email && (
          <p className="text-red-600 mt-2">{errors.email.message}</p>
        )}
      </div>
      <FormSelect
        label="Role"
        defaultValue=""
        {...register('role')}
        disabled={isLoading}
      >
        <option value="">select role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="DEV">DEV</option>
      </FormSelect>
      <input type="submit" hidden />
    </form>
  );
}
