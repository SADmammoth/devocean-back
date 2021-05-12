/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': 'auth',
  'tasks/get': 'features/viewTasks',
  'tasks/get-by-id': 'features/viewTasks',
  'tasks/post': 'features/manageTasks',
  'tasks/assign': 'features/manageTasks',
  'tasks/delete': 'features/manageTasks',
  'tasks/patch': 'features/manageTasks',
  'tasks/post': 'features/manageTasks',
  'tasks/set-status': 'features/workWithTasks',
  'tasks/add-to-list': 'features/manageCollections',

  'templates/*': 'features/viewTasks',
  'statuses/*': 'features/viewTasks',

  'notifications/get': 'features/viewNotifications',
  'notifications/get-by-id': 'features/viewNotifications',
  'notifications/receive': 'features/viewNotifications',
  'notifications/patch': 'features/manageNotifications',
  'notifications/cancel': 'features/manageNotifications',
  'notifications/post': 'features/manageNotifications',

  'folders/get-by-id': 'features/viewTasks',
  'folders/get': 'features/viewTasks',
  'folders/patch': 'features/manageCollections',
  'folders/post': 'features/manageCollections',

  'comments/discussions/get': 'features/viewTasks',
  'comments/discussions/post': 'features/workWithTasks',
  'comments/history/*': 'features/viewTasks',
  'comments/reports/get': 'features/viewTasks',
  'comments/reports/post': 'features/workWithTasks',
  'comments/status-changes/*': 'features/viewTasks',

  'dev/*': true,

  // 'documents/*': 'auth',
};
