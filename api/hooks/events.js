let lastChange = null;

module.exports = function eventsHook(app) {
  return {
    initialize(done) {
      app.after('lifted', () => {
        const events = {
          created: 'afterCreate',
          diffReceived: 'beforeUpdate',
          updated: 'afterUpdate',
          destroyed: 'afterDestroy',
        };

        // Loop through all models (model var is the model's name, not the actual object)
        for (const model of Object.keys(app.models)) {
          // Use the events map defined above to map an event to a model's lifecycle callback
          for (const event of Object.keys(events)) {
            // evt is in the format model:event, i.e. user:created
            const evt = `${model}:${event}`;
            const method = events[event];

            // Start extending the models
            app.models[model]._callbacks[method] = setupEvent(
              app,
              evt,
              app.models[model]._callbacks[method],
            );
          }

          const callback = app.models[model]._callbacks.beforeUpdate;
          app.models[model]._callbacks.beforeUpdate = async (changes, done) => {
            changes = changes instanceof Array ? changes : [changes];

            setupEvent.lastChange = changes;
            if (callback) return callback(changes, done);

            return done();
          };
        }
      });

      return done();
    },
  };
};

/**
 * Closure representing a particular model:event relation
 *
 * @param     {Object}    emitter     The Sails.js app
 * @param     {String}    event       The event to be emitted
 * @return    {Function}              The actual function who will emit the event on the Sails app
 */
function setupEvent(emitter, event, defaultCallback) {
  return (changes, done) => {
    // Normalise... Some events emit an array of changed model objects so let's normalise everything
    // into an array and then loop through all of them and emit them one by one
    changes = changes instanceof Array ? changes : [changes];

    for (const id in changes) {
      emitter.emit(event, {
        change: changes[id],
        diff: setupEvent.lastChange?.[id],
      });
    }

    if (defaultCallback) return defaultCallback(changes, done);

    return done();
  };
}
