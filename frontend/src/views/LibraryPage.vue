<script setup>
import SectionHero from '@/components/sections/SectionHero.vue'
import ContentSplit from '@/components/sections/ContentSplit.vue'
import CardGrid from '@/components/sections/CardGrid.vue'

import { libraryCards, libraryHero, librarySplit } from '@/data/library'
</script>

<template>
  <div class="page-stack container">
    <SectionHero v-bind="libraryHero" />

    <ContentSplit
      id="catalog"
      :title="librarySplit.title"
      :description="librarySplit.description"
      :bullets="librarySplit.bullets"
      :image="librarySplit.image"
      :actions="librarySplit.actions"
    />

    <CardGrid
      :title="$t('libraryPage.collectionTitle')"
      :description="$t('libraryPage.collectionDescription')"
      :cards="libraryCards"
      :columns="3"
      :footer-link="{ label: $t('libraryPage.collectionMore'), href: '#' }"
    />
  </div>
</template>

