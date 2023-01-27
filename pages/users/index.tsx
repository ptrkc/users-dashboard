import { useEffect, useMemo, useState } from 'react';
import { AddUserButton } from '@/components/AddUserButton';
import { PageContainer } from '@/components/PageContainer';
import { SearchInput } from '@/components/SearchInput';
import { UserCard } from '@/components/UserCard';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { User, useAPI } from '@/hooks/useApi';

export default function UsersPage() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounceValue(searchInput).toLowerCase();

  const { data = [], isLoading = true, error, getUsers } = useAPI();
  const users = data as User[];

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(debouncedSearch) ||
          user.last_name.toLowerCase().includes(debouncedSearch) ||
          user.email?.toLowerCase().includes(debouncedSearch)
      ),
    [debouncedSearch, users]
  );

  return (
    <PageContainer
      className="mx-auto w-full max-w-5xl mt-14 grid grid-cols-1 gap-8"
      title="Our Users"
    >
      <h1 className="text-2xl font-bold text-[#1E1F20] text-shadow">
        Our Users
      </h1>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <SearchInput value={searchInput} setValue={setSearchInput} />
        <AddUserButton />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading &&
          Array.from(Array(3).keys()).map((index) => <UserCard key={index} />)}
        {!isLoading &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
      </ul>
      {!isLoading && filteredUsers.length === 0 && (
        <p>No users found. {debouncedSearch && 'Try resetting your search.'}</p>
      )}
    </PageContainer>
  );
}
