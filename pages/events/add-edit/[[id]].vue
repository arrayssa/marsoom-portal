<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ eventId ? $t('editForm', { name: $t('event') }) : $t('addNewForm.feminine', { name: $t('event') }) }}</h2>
  </div>
  <ProgressSpinner v-if="pending && eventId" class="flex justify-content-center mt-5" />
  <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.title" :name="'title'" :label="$t('title')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.abbreviation" :name="'abbreviation'" :label="$t('abbreviation')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.name_tag" :name="'name_tag'" :label="$t('nameTag')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.email" :name="'email'" :label="$t('email')" :errors="errors" :rules="'required|email'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.zip" :name="'zip'" :label="$t('zip')" :errors="errors" :rules="'required|numeric'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.phone1" :name="'phone1'" :label="$t('phonenumer.1')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.phone2" :name="'phone2'" :label="$t('phonenumer.2')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.whatsapp" :name="'whatsapp'" :label="$t('whatsapp')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.website" :name="'website'" :label="$t('website')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="eventForm.city_id" :name="'city_id'" :options="cities?.data?.rows" :label="$t('country')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.president" :name="'president'" :label="$t('president')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date1">{{ $t('startingDate') }}</label>
          <Calendar inputId="date1" v-model="eventForm.start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date2">{{ $t('registrationStartDate') }}</label>
          <Calendar inputId="date2" v-model="eventForm.registration_start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date3">{{ $t('registrationEndDate') }}</label>
          <Calendar inputId="date3" v-model="eventForm.registration_end_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date4">{{ $t('eventEndDate') }}</label>
          <Calendar inputId="date4" v-model="eventForm.event_end_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date5">{{ $t('publicStartDate') }}</label>
          <Calendar inputId="date5" v-model="eventForm.public_event_start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date6">{{ $t('shippingStartDate') }}</label>
          <Calendar inputId="date6" v-model="eventForm.shipping_start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.street_adress" :name="'street_adress'" :label="$t('streetAddress')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="eventForm.event_specialty_id" :name="'event_specialty_id'" :options="eventSpeciality?.data?.rows" :label="$t('eventSpecialty')" :optionLabel="'description'" :optionValue="'id'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="eventForm.event_series_id" :name="'event_series_id'" :options="eventSeries?.data?.rows" :label="$t('eventSeries')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 mb-4">
        <div class="flex flex-column gap-2">
          <label for="address">{{ $t('address') }}</label>
          <GMapAutocomplete :placeholder="'search for a place or address'" @place_changed="setPlace" class="p-inputtext"> </GMapAutocomplete>
          <GMapMap :center="centerPlace" :zoom="10" map-type-id="terrain" style="width: 100%; height: 300px">
            <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center = m.position" />
          </GMapMap>
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="eventForm.discount" :name="'discount'" :label="$t('discount')" :errors="errors" :rules="'required'" />
        </div>
      </div>
    </div>
    <div class="flex justify-content-end mb-4 mt-4 gap-3">
      <Button severity="secondary" @click="navigateTo(localePath(`/events`))" size="large">{{ $t('cancel') }}</Button>
      <Button type="submit" :loading="submiting" :label="$t('save')" size="large" />
    </div>
  </Form>
</template>

<script setup>
const { t } = useI18n();
const route = useRouter().currentRoute.value;
const eventId = route.params.id;

let submiting = ref(false);
const toast = useToast();
const localePath = useLocalePath();

let eventForm = ref({
  title: '',
  abbreviation: '',
  name_tag: '',
  email: '',
  zip: '',
  phone1: '',
  phone2: '',
  whatsapp: '',
  website: '',
  city_id: '',
  president: '',
  start_date: null,
  registration_start_date: null,
  registration_end_date: null,
  event_end_date: null,
  public_event_start_date: null,
  shipping_start_date: null,
  event_specialty_id: '',
  event_series_id: '',
  discount: '',
  map_location: ''
});

const { data: cities } = useGetApi('cities');
const { data: eventSpeciality } = useGetApi('event-speciality');
const { data: eventSeries } = useGetApi('event-series');

const { pending, execute } = useGetApi(
  `events/${eventId}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      eventForm.value = res.data;
      // add map data
      centerPlace.value = { lat: Number(eventForm.value.map_lat), lng: Number(eventForm.value.map_lng) };
      markers.value = [{ position: { lat: Number(eventForm.value.map_lat), lng: Number(eventForm.value.map_lng) } }];
      setPlace({ geometry: { location: { lat: Number(eventForm.value.map_lat), lng: Number(eventForm.value.map_lng) } }, formatted_address: eventForm.value.map_location });
    }
  }
);

onMounted(() => {
  if (eventId) {
    execute();
  }
});

let markers = ref([]);
let centerPlace = ref({ lat: 0, lng: 0 });

navigator.geolocation.getCurrentPosition((position) => {
  centerPlace.value = { lat: position.coords.latitude, lng: position.coords.longitude };
});

function setPlace({ geometry, formatted_address }) {
  centerPlace.value = { lat: geometry.location.lat(), lng: geometry.location.lng() };
  markers.value = [{ position: { lat: geometry.location.lat(), lng: geometry.location.lng() } }];
  eventForm.value.map_lat = geometry.location.lat();
  eventForm.value.map_lng = geometry.location.lng();
  eventForm.value.map_location = formatted_address;
}

const onSubmit = async (value) => {
  submiting.value = true;
  value.map_location = eventForm.value.map_location; // the map address
  value.map_lat = eventForm.value.map_lat; // the map lat
  value.map_lng = eventForm.value.map_lng; // the map lng

  console.log(value);
  console.log(eventForm.value)
  try {
    if (eventId) {
      await usePutApi(`events/${eventId}`, value);
      navigateTo(localePath(`/events`));
    } else {
      await usePostApi('events', value);
      navigateTo(localePath(`/events`));
    }
    toast.add({ severity: 'success', summary: t('Successful'), detail: eventId ? t('UpdatedSuccessfully') : t('CreatedSuccessfully'), life: 3000 });
  } catch (error) {
    console.log(error);
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
