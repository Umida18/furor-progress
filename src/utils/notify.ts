import { Notify } from 'quasar';

export const notifySuccess = (message: string) => Notify.create({ type: 'positive', message });

export const notifyError = (message: string) => Notify.create({ type: 'negative', message });
