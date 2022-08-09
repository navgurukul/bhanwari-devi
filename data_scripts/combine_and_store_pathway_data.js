// const core = require('@actions/core');
const fs = require('fs');

const [frontEndFilePath, backEndFilePath, joinedFilePath] =
    process.argv.slice(2);

const frontEndPathwayData =
    JSON.parse(fs.readFileSync(frontEndFilePath, 'utf8')) || [];
const backEndData = JSON.parse(fs.readFileSync(backEndFilePath, 'utf8'));
const backEndPathwayData = backEndData?.pathways || [];

console.log("Front-end pathway data:", frontEndPathwayData);
console.log("Back-end pathway data:", backEndPathwayData);

if (backEndPathwayData.length === 0) {
  // This shouldn't happen, avoid overwriting pathway data 
  throw new Error("Back-end pathway data is empty.");
}

const feCodeToIndexMap = frontEndPathwayData.reduce(
    (codeMap, pathway, index) => {
      if (pathway.code) {
        codeMap[pathway.code] = index;
      }
      return codeMap;
    },
    {}
  );
backEndData.pathways = backEndPathwayData.reduce(
  (pathwayData, pathway) => {
    const indexOfPathway = feCodeToIndexMap[pathway.code];
    if (indexOfPathway != undefined) {
      pathwayData[indexOfPathway] = {
        ...pathway,
        ...pathwayData[indexOfPathway],
      };
    } else {
      pathwayData.push(pathway);
    }
    return pathwayData;
  },
  frontEndPathwayData
);

// core.setOutput('joined_pathway_data', JSON.stringify(backEndData));
fs.writeFileSync(joinedFilePath, JSON.stringify(backEndData), 'utf-8');