<template>
  <div v-if="profile">
    <h4>Personal Information</h4>
    <div class="rounded-profile" v-if="profile.user">
      <div class="user">
        <div>
          <img :src="profile.user.personal_image || 'default-profile-image-url'" alt="Profile Image"  class="object-cover"/>
        </div>
        <div class="txt">
          <h4>{{ profile.user.first_name }} {{ profile.user.last_name }}</h4>
          <p>{{ profile.user.email }}</p>
        </div>
      </div>
    </div>
    <div class="" v-if="profile.user">
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
          <div class="w-full md:w-1/2 bg-white p-4 border rounded-xl">
            <h3 class="text-lg font-semibold">Personal Information</h3>
            <div class="mt-2">
              <div class="flex justify-between py-2">
                <span class="font-medium">First name:</span>
                <span>{{ profile.user.first_name }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Last name:</span>
                <span>{{ profile.user.last_name }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Family:</span>
                <span>{{ profile.user.family_name }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Email Address:</span>
                <span>{{ profile.user.email }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Phone:</span>
                <span>{{ profile.user.phone }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Confirm identity:</span>
                <span>{{ profile.user.confirm_identity }}</span>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 bg-white p-4 border rounded-xl">
            <h3 class="text-lg font-semibold">Address Information</h3>
            <div class="mt-2">
              <div class="flex justify-between py-2">
                <span class="font-medium">City:</span>
                <span>{{ profile.user.city.name }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Street:</span>
                <span>{{ profile.user.street_address }}</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="font-medium">Birth date:</span>
                <span>{{ profile.user.date_of_birth }}</span>
              </div>
              <div class="flex justify-between py-2 items-center">
                <span class="font-medium">ID photo:</span>
                <img
                  :src="profile.user.doc_image || '/path/to/default-id-image.png'"
                  alt="ID Image"
                  class="w-24 h-24 object-contain rounded-lg ml-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

        <div class="user-address-information" v-if="profile.user.role=='employee'">
            <div class="notifications-section" v-if="notifications.length">
                <h4>Organization Requests</h4>
                <div class="notification" v-for="(notification, index) in notifications" :key="index">
                    <p><strong>{{ index+1 }}:</strong> {{ notification.organization.name }}</p>
                    <p class="timestamp">{{ notification.created_at }}</p>
                    <div class="action-buttons">
                        <button @click="handleAccept(notification.id, index)" class="accept-button">Accept</button>
                        <button @click="handleReject(notification.id, index)" class="reject-button">Reject</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div class="button-container" v-if="profile.user.role=='manager'">
      <router-link :to="`/` + $i18n.locale + `/organization/new`" class="add-organization-button" v-if="!orgStore || orgStore.organization === null">Add organization account</router-link>
      <router-link :to="`/` + $i18n.locale + `/organization/edit`" class="add-organization-button" v-else-if="orgStore && orgStore.organization !== null && orgStore.organization.status === 'Approved'">Edit organization</router-link>
      <router-link :to="`/` + $i18n.locale + `/organization`" class="add-organization-button" v-else-if="orgStore && orgStore.organization !== null && orgStore.organization.status === 'Pending'">Show organization</router-link>
    </div>
  </div>
</template>

<script>
import { useProfileStore, useOrganizationStore } from '../../store/auth';

export default {
  setup() {
    const orgStore = useOrganizationStore();
    const { locale } = useI18n();

    return {
      orgStore
    };
  },
    data() {
        return {
            profile:null,

            notifications: [],

        };
    },

    async mounted() {

        // Fetch countries and classifications on component load

        await this.fetchProfile();
        await this.fetchNotifications();


    },
    methods: {

        async fetchProfile() {
            const {$axios} = useNuxtApp();
            const token = localStorage.getItem('authToken'); // Get the token from localStorage

            try {
                const response = await $axios.get('profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.profile = response.data.data; // Assuming the data is inside the `data.organization`

                // Populate the form with the organization's details

            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        },
        async fetchNotifications() {
            const {$axios} = useNuxtApp();
            const token = localStorage.getItem('authToken'); // Get the token from localStorage

            try {
                const response = await $axios.get('/getNotifications', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.notifications = response.data.data.notifications; // Assuming the data is inside the `data.organization`

                // Populate the form with the organization's details

            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        },
        async handleAccept(id,index) {
         //   alert(index);
            const {$axios} = useNuxtApp();
            const token = localStorage.getItem('authToken'); // Get the token from localStorage

            try {
                const response = await $axios.post('accept_notification/'+id,[], {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.notifications.splice(index, 1);

                // Populate the form with the organization's details

            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        },
        async handleReject(id,index) {
            const {$axios} = useNuxtApp();
            const token = localStorage.getItem('authToken'); // Get the token from localStorage

            try {
                const response = await $axios.post('reject_notification/'+id,[], {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.notifications.splice(index, 1);

                // Populate the form with the organization's details

            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        },


    }
};
</script>
<style>
.rounded-profile {
  display: flex;
  padding: 0 60px;
  border-radius: 12px;
  background-image: url(https://as1.ftcdn.net/v2/jpg/03/09/26/14/1000_F_309261414_n0O4WIFBEAjsFfC1hRMu7PRuMNBEiRhM.jpg);
  height: 300px;
  min-width: 100%;
  margin-bottom: 30px;
}

.user {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 30px;
  color: white;
}

.user h4 {
  color: white;
}

.user img {
  border-radius: 100%;
  height: 96px;
  width: 96px;
}

.cards-information {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: start;
  align-items: start;
  gap: 20px;
}

.user-information,
.user-address-information {
  border: 1px dotted #d9dadf;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 35px;
  height: 100%;
}

.content-title,
.content-result {
  display: grid;
  gap: 15px;
  font-size: 16px;
}

.content-title {
  font-weight: bold;
}

.add-organization-button {
  background-color: #007bff; /* Blue color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none; /* Remove default link underline */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  margin-top: 20px; /* Add some space above the button */
}

.notifications-section {
    margin-top: 20px;
}

.notification {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.notification p {
    margin: 0;
}

.notification .timestamp {
    font-size: 12px;
    color: gray;
}

.action-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.accept-button {
    background-color: #28a745;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.reject-button {
    background-color: #dc3545;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
