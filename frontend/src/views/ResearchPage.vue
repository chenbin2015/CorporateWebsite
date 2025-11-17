<script setup>
import SectionHero from '@shared/components/sections/SectionHero.vue'
import CardGrid from '@shared/components/sections/CardGrid.vue'
import FocusGrid from '@shared/components/FocusGrid.vue'

import { researchCards, researchFocus, researchHero } from '@/data/research'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="researchHero" />

    <CardGrid
      :title="$t('researchPage.platformTitle')"
      :description="$t('researchPage.platformDescription')"
      :cards="researchCards"
      :columns="3"
      :footer-link="{ label: $t('researchPage.platformMore'), href: '#' }"
    />

    <FocusGrid :title="$t('researchPage.focusTitle')" :items="researchFocus" />
  </div>
</template>

