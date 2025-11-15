<script setup>
import HeroCarousel from '@/components/HeroCarousel.vue'
import NewsSection from '@/components/NewsSection.vue'
import ServiceLinks from '@/components/ServiceLinks.vue'
import EventSpotlight from '@/components/EventSpotlight.vue'
import FocusGrid from '@/components/FocusGrid.vue'

import { events, focusTopics, heroItems, newsColumns, serviceLinks } from '@/data/home'
</script>

<template>
  <div class="home-page container">
    <HeroCarousel :items="heroItems" />

    <div class="home-page__row home-page__row--split">
      <NewsSection
        v-for="column in newsColumns"
        :key="column.title"
        :title="column.title"
        :highlight="column.highlight"
        :items="column.items"
      />
    </div>

    <div class="home-page__row home-page__row--split">
      <ServiceLinks :title="$t('home.servicesTitle')" :items="serviceLinks" />
      <EventSpotlight :title="$t('home.eventsTitle')" :events="events" />
    </div>

    <div class="home-page__row">
      <FocusGrid :title="$t('home.focusTitle')" :items="focusTopics" />
    </div>
  </div>
</template>

