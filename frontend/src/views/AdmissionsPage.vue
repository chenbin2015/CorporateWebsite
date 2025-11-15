<script setup>
import SectionHero from '@/components/sections/SectionHero.vue'
import ServiceLinks from '@/components/ServiceLinks.vue'
import StepsList from '@/components/sections/StepsList.vue'
import CardGrid from '@/components/sections/CardGrid.vue'

import { admissionsHero, admissionsHighlights, admissionsServices, admissionsSteps } from '@/data/admissions'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="admissionsHero" />

    <ServiceLinks :title="$t('admissionsPage.serviceTitle')" :items="admissionsServices" />

    <StepsList :title="$t('admissionsPage.timelineTitle')" :steps="admissionsSteps" />

    <CardGrid
      :title="$t('admissionsPage.highlightTitle')"
      :description="$t('admissionsPage.highlightDescription')"
      :cards="admissionsHighlights"
      :columns="3"
      :footer-link="{ label: $t('admissionsPage.highlightMore'), href: '#' }"
    />
  </div>
</template>

