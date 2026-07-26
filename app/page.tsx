import { Header } from '@/components/Header/Header'
import { HeroSection } from '@/components/Hero/HeroSection'
import { ServicesSection } from '@/components/Services/ServicesSection'
import { AboutSection } from '@/components/About/AboutSection'
import { ProcessSection } from '@/components/Process/ProcessSection'
import { TestimonialsSection } from '@/components/Testimonials/TestimonialsSection'
import { GallerySection } from '@/components/Gallery/GallerySection'
import { BookingCTASection } from '@/components/BookingCTA/BookingCTASection'
import { FAQSection } from '@/components/FAQ/FAQSection'
import { FooterSection } from '@/components/Footer/FooterSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <TestimonialsSection />
        <GallerySection />
        <BookingCTASection />
        <FAQSection />
      </main>
      <FooterSection />
    </>
  )
}
