module.exports.policies = {
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

  'documents/get-by-id': 'features/viewDocuments',
  'documents/get': 'features/viewDocuments',
  'documents/patch': 'features/manageDocuments',
  'documents/post': 'features/manageDocuments',

  'teammates/get-profile-by-id': 'features/viewTeammates',
  'teammates/get-profiles': 'features/viewTeammates',
  'teammates/get': 'auth',
  'teammates/patch': 'features/manageTeammates',
  'teammates/post': 'features/manageTeammates',
  'teammates/avatar': true,
};
