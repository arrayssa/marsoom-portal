<script setup>
import AppMenu from './AppMenu';

</script>

<template>
    <NuxtLink to="/" class="layout-topbar-logo mb-6 block">
        <img src="@/assets/images/logo-white.png" alt="logo" class="mx-auto max-h-16"/>
    </NuxtLink>
    <app-menu></app-menu>
</template>

<style lang="scss" scoped></style>
