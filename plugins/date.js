import { format, formatDistanceToNow } from 'date-fns';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('formatDate', (date, withSec = false) => {
    if (!date) return null;

    if (withSec) {
      return format(new Date(date), 'yyyy-MM-dd h:mm');
    }

    return format(new Date(date), 'dd MMMM yyyy');
  });

  nuxtApp.provide('fromNow', (date) => {
    if (!date) return '-';
    return formatDistanceToNow(new Date(date), {
      addSuffix: true
    });
  });
});
