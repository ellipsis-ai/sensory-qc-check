function(room, babyKaleFlavor, babyKaleAppearance, babyArugulaFlavor, babyArugulaAppearance, babyRomaineFlavor, babyRomaineAppearance, springMixFlavor, springMixAppearance, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const options = require('options');
const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;

const legend = options.map(ea => `${ea.emoji} = ${ea.name}`).join(", ");
const summary = `
Sensory QC check has been completed for ${room} by <@${user}>:
(${legend})

${resultFor("Baby kale", babyKaleFlavor, babyKaleAppearance)}

${resultFor("Baby arugula", babyArugulaFlavor, babyArugulaAppearance)}

${resultFor("Baby kale", babyRomaineFlavor, babyRomaineAppearance)}

${resultFor("Spring mix", springMixFlavor, springMixAppearance)}
`;

function resultFor(crop, flavor, appearance) {
  return `**${crop}:**
${flavor.emoji}  Flavor
${appearance.emoji}  Appearance
`;
}

const channels = ["testing123"].filter(ea => ea != channel);
api.say({ message: summary }).then(res => {
  Promise.all(channels.map(postSummaryTo)).then(ellipsis.noResponse);                                 
});

function postSummaryTo(channel) {
  return api.run({
    actionName: "post-checklist-summary",
    args: [{ name: "summary", value: summary }],
    channel: channel
  });
}
}
