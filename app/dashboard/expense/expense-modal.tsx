"use client";

import React, { useState } from "react";

export const ExpenseModal = () => {
  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      setError("User not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({
          amount: Number(amount),
          category: category.trim(),
          date: new Date(date).toISOString(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to add expense");
        return;
      }
      setAmount("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      {" "}
      <form
        className="flex flex-col gap-6 border p-4 max-w-sm rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button type="submit" className="cursor-pointer">
          Add Expense
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
