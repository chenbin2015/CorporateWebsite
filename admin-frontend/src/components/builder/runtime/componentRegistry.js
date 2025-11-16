import HeroCarouselPreview from './components/HeroCarouselPreview.vue'
import SectionHeroPreview from './components/SectionHeroPreview.vue'
import CTABannerPreview from './components/CTABannerPreview.vue'
import FallbackPreview from './components/FallbackPreview.vue'

export const componentRegistry = {
  HeroCarousel: HeroCarouselPreview,
  SectionHero: SectionHeroPreview,
  CTABanner: CTABannerPreview,
}

export const resolveBuilderComponent = (key) => componentRegistry[key] ?? FallbackPreview

