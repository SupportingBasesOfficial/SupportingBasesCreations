'use client';

import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function UserDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: item, isLoading } = api.user.getById.useQuery({ id });

  if (isLoading) return <div>Loading...</div>;
  if (!item) return <div>Not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/users" className="text-blue-500 hover:underline">
        ← Back to Users
      </Link>
      <h1 className="text-2xl font-bold mt-4">{item.name || item.id}</h1>
      <div className="mt-4 space-y-2">
        <p><strong>id:</strong> {String(item.id)}</p>
        <p><strong>email:</strong> {String(item.email)}</p>
        <p><strong>name:</strong> {String(item.name)}</p>
        <p><strong>role:</strong> {String(item.role)}</p>
        <p><strong>createdAt:</strong> {String(item.createdAt)}</p>
        <p><strong>updatedAt:</strong> {String(item.updatedAt)}</p>
      </div>
    </div>
  );
}
