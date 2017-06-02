/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const CHANGE_SECTION = '@@app/CHANGE_SECTION';
export const FETCH_USER = '@@app/FETCH_USER';
export const FETCH_USER_SUCCESS = '@@app/FETCH_USER_SUCCESS';
export const FETCH_STATS = '@@app/FETCH_STATS';
export const FETCH_STATS_SUCCESS = '@@app/FETCH_STATS_SUCCESS';
