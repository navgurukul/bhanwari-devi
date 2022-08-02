const fs = require('fs');

const [classDataFilePath, batchOutputFilePathPrefix] = process.argv.slice(2);
const classesStartingFromLastWeek =
  JSON.parse(fs.readFileSync(classDataFilePath, 'utf8')) || [];

if (classesStartingFromLastWeek.length === 0) {
  throw new Error('Class file data is empty.');
}

// Assume classes are sorted by start time from nearest in the future from back-end and
//  that batch classes scheduled to meet at least once per week (and haven't been canceled).
//  In that case, upcoming batches are batches for which no classes starting from 1 week ago
//  have met prior to now.

const partnerIdToPathwaysUpcomingBatchesMap = new Map();
// map from recurring ids to the end (or start) time of the last class with that id
const recurringIdToLastClassTimeMap = new Map();

classesStartingFromLastWeek.forEach((c) => {
  // Assume no partner with id of 0; this will be for the null case
  const cPartnerId = c.partner_id || 0;
  // map old to new pathway for Python (fix, very hacky)
  const cPathwayId =
    c.pathway_v2 || { 39: 1 }[c.pathway_v1] || c.pathway_v1 || c.pathway_id;
  if (c.recurring_id && cPathwayId) {
    if (!partnerIdToPathwaysUpcomingBatchesMap.has(cPartnerId)) {
      partnerIdToPathwaysUpcomingBatchesMap.set(cPartnerId, {});
    }
    const pathwaysUpcomingBatches =
      partnerIdToPathwaysUpcomingBatchesMap.get(cPartnerId);
    pathwaysUpcomingBatches[cPathwayId] ||= [];
    const latestTime = c.end_time || c.start_time;
    if (!recurringIdToLastClassTimeMap.has(c.recurring_id)) {
      new Date(latestTime) > new Date() &&
        pathwaysUpcomingBatches[cPathwayId].push(c);
    }
    recurringIdToLastClassTimeMap.set(c.recurring_id, latestTime);
  }
});

partnerIdToPathwaysUpcomingBatchesMap.forEach((pathwaysUpcomingBatches) => {
  Object.values(pathwaysUpcomingBatches).forEach((upcomingBatches) =>
    upcomingBatches.forEach(
      (c) => (c.end_batch_time = recurringIdToLastClassTimeMap.get(c.recurring_id))
    )
  );
});

partnerIdToPathwaysUpcomingBatchesMap.forEach((pathwaysUpcomingBatches, partnerId) => {
  // maybe allow other extensions in the future
  const extension = batchOutputFilePathPrefix.match(/.json$|.txt$|.html$/)?.[0] || "";
  const batchesOutputFilePath =
    batchOutputFilePathPrefix.substring(0, batchOutputFilePathPrefix.length - extension.length) +
    "_" +
    partnerId +
    extension;
  fs.writeFile(
    batchesOutputFilePath,
    JSON.stringify(pathwaysUpcomingBatches),
    'utf-8',
    (err) => {
      if (err) {
        console.log("Error writing batches for partner with id " + partnerId + " to " + batchesOutputFilePath);
      } else {
        console.log("Successfully wrote batches for partner with id " + partnerId + " to " + batchesOutputFilePath);
      }
    }
  );
});
