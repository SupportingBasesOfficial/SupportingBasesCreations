'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function UserListPage() {
  const [search, setSearch] = useState('');
  const { data: items, isLoading } = api.user.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="grid gap-4">
        {items?.map((item) => (
          <Link
            key={item.id}
            href={`/users/${item.id}`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="font-semibold">{item.name || item.id}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
