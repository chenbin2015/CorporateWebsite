<script setup>
import { ref } from 'vue'

import HeroCarousel from '@/components/HeroCarousel.vue'
import NewsSection from '@/components/NewsSection.vue'
import ServiceLinks from '@/components/ServiceLinks.vue'
import EventSpotlight from '@/components/EventSpotlight.vue'
import FocusGrid from '@/components/FocusGrid.vue'
import SectionHero from '@/components/sections/SectionHero.vue'
import StatisticsBar from '@/components/sections/StatisticsBar.vue'
import ContentSplit from '@/components/sections/ContentSplit.vue'
import CardGrid from '@/components/sections/CardGrid.vue'
import StepsList from '@/components/sections/StepsList.vue'
import TimelineList from '@/components/sections/TimelineList.vue'
import DemoPanel from '@/components/sections/DemoPanel.vue'
import TabsNav from '@/components/sections/TabsNav.vue'
import BreadcrumbHeader from '@/components/sections/BreadcrumbHeader.vue'
import FilterBar from '@/components/sections/FilterBar.vue'
import NoticeList from '@/components/sections/NoticeList.vue'
import DataTable from '@/components/sections/DataTable.vue'
import AvatarCardGrid from '@/components/sections/AvatarCardGrid.vue'
import AccordionList from '@/components/sections/AccordionList.vue'
import TimelineHorizontal from '@/components/sections/TimelineHorizontal.vue'
import ProgressSteps from '@/components/sections/ProgressSteps.vue'
import CTABanner from '@/components/sections/CTABanner.vue'
import TestimonialList from '@/components/sections/TestimonialList.vue'
import ImageGallery from '@/components/sections/ImageGallery.vue'
import ContactCard from '@/components/sections/ContactCard.vue'
import SimpleForm from '@/components/sections/SimpleForm.vue'
import PartnerLogoGrid from '@/components/sections/PartnerLogoGrid.vue'
import DownloadList from '@/components/sections/DownloadList.vue'

import {
  defaultEvents,
  defaultFocusCards,
  defaultHeroItems,
  defaultNewsHighlight,
  defaultNewsItems,
  defaultServiceLinks,
  defaultStats,
} from '@/data/defaults'

import { heroItems, newsColumns, serviceLinks, events, focusTopics } from '@/data/home'
import { aboutHero, aboutHistory, aboutPillars, aboutStats } from '@/data/about'
import { educationSplit, educationSteps } from '@/data/education'
import {
  tabNavItems,
  breadcrumbItems,
  filterOptions,
  noticeItems,
  tableColumns,
  tableRows,
  facultyCards,
  faqItems,
  timelineHorizontal,
  progressSteps,
  ctaBanner,
  testimonials,
  galleryImages,
  partnerLogos,
  downloads,
  contactInfo,
} from '@/data/showcase'

const activeTab = ref(tabNavItems[0]?.value ?? '')
const activeFilter = ref(filterOptions[0]?.value ?? '')

const handleSearch = () => {}
</script>

<template>
  <div class="page-stack container">
    <header class="showcase-header">
      <h1>{{ $t('showcasePage.title') }}</h1>
      <p>{{ $t('showcasePage.description') }}</p>
    </header>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.navTitle') }}</h2>
        <p>{{ $t('showcasePage.navDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel :title="$t('showcasePage.tabsTitle')" :description="$t('showcasePage.tabsDescription')">
          <TabsNav v-model="activeTab" :items="tabNavItems" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.breadcrumbTitle')" :description="$t('showcasePage.breadcrumbDescription')">
          <BreadcrumbHeader
            :items="breadcrumbItems"
            title="东南大学本科教学"
            :description="$t('showcasePage.breadcrumbDescription')"
          />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.filterTitle')" :description="$t('showcasePage.filterDescription')">
          <FilterBar v-model="activeFilter" :options="filterOptions" @search="handleSearch" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.heroTitle') }}</h2>
        <p>{{ $t('showcasePage.heroDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.heroCarouselTitle')"
          :description="$t('showcasePage.heroCarouselDescription')"
        >
          <HeroCarousel :items="heroItems" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.sectionHeroTitle')"
          :description="$t('showcasePage.sectionHeroDescription')"
        >
          <SectionHero v-bind="aboutHero" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.dataTitle') }}</h2>
        <p>{{ $t('showcasePage.dataDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.statsDarkTitle')"
          :description="$t('showcasePage.statsDarkDescription')"
        >
          <StatisticsBar :items="aboutStats" variant="dark" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.statsLightTitle')"
          :description="$t('showcasePage.statsLightDescription')"
        >
          <StatisticsBar :items="defaultStats" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.timelineDemoTitle')"
          :description="$t('showcasePage.timelineDemoDescription')"
        >
          <TimelineList :items="aboutHistory" :title="$t('showcasePage.timelineTitle')" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.newsTitle') }}</h2>
        <p>{{ $t('showcasePage.newsDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.newsPrimaryTitle')"
          :description="$t('showcasePage.newsPrimaryDescription')"
        >
          <NewsSection :title="newsColumns[0].title" :highlight="newsColumns[0].highlight" :items="newsColumns[0].items" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.newsDefaultTitle')"
          :description="$t('showcasePage.newsDefaultDescription')"
        >
          <NewsSection :highlight="defaultNewsHighlight" :items="defaultNewsItems" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.listsTitle') }}</h2>
        <p>{{ $t('showcasePage.listsDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel :title="$t('showcasePage.noticeTitle')" :description="$t('showcasePage.noticeDescription')">
          <NoticeList :items="noticeItems" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.tableTitle')" :description="$t('showcasePage.tableDescription')">
          <DataTable :columns="tableColumns" :rows="tableRows" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.cardTitle')" :description="$t('showcasePage.cardDescription')">
          <AvatarCardGrid :items="facultyCards" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.servicesTitle') }}</h2>
        <p>{{ $t('showcasePage.servicesDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.servicesPrimaryTitle')"
          :description="$t('showcasePage.servicesPrimaryDescription')"
        >
        
          <ServiceLinks :title="$t('home.servicesTitle')" :items="serviceLinks" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.eventsPrimaryTitle')"
          :description="$t('showcasePage.eventsPrimaryDescription')"
        >
          <EventSpotlight :title="$t('home.eventsTitle')" :events="events" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.faqTitle') }}</h2>
        <p>{{ $t('showcasePage.faqDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel :title="$t('showcasePage.accordionTitle')" :description="$t('showcasePage.accordionDescription')">
          <AccordionList :items="faqItems" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.timelineHorizontalTitle')"
          :description="$t('showcasePage.timelineHorizontalDescription')"
        >
          <TimelineHorizontal :items="timelineHorizontal" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.progressStepsTitle')" :description="$t('showcasePage.progressStepsDescription')">
          <ProgressSteps :steps="progressSteps" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.cardsTitle') }}</h2>
        <p>{{ $t('showcasePage.cardsDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.cardGridTitle')"
          :description="$t('showcasePage.cardGridDescription')"
        >
          <CardGrid :cards="aboutPillars" :title="$t('aboutPage.pillarTitle')" :description="$t('aboutPage.pillarDescription')" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.focusGridTitle')"
          :description="$t('showcasePage.focusGridDescription')"
        >
          <FocusGrid :items="focusTopics" :title="$t('home.focusTitle')" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.contentTitle') }}</h2>
        <p>{{ $t('showcasePage.contentDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.contentSplitTitle')"
          :description="$t('showcasePage.contentSplitDescription')"
        >
          <ContentSplit
            :title="educationSplit.title"
            :description="educationSplit.description"
            :bullets="educationSplit.bullets"
            :image="educationSplit.image"
            :actions="educationSplit.actions"
            :reversed="true"
          />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.stepsTitle')"
          :description="$t('showcasePage.stepsDescription')"
        >
          <StepsList :steps="educationSteps" :title="$t('educationPage.stepsTitle')" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.defaultsTitle') }}</h2>
        <p>{{ $t('showcasePage.defaultsDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel
          :title="$t('showcasePage.heroDefaultTitle')"
          :description="$t('showcasePage.heroDefaultDescription')"
          :note="$t('showcasePage.defaultDataNote')"
        >
          <HeroCarousel :items="defaultHeroItems" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.servicesDefaultTitle')"
          :description="$t('showcasePage.servicesDefaultDescription')"
          :note="$t('showcasePage.defaultDataNote')"
        >
          <ServiceLinks :items="defaultServiceLinks" :title="$t('showcasePage.defaultsServicesTitle')" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.eventsDefaultTitle')"
          :description="$t('showcasePage.eventsDefaultDescription')"
          :note="$t('showcasePage.defaultDataNote')"
        >
          <EventSpotlight :events="defaultEvents" :title="$t('showcasePage.defaultsEventsTitle')" />
        </DemoPanel>
        <DemoPanel
          :title="$t('showcasePage.focusDefaultTitle')"
          :description="$t('showcasePage.focusDefaultDescription')"
          :note="$t('showcasePage.defaultDataNote')"
        >
          <FocusGrid :items="defaultFocusCards" :title="$t('showcasePage.defaultsFocusTitle')" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.engageTitle') }}</h2>
        <p>{{ $t('showcasePage.engageDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel :title="$t('showcasePage.ctaTitle')" :description="$t('showcasePage.ctaDescription')">
          <CTABanner :data="ctaBanner" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.testimonialTitle')" :description="$t('showcasePage.testimonialDescription')">
          <TestimonialList :items="testimonials" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.galleryTitle')" :description="$t('showcasePage.galleryDescription')">
          <ImageGallery :images="galleryImages" />
        </DemoPanel>
      </div>
    </section>

    <section class="showcase-section">
      <header>
        <h2>{{ $t('showcasePage.contactSectionTitle') }}</h2>
        <p>{{ $t('showcasePage.contactSectionDescription') }}</p>
      </header>
      <div class="showcase-stack">
        <DemoPanel :title="$t('showcasePage.contactTitle')" :description="$t('showcasePage.contactSectionDescription')">
          <ContactCard :info="contactInfo" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.simpleFormTitle')" :description="$t('showcasePage.simpleFormDescription')">
          <SimpleForm />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.partnerTitle')" :description="$t('showcasePage.partnerDescription')">
          <PartnerLogoGrid :logos="partnerLogos" />
        </DemoPanel>
        <DemoPanel :title="$t('showcasePage.downloadTitle')" :description="$t('showcasePage.downloadDescription')">
          <DownloadList :items="downloads" />
        </DemoPanel>
      </div>
    </section>
  </div>
</template>

<style scoped>
.showcase-header {
  display: grid;
  gap: 1rem;
  text-align: center;
  padding: 2rem 0 1rem;
}

.showcase-header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.showcase-header p {
  margin: 0 auto;
  max-width: 48rem;
  color: var(--color-text-secondary);
}

.showcase-section {
  display: grid;
  gap: 1.6rem;
}

.showcase-section header {
  display: grid;
  gap: 0.6rem;
}

.showcase-section header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.showcase-section header p {
  margin: 0;
  color: var(--color-text-secondary);
}

.showcase-stack {
  display: grid;
  gap: 1.6rem;
}
</style>

