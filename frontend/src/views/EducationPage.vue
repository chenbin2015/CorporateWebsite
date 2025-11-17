<script setup>
import SectionHero from '@shared/components/sections/SectionHero.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'
import ContentSplit from '@shared/components/sections/ContentSplit.vue'
import StepsList from '@shared/components/sections/StepsList.vue'

import { educationCards, educationHero, educationSplit, educationSteps } from '@/data/education'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="educationHero" />

    <CardGrid
      :title="$t('educationPage.programTitle')"
      :description="$t('educationPage.programDescription')"
      :cards="educationCards"
      :columns="4"
      :footer-link="{ label: $t('educationPage.programMore'), href: '#' }"
    />

    <ContentSplit
      id="innovation"
      :title="educationSplit.title"
      :description="educationSplit.description"
      :bullets="educationSplit.bullets"
      :image="educationSplit.image"
      :actions="educationSplit.actions"
      :reversed="true"
    />

    <StepsList :title="$t('educationPage.stepsTitle')" :steps="educationSteps" />
  </div>
</template>

