function(contextString, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const options = require('options');
const crops = require('crops');
const channel = ellipsis.userInfo.messageInfo.channel;
const user = ellipsis.userInfo.messageInfo.userId;
const Context = require('context');
const context = new Context(JSON.parse(contextString));

const legend = options.map(ea => `${ea.emoji} = ${ea.name}`).join(", ");
const resultsText = crops.map(crop => {
  const result = context.resultFor(crop);
  return resultFor(crop, result.flavor, result.appearance);
}).join("\n");

const summary = `
Sensory QC check has been completed for ${context.room} (harvest date: ${context.harvestDate}) by <@${user}>:

${resultsText}
`;

function resultFor(crop, flavor, appearance) {
  return `
${flavor.emoji}  ${crop} (flavor)  ${detailsFor(flavor)}
${appearance.emoji}  ${crop} (appearance)  ${detailsFor(appearance)} ${pictureUrlFor(appearance)}
`.trim();
}

function detailsFor(result) {
  if (result.details) {
    return `_details: ${result.details.trim()}_`;
  } else {
    return "";
  }
}

function pictureUrlFor(result) {
  if (result.pictureUrl) {
    return `[View image](${result.pictureUrl})`;
  } else {
    return "";
  }
}

const channels = ["ssf-postharvest", "sensory-results"].filter(ea => ea != channel);
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
