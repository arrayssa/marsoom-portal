<template>
  <div class="">
    <div class="layout-main-container">
      <div class="layout-main">
        <NuxtPage />
      </div>
    </div>
  </div>
  <Toast />
</template>

<script setup>
import { useLayout } from './composables/layout';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const containerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfig.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-ripple-disabled': layoutConfig.ripple.value === false
  };
});
</script>
