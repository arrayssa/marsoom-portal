<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import AppMenuItem from './AppMenuItem.vue';
const { t } = useI18n();

const storedLang = useCookie('language', null);
storedLang.value = storedLang.value || 'en';

const model = computed(() => {
  return [
    {
      items: [
        // { label: 'Dashboard', to: '/' },
        { label: t('Org Information'), to: `/${storedLang.value}/organization/settings` },
        { label: t('cities'), to: '/cities' },
        { label: t('persons'), to: '/persons' },
        { label: t('interest'), to: '/interest' },
        { label: t('events'), to: '/events' },
        { label: t('Pending Books'), to: 'books'},
        { label: t('Approved Books'), to: 'approvedBooks'},
        { label: t('Rejected Books'), to: 'rejectedBooks'},
        { label: t('request'), to: 'request'},
      ]
    }
  ];
});
</script>

<style lang="scss" scoped></style>
