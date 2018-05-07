function(contextString, crop, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));

ellipsis.success(`Sensory check for \`${crop}\` in \`${context.room}\`:`, {
  next: {
    actionName: "run-flavor-check",
    args: [
      { name: "contextString", value: contextString },
      { name: "crop", value: crop }
    ]
  }
});
}
