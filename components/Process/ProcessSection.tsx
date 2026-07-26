import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STEPS = [
  {
    num: '01',
    title: 'Reserve Your Time',
    desc: 'Book online in minutes, then arrive to a calm, private studio built entirely around you.',
  },
  {
    num: '02',
    title: 'Your Consultation',
    desc: 'Lilit reviews your natural lashes, eye shape, and lifestyle to map the set that suits you best.',
  },
  {
    num: '03',
    title: 'The Application',
    desc: 'Relax as each extension is placed by hand, one at a time, with quiet, unhurried precision.',
  },
  {
    num: '04',
    title: 'Aftercare & Beyond',
    desc: 'Leave with everything you need to protect your set, plus guidance for your next fill.',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-bg-card py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="The Process"
            title="The SG Beauty Experience"
            sub="From your first booking to your next fill — a calm, considered process at every step."
          />
        </FadeInOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 mt-20">
          {STEPS.map((step, i) => (
            <FadeInOnScroll key={step.num} delay={i * 0.12}>
              <div className="relative flex flex-col">
                {/* Faded step number */}
                <span
                  className="font-display font-bold text-[3.75rem] leading-none text-sg-ink/10 select-none"
                  aria-hidden="true"
                >
                  {step.num}
                </span>

                <span className="block w-8 h-px bg-sg-sage-deep mt-4 mb-4" aria-hidden="true" />

                <h3 className="font-display font-semibold text-[1.25rem] text-fg-1 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-[0.9375rem] text-fg-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
