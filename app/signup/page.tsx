'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || 'Registration failed');
        return;
      }

      const userId = data?.user?.id;

      if (!userId) {
        setMessage('Error creating user');
        return;
      }

      localStorage.setItem('userId', userId);

      setMessage('Account created! Redirecting...');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="bg-muted/50 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <Logo />

        <h1 className="mt-6 text-3xl font-bold">Welcome to Pluto</h1>

        <p className="text-muted-foreground mt-2 max-w-sm">
          Track your income streams effortlessly and let Pluto analyze your
          recurring expenses and earnings.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <p className="text-muted-foreground text-sm">Try Pluto for free</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border-border rounded-md border px-3 py-2 outline-none focus:ring-2"
            />

            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border-border rounded-md border px-3 py-2 outline-none focus:ring-2"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
