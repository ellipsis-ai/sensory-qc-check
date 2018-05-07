function(contextString, crop, result, ellipsis) {
  const Context = require('context');
const context = new Context(JSON.parse(contextString));
const C = require('skill-constants');

if (result.id === C.CAUTION || result.id === C.ATTENTION) {
  ellipsis.success("", {
    next: {
      actionName: "run-flavor-followup",
      args: [
        { name: "contextString", value: contextString },
        { name: "crop", value: crop },
        { name: "result", value: result.id }
      ]
    }
  })
} else {
  context.acceptFlavorResult(crop, result, ellipsis);
}
}
