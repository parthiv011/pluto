'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Container } from '../../components/ui/container';
import { MiniDashboard } from './mini-dashboard';

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="border-border relative min-h-screen overflow-hidden border-b pt-20">
      {/* LEFT CONTENT (CONTAINER) */}
      <Container>
        <div className="flex h-[calc(100vh-80px)] items-center">
          <div className="flex-1 space-y-6">
            <h1 className="max-w-xl text-5xl leading-tight font-bold">
              Keep an eye on your spending in real-time as it occurs
            </h1>

            <p className="text-muted-foreground max-w-lg text-lg">
              Gain instant visibility into every transaction with live feeds,
              alerts, and dashboards that update the moment money moves.
            </p>

            <Button onClick={() => router.push('/signup')}>Get Started</Button>
          </div>
          <div className="flex-1" />
        </div>
      </Container>

      {/* RIGHT PANEL (OUTSIDE CONTAINER) */}
      <div className="pointer-events-none absolute top-20 right-0 bottom-0 w-[50vw] min-w-125 pt-20">
        <div className="bg-surface/40 border-border/60 pointer-events-auto h-full w-full rounded-tl-2xl border border-t border-l shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <MiniDashboard />
        </div>
      </div>
    </section>
  );
};
