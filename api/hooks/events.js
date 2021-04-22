module.exports = function eventsHook(app) {
  return {
    initialize(done) {
      app.after('hook:orm:loaded', () => {
        const events = {
          created: 'afterCreate',
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
            const callbacks = app.models[model]._callbacks;
            callbacks[method] = setupEvent(app, evt, callbacks[method]);
          }
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
  return function modelEvent(changes, done) {
    // Normalise... Some events emit an array of changed model objects so let's normalise everything
    // into an array and then loop through all of them and emit them one by one
    changes = changes instanceof Array ? changes : [changes];

    for (const change of changes) {
      emitter.emit(event, change);
    }

    if (defaultCallback) return defaultCallback(changes, done);

    return done();
  };
}
