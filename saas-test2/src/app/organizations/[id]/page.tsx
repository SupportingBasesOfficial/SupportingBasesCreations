'use client';

import { useParams } from 'next/navigation';
import { api } from '@/trpc/react';
import Link from 'next/link';

export default function OrganizationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: item, isLoading } = api.organization.getById.useQuery({ id });

  if (isLoading) return <div>Loading...</div>;
  if (!item) return <div>Not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/organizations" className="text-blue-500 hover:underline">
        ← Back to Organizations
      </Link>
      <h1 className="text-2xl font-bold mt-4">{item.name || item.id}</h1>
      <div className="mt-4 space-y-2">
        <p><strong>id:</strong> {String(item.id)}</p>
        <p><strong>name:</strong> {String(item.name)}</p>
        <p><strong>settings:</strong> {String(item.settings)}</p>
        <p><strong>createdAt:</strong> {String(item.createdAt)}</p>
        <p><strong>updatedAt:</strong> {String(item.updatedAt)}</p>
      </div>
    </div>
  );
}
