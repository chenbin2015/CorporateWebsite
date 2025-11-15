<script setup>
import SectionHero from '@/components/sections/SectionHero.vue'
import CardGrid from '@/components/sections/CardGrid.vue'
import ServiceLinks from '@/components/ServiceLinks.vue'
import ContentSplit from '@/components/sections/ContentSplit.vue'

import { collegeClusters, collegeServices, collegesHero } from '@/data/colleges'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="collegesHero" />

    <CardGrid
      :title="$t('collegesPage.clusterTitle')"
      :description="$t('collegesPage.clusterDescription')"
      :cards="collegeClusters"
      :columns="3"
      :footer-link="{ label: $t('collegesPage.clusterMore'), href: '#' }"
    />

    <ContentSplit
      id="resources"
      :title="$t('collegesPage.platformTitle')"
      :description="$t('collegesPage.platformDescription')"
      :bullets="$tm('collegesPage.platformBullets')"
      :image="collegesHero.background"
      :actions="[{ label: $t('collegesPage.platformAction'), href: '#' }]"
      :reversed="true"
    />

    <ServiceLinks :title="$t('collegesPage.servicesTitle')" :items="collegeServices" />
  </div>
</template>
