<script setup>
import SectionHero from '@/components/sections/SectionHero.vue'
import StatisticsBar from '@/components/sections/StatisticsBar.vue'
import ContentSplit from '@/components/sections/ContentSplit.vue'
import CardGrid from '@/components/sections/CardGrid.vue'
import TimelineList from '@/components/sections/TimelineList.vue'
import FocusGrid from '@/components/FocusGrid.vue'

import { aboutHero, aboutHistory, aboutHighlights, aboutPillars, aboutStats } from '@/data/about'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="aboutHero" />

    <StatisticsBar :items="aboutStats" variant="dark" />

    <ContentSplit
      id="profile"
      :title="$t('aboutPage.missionTitle')"
      :description="$t('aboutPage.missionDescription')"
      :bullets="$tm('aboutPage.missionBullets')"
      :image="aboutHero.background"
      :actions="[{ label: $t('aboutPage.missionAction'), href: '#' }]"
    />

    <CardGrid
      :title="$t('aboutPage.pillarTitle')"
      :description="$t('aboutPage.pillarDescription')"
      :cards="aboutPillars"
      :columns="3"
      :footer-link="{ label: $t('aboutPage.pillarMore'), href: '#' }"
    />

    <TimelineList :title="$t('aboutPage.historyTitle')" :items="aboutHistory" />

    <FocusGrid :title="$t('aboutPage.focusTitle')" :items="aboutHighlights" />
  </div>
</template>
