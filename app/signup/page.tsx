'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error || 'Registration failed');
        return;
      }

      const userId = data.user?.id;
      if (!userId) {
        setMessage('Error creating user');
      }

      localStorage.setItem('userId', userId);
      setMessage(data.msg);

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Network error. Please try again.');
    }
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Enter Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="cursor-pointer">
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
