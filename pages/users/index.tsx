import PageContainer from '@/components/PageContainer';
import { SearchInput } from '@/components/SearchInput';
import { UserCard } from '@/components/UserCard';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useMemo, useState } from 'react';

const users = [
  {
    id: 'd2ab8265-768b-4592-8c30-68544da99180',
    first_name: 'Youri',
    last_name: 'Prediko',
    role: 'ADMIN',
  },
  {
    id: 'd2ab8165-768b-4592-8c30-68544da99180',
    first_name: 'Nicolas',
    last_name: 'Prediko',
    role: 'ADMIN',
  },
  {
    id: 'd2ab8165-368b-4592-8c30-68544da99180',
    first_name: 'Seif',
    last_name: 'Prediko',
    role: 'ADMIN',
  },
  {
    id: '2c688f0f-8b74-41d5-a2c4-2bac2e12b898',
    first_name: 'Patrick',
    last_name: 'Carneiro',
    email: 'pcarneiro.dev@gmail.com',
    role: 'DEV',
  },
];

export default function UsersPage() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounceValue(searchInput).toLowerCase();

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(debouncedSearch) ||
          user.last_name.toLowerCase().includes(debouncedSearch) ||
          user.email?.toLowerCase().includes(debouncedSearch)
      ),
    [debouncedSearch]
  );
  return (
    <PageContainer
      className="mx-auto w-full max-w-5xl mt-14 grid grid-cols-1 gap-8"
      title="Our Users"
    >
      <h1 className="text-2xl font-bold text-[#1E1F20] text-shadow">
        Our Users
      </h1>
      <div className="flex justify-between items-center">
        <SearchInput value={searchInput} setValue={setSearchInput} />
        <button className="shrink-0">add new user</button>
      </div>
      {filteredUsers.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      ) : (
        <p>No users found. {debouncedSearch && 'Try resetting your search.'}</p>
      )}
    </PageContainer>
  );
}
