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

const apiUrl =
  process.env.API_URL || 'https://test-front-p6cqni7znq-uc.a.run.app';

export function useAPI() {
  const [data, setData] = useState<User | User[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [error, setError] = useState<any>(null);

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
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/${route}`, {
        method,
        body: body ? (JSON.stringify(body) as BodyInit) : null,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = () => makeRequest();
  const getUser = (id: string) => makeRequest({ route: id });
  const createUser = (userData: CreateUser) =>
    makeRequest({ method: 'POST', body: userData });
  const updateUser = (id: string, updateData: CreateUser) =>
    makeRequest({ route: id, method: 'PUT', body: updateData });
  const deleteUser = (id: string) =>
    makeRequest({ route: id, method: 'DELETE' });

  return {
    data,
    isLoading,
    error,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
