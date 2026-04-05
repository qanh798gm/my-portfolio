import { HeroSection } from '@/components/home/HeroSection'
import { CareerTimeline } from '@/components/timeline/CareerTimeline'
import { PersonalProjects } from '@/components/home/PersonalProjects'
import { AboutSection } from '@/components/home/AboutSection'
import { ContactSection } from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CareerTimeline />
      <PersonalProjects />
      <ContactSection />
    </>
  )
}
