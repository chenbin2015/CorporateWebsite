// 使用共享组件
import HeroCarousel from '@shared/components/HeroCarousel.vue'
import NewsSection from '@shared/components/NewsSection.vue'
import NewsListPage from '@shared/components/NewsListPage.vue'
import ServiceLinks from '@shared/components/ServiceLinks.vue'
import EventSpotlight from '@shared/components/EventSpotlight.vue'
import FocusGrid from '@shared/components/FocusGrid.vue'
import PageHero from '@shared/components/PageHero.vue'
import InfoCardGrid from '@shared/components/InfoCardGrid.vue'
import ProductList from '@shared/components/ProductList.vue'
import TextImageSection from '@shared/components/TextImageSection.vue'
import StatsHighlight from '@shared/components/StatsHighlight.vue'
import ContentDetail from '@shared/components/ContentDetail.vue'

// Sections 组件
import SectionHero from '@shared/components/sections/SectionHero.vue'
import CTABanner from '@shared/components/sections/CTABanner.vue'
import BreadcrumbHeader from '@shared/components/sections/BreadcrumbHeader.vue'
import ContentSplit from '@shared/components/sections/ContentSplit.vue'
import CarouselNewsSplit from '@shared/components/sections/CarouselNewsSplit.vue'
import TabsNav from '@shared/components/sections/TabsNav.vue'
import StatisticsBar from '@shared/components/sections/StatisticsBar.vue'
import ProgressSteps from '@shared/components/sections/ProgressSteps.vue'
import TimelineHorizontal from '@shared/components/sections/TimelineHorizontal.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'
import DataTable from '@shared/components/sections/DataTable.vue'
import ContactCard from '@shared/components/sections/ContactCard.vue'
import PartnerLogoGrid from '@shared/components/sections/PartnerLogoGrid.vue'
import NoticeList from '@shared/components/sections/NoticeList.vue'
import SimpleForm from '@shared/components/sections/SimpleForm.vue'
import ImageGallery from '@shared/components/sections/ImageGallery.vue'
import TestimonialList from '@shared/components/sections/TestimonialList.vue'
import AvatarCardGrid from '@shared/components/sections/AvatarCardGrid.vue'
import TimelineList from '@shared/components/sections/TimelineList.vue'
import StepsList from '@shared/components/sections/StepsList.vue'
import AccordionList from '@shared/components/sections/AccordionList.vue'
import FilterBar from '@shared/components/sections/FilterBar.vue'
import DemoPanel from '@shared/components/sections/DemoPanel.vue'
import DownloadList from '@shared/components/sections/DownloadList.vue'
import SocialMediaLinks from '@shared/components/sections/SocialMediaLinks.vue'
import SearchBox from '@shared/components/sections/SearchBox.vue'
import NotificationBanner from '@shared/components/sections/NotificationBanner.vue'
import TagCloud from '@shared/components/sections/TagCloud.vue'
import MediaLinks from '@shared/components/sections/MediaLinks.vue'
import VideoPlayer from '@shared/components/sections/VideoPlayer.vue'
import VideoBanner from '@shared/components/sections/VideoBanner.vue'
import EventCalendar from '@shared/components/sections/EventCalendar.vue'
import MultiLevelMenu from '@shared/components/MultiLevelMenu.vue'
import SideNav from '@shared/components/SideNav.vue'
import Footer from '@shared/components/Footer.vue'
import DetailData from '@shared/components/DetailData.vue'

// 暂时保留的预览组件（MainHeader 和 TopLinksBar 有 i18n 依赖，暂不迁移）
import MainHeaderPreview from './components/MainHeaderPreview.vue'
import TopLinksBarPreview from './components/TopLinksBarPreview.vue'
import FallbackPreview from './components/FallbackPreview.vue'

export const componentRegistry = {
  HeroCarousel: HeroCarousel,
  SectionHero: SectionHero,
  CTABanner: CTABanner,
  PageHero: PageHero,
  MainHeader: MainHeaderPreview, // 暂不迁移（i18n 依赖）
  TabsNav: TabsNav,
  BreadcrumbHeader: BreadcrumbHeader,
  TopLinksBar: TopLinksBarPreview, // 暂不迁移（i18n 依赖）
  InfoCardGrid: InfoCardGrid,
  ProductList: ProductList,
  DataTable: DataTable,
  ServiceLinks: ServiceLinks,
  ContactCard: ContactCard,
  PartnerLogoGrid: PartnerLogoGrid,
  EventSpotlight: EventSpotlight,
  ImageGallery: ImageGallery,
  TestimonialList: TestimonialList,
  AvatarCardGrid: AvatarCardGrid,
  NoticeList: NoticeList,
  SimpleForm: SimpleForm,
  StatisticsBar: StatisticsBar,
  ProgressSteps: ProgressSteps,
  TimelineHorizontal: TimelineHorizontal,
  ContentSplit: ContentSplit,
  CarouselNewsSplit: CarouselNewsSplit,
  CardGrid: CardGrid,
  FocusGrid: FocusGrid,
  TextImageSection: TextImageSection,
  NewsSection: NewsSection,
  NewsListPage: NewsListPage,
  StatsHighlight: StatsHighlight,
  TimelineList: TimelineList,
  StepsList: StepsList,
  AccordionList: AccordionList,
  FilterBar: FilterBar,
  DemoPanel: DemoPanel,
  DownloadList: DownloadList,
  SocialMediaLinks: SocialMediaLinks,
  SearchBox: SearchBox,
  NotificationBanner: NotificationBanner,
  TagCloud: TagCloud,
  MediaLinks: MediaLinks,
  VideoPlayer: VideoPlayer,
  VideoBanner: VideoBanner,
  EventCalendar: EventCalendar,
  MultiLevelMenu: MultiLevelMenu,
  SideNav: SideNav,
  Footer: Footer,
  DetailData: DetailData,
  ContentDetail: ContentDetail,
}

export const resolveBuilderComponent = (key) => componentRegistry[key] ?? FallbackPreview
