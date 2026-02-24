import { Container } from '@/components/ui/container';
import { SectionLabel } from './section-label';

export const FeatureSection = () => {
  const features = [
    {
      imgae: '',
      title: 'Instant Visibilty, Zero Delays',
      subtitle:
        "See spend appear the moment it happens, whether it's a coffee or a client dinner.",
    },
    {
      imgae: '',
      title: 'Continous Cash Flow Insights',
      subtitle:
        'See how money moves across the expenses and operations with graphs and patterns',
    },
    {
      imgae: '',
      title: 'Built for transparency',
      subtitle:
        'Every transactions is flagged with a categorical expense and employee details instantly.',
    },
    {
      imgae: '',
      title: 'Smarter Alerts & Notification',
      subtitle:
        'Customize notifications by amount, category or user to focus only on what matters the most.',
    },
  ];
  return (
    <section id="features">
      <Container className="my-8">
        <div className="my-8 flex items-center justify-between gap-40">
          <SectionLabel
            label="Features deep dive"
            headline="Whether you are a inidividual creator/ org owner we got you!"
          ></SectionLabel>
          <p className="text-muted max-w-md">
            Bring your every transaction to one platform, automate reporting,
            expenses, add income flows, or organization finances from day one.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 px-30">
          {features &&
            features.map((feature, index) => (
              <div className="border-border rounded-2xl border" key={index}>
                <div className="bg-surface/40 h-64"></div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-muted text-base font-normal">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};
