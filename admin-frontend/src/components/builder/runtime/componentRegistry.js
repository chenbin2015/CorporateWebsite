import HeroCarouselPreview from './components/HeroCarouselPreview.vue'
import SectionHeroPreview from './components/SectionHeroPreview.vue'
import CTABannerPreview from './components/CTABannerPreview.vue'
import PageHeroPreview from './components/PageHeroPreview.vue'
import MainHeaderPreview from './components/MainHeaderPreview.vue'
import TabsNavPreview from './components/TabsNavPreview.vue'
import BreadcrumbHeaderPreview from './components/BreadcrumbHeaderPreview.vue'
import TopLinksBarPreview from './components/TopLinksBarPreview.vue'
import InfoCardGridPreview from './components/InfoCardGridPreview.vue'
import DataTablePreview from './components/DataTablePreview.vue'
import ServiceLinksPreview from './components/ServiceLinksPreview.vue'
import ContactCardPreview from './components/ContactCardPreview.vue'
import PartnerLogoGridPreview from './components/PartnerLogoGridPreview.vue'
import EventSpotlightPreview from './components/EventSpotlightPreview.vue'
import NoticeListPreview from './components/NoticeListPreview.vue'
import SimpleFormPreview from './components/SimpleFormPreview.vue'
import StatisticsBarPreview from './components/StatisticsBarPreview.vue'
import ProgressStepsPreview from './components/ProgressStepsPreview.vue'
import TimelineHorizontalPreview from './components/TimelineHorizontalPreview.vue'
import ContentSplitPreview from './components/ContentSplitPreview.vue'
import CardGridPreview from './components/CardGridPreview.vue'
import FocusGridPreview from './components/FocusGridPreview.vue'
import TextImageSectionPreview from './components/TextImageSectionPreview.vue'
import ImageGalleryPreview from './components/ImageGalleryPreview.vue'
import TestimonialListPreview from './components/TestimonialListPreview.vue'
import AvatarCardGridPreview from './components/AvatarCardGridPreview.vue'
import NewsSectionPreview from './components/NewsSectionPreview.vue'
import FallbackPreview from './components/FallbackPreview.vue'

export const componentRegistry = {
  HeroCarousel: HeroCarouselPreview,
  SectionHero: SectionHeroPreview,
  CTABanner: CTABannerPreview,
  PageHero: PageHeroPreview,
  MainHeader: MainHeaderPreview,
  TabsNav: TabsNavPreview,
  BreadcrumbHeader: BreadcrumbHeaderPreview,
  TopLinksBar: TopLinksBarPreview,
  InfoCardGrid: InfoCardGridPreview,
  DataTable: DataTablePreview,
  ServiceLinks: ServiceLinksPreview,
  ContactCard: ContactCardPreview,
  PartnerLogoGrid: PartnerLogoGridPreview,
  EventSpotlight: EventSpotlightPreview,
  ImageGallery: ImageGalleryPreview,
  TestimonialList: TestimonialListPreview,
  AvatarCardGrid: AvatarCardGridPreview,
  NoticeList: NoticeListPreview,
  SimpleForm: SimpleFormPreview,
  StatisticsBar: StatisticsBarPreview,
  ProgressSteps: ProgressStepsPreview,
  TimelineHorizontal: TimelineHorizontalPreview,
  ContentSplit: ContentSplitPreview,
  CardGrid: CardGridPreview,
  FocusGrid: FocusGridPreview,
  TextImageSection: TextImageSectionPreview,
  NewsSection: NewsSectionPreview,
}

export const resolveBuilderComponent = (key) => componentRegistry[key] ?? FallbackPreview

