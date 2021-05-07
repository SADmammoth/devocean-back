/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  'get /swagger.json': (_, res) => {
    const swaggerJson = require('../swagger/swagger.json');
    if (!swaggerJson) {
      res.status(404).set('content-type', 'application/json').send({
        message: 'Cannot find swagger.json, has the server generated it?',
      });
    }
    return res
      .status(200)
      .set('content-type', 'application/json')
      .send(swaggerJson);
  },

  'get /folders': {
    action: 'folders/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/taskcollection' },
              },
            },
          },
        },
      },
    },
  },

  'get /folders/:id': {
    action: 'folders/get-by-id',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/taskcollection' },
            },
          },
        },
      },
    },
  },

  'post /folders': {
    action: 'folders/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/taskcollection' },
            },
          },
        },
      },
    },
  },

  'patch /folders/:id': {
    action: 'folders/patch',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/taskcollection' },
            },
          },
        },
      },
    },
  },

  'get /tasks': {
    action: 'tasks/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/task' },
              },
            },
          },
        },
      },
    },
  },

  'get /tasks/:id': {
    action: 'tasks/get-by-id',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'post /tasks': {
    action: 'tasks/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'patch /tasks/:id': {
    action: 'tasks/patch',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'patch /tasks/:id/assignee': {
    action: 'tasks/assign',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'patch /tasks/:id/status': {
    action: 'tasks/set-status',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'patch /tasks/:id/list': {
    action: 'tasks/add-to-list',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/task' },
            },
          },
        },
      },
    },
  },

  'get /teammates': {
    action: 'teammates/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/teammate' },
            },
          },
        },
      },
    },
  },

  'get /statuses': {
    action: 'statuses/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/status' },
              },
            },
          },
        },
      },
    },
  },
  'post /statuses': {
    action: 'statuses/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/status' },
            },
          },
        },
      },
    },
  },

  'get /notifications': {
    action: 'notifications/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/notification' },
              },
            },
          },
        },
      },
    },
  },

  'get /notifications/:id': {
    action: 'notifications/get-by-id',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/notification' },
            },
          },
        },
      },
    },
  },

  'post /notifications': {
    action: 'notifications/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/notification' },
            },
          },
        },
      },
    },
  },

  'get /notifications/receive': {
    action: 'notifications/receive',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/notification' },
              },
            },
          },
        },
      },
    },
  },

  'patch /notifications/:id/cancel': {
    action: 'notifications/cancel',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notification',
              },
            },
          },
        },
      },
    },
  },

  'patch /notifications/:id': {
    action: 'notifications/patch',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notification',
              },
            },
          },
        },
      },
    },
  },

  'get /templates': {
    action: 'templates/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/template',
              },
            },
          },
        },
      },
    },
  },

  'get /templates/:id': {
    action: 'templates/get-by-id',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/template',
              },
            },
          },
        },
      },
    },
  },

  'get /tasks/:id/discussions': {
    action: 'comments/discussions/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/discussions',
              },
            },
          },
        },
      },
    },
  },

  'post /tasks/:id/discussions': {
    action: 'comments/discussions/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/discussions',
              },
            },
          },
        },
      },
    },
  },

  'get /tasks/:id/statusChanges': {
    action: 'comments/status-changes/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/statuschanges',
              },
            },
          },
        },
      },
    },
  },
  'get /tasks/:id/history': {
    action: 'comments/history/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/history',
              },
            },
          },
        },
      },
    },
  },

  'get /dev/backup': {
    action: 'dev/backup/get',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
        },
      },
    },
  },

  'post /dev/backup': {
    action: 'dev/backup/post',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
        },
      },
    },
  },

  'post /dev/faker/task': {
    action: 'dev/faker/task',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
        },
      },
    },
  },

  'post /dev/faker/notification': {
    action: 'dev/faker/notification',
    swagger: {
      responses: {
        '200': {
          description: 'The requested resource',
        },
      },
    },
  },

  '/': { view: 'swagger-ui' },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
