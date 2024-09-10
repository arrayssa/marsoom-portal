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

const model = computed(() => {
  return [
    {
      items: [
        // { label: 'Dashboard', to: '/' },
        { label: t('countries'), to: '/countries' },
        { label: t('cities'), to: '/cities' },
        { label: t('persons'), to: '/persons' },
        { label: t('interest'), to: '/interest' },
        { label: t('eventType'), to: '/eventType' },
        { label: t('eventSpecialty'), to: '/eventSpecialty' },
        { label: t('eventSeries'), to: '/eventSeries' },
        { label: t('listedType'), to: '/listedType' },
        { label: t('events'), to: '/events' },
        { label: t('itemInEvents'), to: '/itemInEvents' },
        { label: t('organizationListedInEvent'), to: '/organizationListedInEvent' },
        { label: t('personListedinEvent'), to: '/personListedinEvent' },
        { label: t('personInListedOrg'), to: '/personInListedOrg' },
        { label: t('accompanyingEventType'), to: '/accompanyingEventType'},
        { label: t('accompanyingEvents'), to: 'accompanyingEvents'},
        { label: t('accompanyingListedType'), to: 'accompanyingListedType'},
        { label: t('workshopTopic'), to: 'workshopTopic'},
        { label: t('personsListedInAccompanyingEvent'), to: 'personsListedInAccompanyingEvent'},
        { label: t('calendar'), to: 'calendar'},
        { label: t('eventBoothType'), to: 'eventBoothType'},
        { label: t('spaceClassification'), to: 'spaceClassification'},
        { label: t('eventSpace'), to: 'eventSpace'},
        { label: t('eventBooth'), to: 'eventBooth'},
        { label: t('storage'), to: 'storage'},
        { label: t('Pending Books'), to: 'books'},

        { label: t('Approved Books'), to: 'approvedBooks'},
        { label: t('Rejected Books'), to: 'rejectedBooks'},

        { label: t('storage'), to: 'storage'},

        { label: t('storage'), to: 'storage'},
        { label: t('request'), to: 'request'},
        { label: t('package'), to: 'package'},
        { label: t('itemInPackage'), to: 'itemInPackage'},
        { label: t('shipper'), to: 'shipper'},
        { label: t('manifest'), to: 'manifest'},
        { label: t('drivers'), to: 'drivers'},
        { label: t('trucks'), to: 'trucks'},
        { label: t('invoices'), to: 'invoices'},
        { label: t('messagesClassfication'), to: 'messagesClassfication'},
        { label: t('messages'), to: 'messages'},
        { label: t('replies'), to: 'replies'},
      ]
    }
  ];
});
</script>

<style lang="scss" scoped></style>
