<template>
  <div class="layout-topbar px-4" v-if="isAuthenticated">
    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <span></span>
    <!-- <IconField iconPosition="right" class="m-auto">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText :placeholder="$t('search')" class="h-3rem border-round-xl border-1 bg-white" />
    </IconField> -->

    <div class="layout-topbar-menu gap-5" :class="topbarMenuClasses">
      <div class="flex align-items-center gap-2">
        <button class="p-link layout-topbar-button border-round-lg border-1 border-200">
          <img src="/layout/images/setting.png" alt="setting" />
        </button>

        <button class="p-link layout-topbar-button border-round-lg border-1 border-200">
          <img src="/layout/images/notification-bing.png" alt="notification" />
        </button>

        <!-- <Dropdown v-model="selectedCountry" @change="onChangeLanguage" :options="countries" optionLabel="name" class="w-5rem outline-none inline-flex border-0 p-0 shadow-none bg-white border-none align-items-center" style="max-width: 66px">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <img :alt="slotProps.value.label" :src="slotProps.value.img" style="width: 19px; height: 16.4px" />
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <img :alt="slotProps.option.label" :src="slotProps.option.img" style="width: 19px; height: 16.4px" />
            </div>
          </template>
        </Dropdown> -->
      </div>

      <div class="flex justify-content-center">
        <Button type="button" @click="toggle" class="bg-white shadow-none w-auto border-0 p-link gap-2" aria-haspopup="true" aria-controls="overlay_menu">
          <img src="/layout/images/user.png" alt="user" />
          <div class="flex flex-start flex-column align-items-start">
            <div class="flex">
              <span class="text-black-alpha-90 text-sm" :class="$i18n.locale === 'ar' ? 'ml-4' : 'mr-4'">Aman</span>
              <img src="/layout/images/arrow-down.png" alt="vector" />
            </div>
          </div>
        </Button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from './composables/layout';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import USA from '/layout/images/flag/USA.png';
import KSA from '/layout/images/flag/KSA.png';

const { locale, setLocale } = useI18n();
const { logUserOut } = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => !!localStorage.getItem('authToken'));


const logout = () => {
  logUserOut();
  // navigateTo('/en/auth/login');
  router.push('login')
};

const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
  bindOutsideClickListener();
});
onBeforeUnmount(() => {
  unbindOutsideClickListener();
});
const logoUrl = computed(() => {
  return `/layout/images/logo.png`;
});

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };

    document.addEventListener('click', outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;
  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

// Start Change Language
const storedLang = useCookie('language', null);
storedLang.value = storedLang.value || 'en';

const countries = ref([
  { name: 'USA', code: 'US', lang: 'en', img: USA },
  { name: 'KSA', code: 'SA', lang: 'ar', img: KSA }
]);

const selectedCountry = ref(countries.value.find((c) => c.lang === storedLang.value) || countries.value[0]);
setLocale(storedLang.value);

function onChangeLanguage() {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', selectedCountry.value.lang);
  }
  setLocale(selectedCountry.value.lang);

  if (selectedCountry.value.lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  if (storedLang.value !== selectedCountry.value.lang) {
    storedLang.value = selectedCountry.value.lang;
  }
}

onChangeLanguage();
// End Change Language

const menu = ref();
const items = ref([{ label: 'Profile', command: () => goToProfile() }, { label: 'Logout', command: () => logout() }]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const goToProfile = () => {
  router.push(`/${storedLang.value}/auth/profile`)
};
</script>

<style lang="scss" scoped></style>
