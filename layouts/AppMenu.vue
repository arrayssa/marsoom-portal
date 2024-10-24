<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in filteredModel" :key="i">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { useI18n } from 'vue-i18n'; // Ensure you're importing this correctly
import { computed } from 'vue';
import { useProfileStore, useOrganizationStore } from '../store/auth';

const { t } = useI18n();
const storedLang = useCookie('language', null);
const profileStore = useProfileStore();
const organizationStore = useOrganizationStore();

storedLang.value = storedLang.value || 'en';

// Check if profile is loaded
const isProfileLoaded = computed(() => profileStore.user !== null && organizationStore.organization !== null);

const model = computed(() => [
  {
    requireApprove: true,
    items: [
      { label: t('Org Information'), to: `/${storedLang.value}/organization`, requireOrg: true },
      { label: t('Books'), to: `/${storedLang.value}/books`, requireOrg: true, requireApprovedOrg: true },
      { label: t('Complete Data'), to: `/${storedLang.value}/completeData`, requireOrg: true, requireApprovedOrg: true, requireApprovedBooks: true, visible: (organizationStore.organization && !organizationStore.orgMeta.data_completed && organizationStore.organization.pending_books < 1 && organizationStore.organization.approved_books > 0) },
      { label: t('My Shipment'), to: `/${storedLang.value}/shipment`, requireOrg: true, requireApprovedOrg: true, requireApprovedBooks: true, visible: (organizationStore.organization && organizationStore.orgMeta.data_completed) },
    ]
  },
  {
    requireApprove: false,
    items: [
      { label: t('Profile'), to: `/${storedLang.value}/auth/profile`, requireOrg: false },
    ]
  }
]);

// Filter model based on user role and existing organization
const filteredModel = computed(() => {
  return model.value.map(group => {
    const filteredItems = group.items.filter(item => {
      // Check for requireOrg condition
      if (item.requireOrg && organizationStore.organization === null) {
        return false; // Hide the item if it requires an organization and none exists
      }

      // Check for requireApprovedOrg condition
      if (item.requireApprovedOrg && organizationStore.organization.status !== 'Approved') {
        return false; // Hide the item if it requires an approved organization and the status is not approved
      }

      // Check for requireApprovedBooks condition
      if (item.requireApprovedBooks && organizationStore.organization.pending_books > 0) {
        return false; // Hide the item if it requires an approved organization and the status is not approved
      }

      // Check for requireApprove condition
      if (group.requireApprove && profileStore.user && profileStore.user.role !== 'manager') {
        return false; // Hide if requireApprove is true and user is not a manager
      }

      return true; // Show the item if all conditions are met
    });

    // Return the group with filtered items
    return { ...group, items: filteredItems };
  }).filter(group => group.items.length > 0); // Remove groups with no items
});

</script>

<style lang="scss" scoped></style>
