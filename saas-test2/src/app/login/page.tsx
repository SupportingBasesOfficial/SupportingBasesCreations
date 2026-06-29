'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) setError('Invalid credentials');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 w-full max-w-md p-8 border rounded">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full border p-2 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          Sign in with Google
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
