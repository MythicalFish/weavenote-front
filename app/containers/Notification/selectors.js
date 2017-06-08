import { createSelector } from 'reselect';

// Notifications

export const selectNotifications = () => (state) => state.get('notifications');

