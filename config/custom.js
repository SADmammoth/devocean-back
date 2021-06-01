/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  templates: {
    items: [
      {
        name: 'No template',
        fields: [
          {
            id: 'description',
            name: 'description',
            type: 'textarea',
            label: 'Description',
          },
        ],
      },
      {
        name: 'Bug',
        fields: [
          {
            id: 'steps',
            name: 'steps',
            type: 'textarea',
            label: 'Steps to reproduce',
          },
          {
            id: 'ar',
            name: 'ar',
            type: 'textarea',
            label: 'Actual behavior',
          },
          {
            id: 'er',
            name: 'er',
            type: 'textarea',
            label: 'Expected behavior',
          },
          {
            id: 'environment',
            name: 'environment',
            type: 'text',
            label: 'Environment',
          },
        ],
      },
      {
        name: 'Event',
        fields: [
          {
            id: 'date',
            name: 'date',
            type: 'text',
            label: 'Event date',
            validator: 'dateTimeByCharWithInvisibleMask',
            converters: 'dateTime',
          },
          {
            id: 'location',
            name: 'location',
            type: 'text',
            label: 'Location of event',
          },
        ],
      },
    ],

    typesFromTemplateToAttribute: {
      text: () => ({ type: 'string' }),
      textarea: () => ({ type: 'string' }),
      select: ({ valueOptions }) => ({
        type: 'string',
        siIn: valueOptions.map(({ value }) => value),
      }),
      search: ({ valueOptions }) => ({
        type: 'string',
        isIn: valueOptions.map(({ value }) => value),
      }),
      radio: ({ valueOptions }) => ({
        type: 'string',
        isIn: valueOptions.map(({ value }) => value),
      }),
      checkbox: ({ valueOptions }) => ({
        type: 'ref',
        custom: (value) => {
          return (
            _.isArray(value) &&
            _.difference(
              value,
              valueOptions.map(({ value }) => value),
            ).length() === 0
          );
        },
      }),
      number: () => ({
        type: 'number',
      }),
      slider: () => ({
        type: 'string',
      }),
      range: ({ valueOptions }) => ({
        type: 'ref',
        custom: (value) => {
          return (
            _.isArray(value) &&
            _.difference(
              value,
              valueOptions.map(({ value }) => value),
            ).length() === 0
          );
        },
      }),
    },
  },
  navItems: {
    items: [
      {
        label: 'Manage tasks',
        shortLabel: 'Tasks',
        featureAccess: 'manageTasks',
        link: '/tasks',
      },
      {
        label: 'Work with tasks',
        shortLabel: 'Tasks',
        featureAccess: 'workWithTasks',
        link: '/tasks',
      },
      {
        label: 'View tasks',
        shortLabel: 'Tasks',
        featureAccess: 'viewTasks',
        link: '/tasks',
      },
      {
        label: 'View notifications',
        shortLabel: 'Notifications',
        featureAccess: 'viewNotifications',
        link: '/notifications',
        onlyShort: true,
      },
      {
        label: 'Manage notifications',
        shortLabel: 'Notifications',
        featureAccess: 'manageNotifications',
        link: '/notifications',
        onlyShort: true,
      },
      {
        label: 'Manage team',
        shortLabel: 'Team',
        featureAccess: 'manageTeammates',
        link: '/teammates',
      },
      {
        label: 'View team',
        shortLabel: 'Team',
        featureAccess: 'viewTeammates',
        link: '/teammates',
      },
      {
        label: 'View docs',
        shortLabel: 'Docs',
        featureAccess: 'viewDocuments',
        link: '/docs',
      },
      {
        label: 'Manage docs',
        shortLabel: 'Docs',
        featureAccess: 'manageDocuments',
        link: '/docs',
      },
    ],
  },
  subscriptionServer: 'http://localhost:1338',
  authenticationServer: 'http://localhost:1339',
  rootFolderName: 'All tasks',
  rootListName: 'Without list',
  baseUrl: 'http://localhost:1337',
};
