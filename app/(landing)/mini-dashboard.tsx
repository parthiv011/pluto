'use client';

import { useState } from 'react';
import { cn } from '@/app/lib/utils';

const sidebar = [
  {
    group: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'expenses', label: 'Expenses' },
      { id: 'income', label: 'Income' },
      { id: 'org', label: 'Organization' },
    ],
  },
  {
    group: 'Management',
    items: [
      { id: 'wages', label: 'Daily Wages' },
      { id: 'attendance', label: 'Attendance' },
      { id: 'payouts', label: 'Payouts' },
    ],
  },
];

export const MiniDashboard = () => {
  const [active, setActive] = useState('expenses');

  return (
    <div className="bg-surface/40 border-border/60 flex h-full w-full max-w-2xl translate-x-6 overflow-hidden rounded-tl-2xl border border-l shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      {/* Sidebar */}
      <div className="border-border flex w-40 flex-col border-r px-3 py-8">
        {sidebar.map((section) => (
          <div key={section.group} className="mb-2 space-y-1">
            {/* Section Title */}
            <p className="text-muted text-[10px] tracking-wider uppercase">
              {section.group}
            </p>

            {/* Items */}
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-all duration-200',
                    'text-muted hover:bg-background/60 hover:text-foreground',
                    active === item.id &&
                      'bg-background text-foreground font-medium'
                  )}
                >
                  {/* Active Indicator */}
                  <div
                    className={cn(
                      'h-4 w-1 rounded-full transition-all',
                      active === item.id
                        ? 'bg-foreground'
                        : 'group-hover:bg-border bg-transparent'
                    )}
                  />

                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Content wrapper */}
      <div className="flex w-full max-w-lg flex-1 flex-col overflow-hidden">
        {/* Content (THIS is the important part) */}
        <div className="flex-1 overflow-hidden p-5">
          {active === 'overview' && <Overview />}
          {active === 'expenses' && <Expenses />}
          {active === 'income' && <Income />}
          {active === 'org' && <Organization />}

          {active === 'wages' && <DailyWages />}
          {active === 'attendance' && <Attendance />}
          {active === 'payouts' && <Payouts />}
        </div>
      </div>
    </div>
  );
};

const Expenses = () => {
  const data = [
    {
      category: 'Subscriptions',
      items: [
        { title: 'Spotify', amount: -199 },
        { title: 'Netflix', amount: -499 },
      ],
    },
    {
      category: 'Shopping',
      items: [{ title: 'Amazon', amount: -1299 }],
    },
    {
      category: 'Food',
      items: [{ title: 'Swiggy', amount: -450 }],
    },
  ];

  const total = data
    .flatMap((c) => c.items)
    .reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="flex h-full flex-col space-y-5 overflow-hidden">
      <div className="bg-background/60 border-border rounded-xl border p-4">
        <p className="text-muted text-xs">Total Spent</p>
        <h3 className="mt-1 text-2xl font-bold text-red-500">
          ₹{Math.abs(total)}
        </h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {data.map((group) => (
          <div key={group.category} className="space-y-2">
            <p className="text-muted text-xs tracking-wide uppercase">
              {group.category}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => (
                <Row
                  key={item.title}
                  title={item.title}
                  subtitle={group.category}
                  amount={`₹${item.amount}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Income = () => {
  const streams = [
    {
      source: 'YouTube',
      value: 18000,
      growth: '+12%',
    },
    {
      source: 'Sponsorships',
      value: 12000,
      growth: '+8%',
    },
    {
      source: 'Affiliate',
      value: 5000,
      growth: '+4%',
    },
  ];

  const total = streams.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="bg-background/60 border-border rounded-xl border p-4">
        <p className="text-muted text-xs">Total Income</p>
        <h3 className="mt-1 text-2xl font-bold text-green-500">₹{total}</h3>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {streams.map((s) => (
          <div
            key={s.source}
            className="hover:bg-background/60 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition"
          >
            <div>
              <p className="text-sm font-medium">{s.source}</p>
              <p className="text-muted text-xs">Income Stream</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-green-500">₹{s.value}</p>
              <p className="text-muted text-xs">{s.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Organization = () => {
  const costs = [
    { name: 'Engineering', value: 40000 },
    { name: 'Marketing', value: 25000 },
    { name: 'Tools', value: 8000 },
  ];

  const total = costs.reduce((acc, c) => acc + c.value, 0);

  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="bg-background/60 border-border rounded-xl border p-4">
        <p className="text-muted text-xs">Monthly Burn</p>
        <h3 className="mt-1 text-2xl font-bold text-red-500">₹{total}</h3>
        <p className="text-muted mt-1 text-xs">-8% from last month</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {costs.map((c) => (
          <div
            key={c.name}
            className="hover:bg-background/60 flex items-center justify-between rounded-lg px-3 py-2 transition"
          >
            <p className="text-sm font-medium">{c.name}</p>
            <p className="text-sm font-medium">₹{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-border h-2 w-full overflow-hidden rounded-full">
        <div className="h-full w-[70%] bg-red-500" />
      </div>

      <p className="text-muted text-xs">70% of budget used</p>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="flex h-full flex-col space-y-5">
      {/* 🔥 Net Balance */}
      <div className="bg-background/60 border-border rounded-xl border p-4">
        <p className="text-muted text-xs">Net Balance</p>
        <h3 className="mt-1 text-2xl font-bold">₹32,450</h3>
        <p className="mt-1 text-xs text-green-500">+12% this month</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background/60 border-border rounded-lg border p-3">
          <p className="text-muted text-xs">Spent</p>
          <p className="font-semibold text-red-500">₹8,200</p>
        </div>

        <div className="bg-background/60 border-border rounded-lg border p-3">
          <p className="text-muted text-xs">Earned</p>
          <p className="font-semibold text-green-500">₹40,000</p>
        </div>
      </div>
      <div className="bg-background/60 border-border rounded-lg border p-3">
        <p className="text-sm font-medium">💡 Insight</p>
        <p className="text-muted mt-1 text-xs">
          Your food spending increased by 18% this week.
        </p>
      </div>

      <div className="bg-border/40 text-muted flex flex-1 items-center justify-center rounded-lg text-xs">
        Chart coming soon
      </div>
    </div>
  );
};

const DailyWages = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Daily Wages</h3>

      <Row title="Editor" subtitle="Today" amount="₹1,500" />
      <Row title="Camera Crew" subtitle="Today" amount="₹3,000" />
      <Row title="Designer" subtitle="Today" amount="₹1,200" />
    </div>
  );
};
const Attendance = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Attendance</h3>

      <div className="space-y-2">
        <p className="text-sm">👤 Ramesh – Present</p>
        <p className="text-sm">👤 Suresh – Absent</p>
        <p className="text-sm">👤 Aditi – Present</p>
      </div>
    </div>
  );
};

const Payouts = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payouts</h3>

      <Row title="YouTube Revenue" subtitle="Last payout" amount="+₹12,000" />
      <Row title="Brand Deal" subtitle="Pending" amount="+₹8,000" />
    </div>
  );
};
const Row = ({
  title,
  subtitle,
  amount,
}: {
  title: string;
  subtitle: string;
  amount: string;
}) => {
  const isPositive = amount.startsWith('+');

  return (
    <div className="group hover:bg-background/60 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-200">
      <div>
        <p className="group-hover:text-foreground text-sm font-medium transition-colors">
          {title}
        </p>
        <p className="text-muted text-xs">{subtitle}</p>
      </div>

      <p
        className={cn(
          'text-sm font-medium transition-all duration-200',
          isPositive
            ? 'text-green-500 group-hover:translate-x-1'
            : 'text-red-500 group-hover:translate-x-1'
        )}
      >
        {amount}
      </p>
    </div>
  );
};
