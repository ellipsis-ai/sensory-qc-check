function(ellipsis) {
  const crops = require('crops');
const Context = require('context');
const options = require('options');
const resultOptions = options.map(ea => {
  let details;
  let pictureUrl;
  if (ea.name !== "OK" && ea.name !== "N/A") {
    details = "Just testing.";
    pictureUrl = "https://example.com/pic";
  }
  return { label: `${ea.emoji} ${ea.name}`, id: ea.name, emoji: ea.emoji, details: details, pictureUrl: pictureUrl };
});

function randomResult() {
  return resultOptions[Math.floor(Math.random()*resultOptions.length)];
}

let context = new Context({ 
  room: "KIT",
  harvestDate: "Friday",
  cropsResults: [],
  cropsTodo: crops
});
const resultKinds = ["flavor", "appearance"];
crops.forEach(crop => {
  resultKinds.forEach(kind => {
    context = context.withNewResult(crop, kind, randomResult());
  });
})

// console.log(JSON.stringify(context));
ellipsis.success("", {
  next: {
    actionName: "post-summary",
    args: [
      { name: "contextString", value: JSON.stringify(context) }
    ]
  }
})
}
