function(room, harvestDate, ellipsis) {
  const crops = require('crops');
const Context = require('context');
const context = new Context({ 
  room: room,
  harvestDate: harvestDate.label,
  cropsResults: [],
  cropsTodo: crops
});

ellipsis.success("OK, let's get started…", {
  next: {
    actionName: "run-check",
    args: [
      { name: "contextString", value: JSON.stringify(context) },
      { name: "crop", value: context.nextCrop() }
    ]
  }
})
}
