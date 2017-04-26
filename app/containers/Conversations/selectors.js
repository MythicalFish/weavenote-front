import { createSelector } from 'reselect';

/**
 * Direct selector to the conversations state domain
 */
const selectConversationsDomain = () => (state) => state.get('conversations');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Conversations
 */

const makeSelectConversations = () => createSelector(
  selectConversationsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectConversations;
export {
  selectConversationsDomain,
};
