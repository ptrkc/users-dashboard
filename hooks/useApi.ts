import { useState } from 'react';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  role: string;
}

export interface CreateUser {
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
}

export interface UpdateUser extends CreateUser {
  id: string; // If you don't send the ID on the PUT body, it becomes null on the server
}

const apiUrl =
  process.env.API_URL || 'https://test-front-p6cqni7znq-uc.a.run.app';

export function useAPI<T>() {
  const [isLoading, setIsLoading] = useState<boolean | undefined>();

  const makeRequest = async ({
    route = '',
    method = 'GET',
    body = null,
  }: {
    route?: string;
    method?: string;
    body?: Record<any, any> | null;
  } = {}) => {
    setIsLoading(true);

    let error: any = false;
    let data: T | undefined = undefined;
    try {
      const response = await fetch(`${apiUrl}/${route}`, {
        method,
        body: body ? (JSON.stringify(body) as BodyInit) : null,
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status > 400) {
        error = response.status;
      }
      data = await response.json();
    } catch (err) {
      error = err;
    } finally {
      setIsLoading(false);
      return { data, error };
    }
  };

  const getUsers = () => makeRequest();
  const getUser = (id: string) => makeRequest({ route: id });
  const createUser = (userData: CreateUser) =>
    makeRequest({ method: 'POST', body: userData });
  const updateUser = (id: string, updateData: UpdateUser) =>
    makeRequest({ route: id, method: 'PUT', body: updateData });
  const deleteUser = (id: string) =>
    makeRequest({ route: id, method: 'DELETE' });

  return {
    isLoading,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
