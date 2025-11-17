<script setup>
import SectionHero from '@shared/components/sections/SectionHero.vue'
import ServiceLinks from '@shared/components/ServiceLinks.vue'
import StepsList from '@shared/components/sections/StepsList.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'

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

