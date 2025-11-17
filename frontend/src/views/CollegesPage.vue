<script setup>
import SectionHero from '@shared/components/sections/SectionHero.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'
import ServiceLinks from '@shared/components/ServiceLinks.vue'
import ContentSplit from '@shared/components/sections/ContentSplit.vue'

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
