<script setup>
import SectionHero from '@shared/components/sections/SectionHero.vue'
import StatisticsBar from '@shared/components/sections/StatisticsBar.vue'
import ContentSplit from '@shared/components/sections/ContentSplit.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'

import { facultyHero, facultyHighlights, facultyStats, recruitmentContent } from '@/data/faculty'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="facultyHero" />

    <StatisticsBar :items="facultyStats" />

    <ContentSplit
      id="talent"
      :title="recruitmentContent.title"
      :description="recruitmentContent.description"
      :bullets="recruitmentContent.bullets"
      :actions="recruitmentContent.actions"
      :image="recruitmentContent.image"
    />

    <CardGrid
      :title="$t('facultyPage.highlightTitle')"
      :description="$t('facultyPage.highlightDescription')"
      :cards="facultyHighlights"
      :columns="3"
      :footer-link="{ label: $t('facultyPage.highlightMore'), href: '#' }"
    />
  </div>
</template>

