'use client';

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch('/api/expense', {
          headers: {
            'user-id': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setExpense(data);
        console.log(expense);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
  }, []);

  return <main className="flex-1 overflow-y-auto p-4">Dashboard</main>;
}
