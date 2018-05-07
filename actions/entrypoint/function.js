function(ellipsis) {
  const C = require('skill-constants');
const rooms = ["MTR", "Megalodon", "KIT"];
const choices = rooms.map(choiceFor);
const preamble = `
:green_salad: Hello, this is the Sensory QC Check skill. 

If you ever need to run this manually, you can type \`…run sensory qc check\`.

Whenever you're ready, choose a room. You will be asked, for each crop, if it is \`${C.OK}\`, \`${C.CAUTION}\`, \`${C.ATTENTION}\` or \`${C.NOT_APPLICABLE}\` if a sensory test wasn't performed.
`
ellipsis.success(preamble, {
  choices: choices
});

function choiceFor(room) {
  return {
    label: room,
    actionName: "start-checklist", 
    args: [ { name: "room", value: room } ],
    allowMultipleSelections: true
  };
}
}
