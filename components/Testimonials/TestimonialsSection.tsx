'use client'

import { Carousel } from '@/components/ui/Carousel'
import { FadeInOnScroll } from '@/components/ui/FadeInOnScroll'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/SG+Beauty/@45.6284904,-122.6712782,17z/data=!4m8!3m7!1s0x5495a9b8744f51a3:0xa71540861512aad!8m2!3d45.6284904!4d-122.6712782!9m1!1b1!16s%2Fg%2F11yybw4xmr?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D'

const STATS = [
  { value: '9+ Years', label: 'Experience' },
  { value: '100%', label: 'Customized Sets' },
  { value: 'Premium', label: 'Lash Materials' },
]

interface Review {
  quote: string
  name: string
  service?: string
  stars: number
}

/* Real 5-star reviews from SG Beauty's Google Business Profile — lightly
   trimmed for length/formatting, wording otherwise preserved. */
const REVIEWS: Review[] = [
  {
    quote:
      "I've been getting lash extensions for five years and hands down, she gives the best sets I've ever had. What makes her stand out isn't just her incredible skill — it's how professional and communicative she is from booking all the way to the appointment. She's always on time, makes the whole experience so relaxing, and the results speak for themselves. I leave every single time absolutely obsessed with my lashes. So grateful I found her!",
    name: 'Miranda W.',
    stars: 5,
  },
  {
    quote:
      "Lilit is the most amazing, trustworthy, hardworking, sweetest lady I know. This is my third time coming to her and I got another full set — I cannot go anywhere else, she has made my visits the best. She's very simple to book with, and well worth it. If you haven't come to her yet, you should.",
    name: 'Dee G.',
    stars: 5,
  },
  {
    quote:
      "I've had my lashes done by Lilit three times, and I love them every single time. She's incredibly talented, professional, and always does a fantastic job. If you're looking for beautiful lashes, I highly recommend her.",
    name: 'Anna D.',
    stars: 5,
  },
  {
    quote:
      "I truly cannot say enough good things about Lilit. She is not only incredibly talented, but one of the kindest souls you'll ever meet. Every appointment feels so comfortable and uplifting, and she always makes me feel beautiful and confident when I leave. Her technique is amazing — every set is clean, detailed, soft, and perfectly customized.",
    name: 'Sean S.',
    stars: 5,
  },
  {
    quote:
      'Absolutely love my lashes! The atmosphere was so calm and cozy, and my lash tech is such a sweet and professional person. Her work is amazing, and I highly recommend her.',
    name: 'Vika D.',
    stars: 5,
  },
  {
    quote:
      "I loved my lashes from Lilit! They looked very natural and lasted for a whole month. I had two photo shoots over the course of the month and they looked perfect. Lilit was very patient with me, and the whole experience was relaxing. She's the best!",
    name: 'Kine F.',
    stars: 5,
  },
  {
    quote:
      'Got my lashes done here for the first time and up to the three-week mark, my lashes were still intact — still wispy and full. Lilit is super sweet and her work is amazing. If you are looking for long-lasting lashes, this is the place to come.',
    name: 'Tati H.',
    stars: 5,
  },
  {
    quote:
      "Had an amazing experience here. Lilit is very experienced, fast, and does a great job. She is very sweet, and these are the best lashes I've had so far because she made them custom and with a Russian technique. Will be back!",
    name: 'Samantha',
    service: 'Russian Technique',
    stars: 5,
  },
  {
    quote:
      'I absolutely love my eyelashes. From the moment I walked in, the atmosphere was warm, clean, and very relaxing. Lilit is incredibly professional and talented — before starting, she took the time to do a full consultation and listened carefully to what I wanted. My lashes turned out even better than I expected: beautiful, lightweight, and perfectly done.',
    name: 'Elen M.',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src="/icons/star-filled.svg" width={14} height={14} alt="" />
      ))}
    </div>
  )
}

function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 bg-sg-cream rounded-xl shadow-2 px-8 py-12 sm:px-14 sm:py-14">
      <span
        aria-hidden="true"
        className="font-display text-6xl leading-none text-sg-sage-deep/25 select-none"
      >
        &ldquo;
      </span>

      <blockquote className="font-display font-semibold text-lg sm:text-xl leading-relaxed text-fg-1 -mt-4">
        {review.quote}
      </blockquote>

      <Stars count={review.stars} />

      <div className="flex flex-col gap-1">
        <span className="font-display font-semibold text-base text-fg-1">{review.name}</span>
        {review.service && (
          <span className="font-body text-xs text-sg-rose-text tracking-wide">
            {review.service}
          </span>
        )}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="reviews" className="bg-sg-sage py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="What clients say"
            title="Trusted. Recommended."
            sub="Gentle, safe lash care with results that last. Here is what clients say after their first set."
            light
          />
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14 mt-10 mb-14 py-6 border-y border-white/20">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-semibold text-2xl text-fg-on-dark">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-fg-on-dark/70 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInOnScroll>
      </div>

      <FadeInOnScroll delay={0.15}>
        <div className="mt-4">
          <Carousel
            items={REVIEWS}
            itemKey={(_, i) => i}
            ariaLabel={(i) => `Go to testimonial ${i + 1}`}
            slideClassName="w-[85%] sm:w-[72%] lg:w-[56%]"
            trackClassName="px-[7%] sm:px-[14%] lg:px-[22%]"
            renderItem={(review, i, { onSelect }) => (
              <button
                onClick={onSelect}
                aria-label={`View testimonial ${(i % REVIEWS.length) + 1} of ${REVIEWS.length}`}
                className="block w-full text-left cursor-pointer"
              >
                <TestimonialCard review={review} />
              </button>
            )}
          />
        </div>
      </FadeInOnScroll>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Google Reviews CTA */}
        <FadeInOnScroll delay={0.25}>
          <div className="mt-20 flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
            <h3 className="font-display font-semibold text-2xl text-fg-on-dark">
              Read More Client Stories
            </h3>
            <p className="font-body text-[0.9375rem] text-fg-on-dark/75 leading-relaxed">
              Explore more reviews from clients who have trusted SG Beauty for their lash and
              brow services.
            </p>
            <Button
              variant="cream"
              size="md"
              onClick={() => window.open(GOOGLE_REVIEWS_URL, '_blank')}
              className="mt-1"
            >
              View Google Reviews
            </Button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
