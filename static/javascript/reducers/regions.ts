import _ from "lodash";
import { REPORT_LOADED } from "../actions/report-actions";

const initialState = {
  levels: [],
  currentLevel: 0,
  zoom: 1,
  selectedRegion: undefined
};

const parseRegion = (result, region) => {
  if (!result[region.coordinates.z]) {
    result[region.coordinates.z] = { regions: {}, maxX: 0, maxY: 0 };
  }
  const { x, y } = region.coordinates;
  const regions = result[region.coordinates.z].regions;
  regions[`${x}_${y}`] = region;

  // Exits
  for (const dir in region.exits) {
    if (!region.exits.hasOwnProperty(dir)) {
      continue;
    }
    const {
      coordinates: { x: exitX, y: exitY }
    } = region.exits[dir];
    if (!regions[`${exitX}_${exitY}`] || regions[`${exitX}_${exitY}`].type === "unknown") {
      regions[`${exitX}_${exitY}`] = region.exits[dir];
    }

    // Shadow exit regions
    [
      { x: exitX + 1, y: exitY - 1 },
      { x: exitX + 1, y: exitY + 1 },
      { x: exitX, y: exitY - 2 },
      { x: exitX, y: exitY + 2 },
      { x: exitX - 1, y: exitY - 1 },
      { x: exitX - 1, y: exitY + 1 }
    ].forEach(d => {
      if (!regions[`${d.x}_${d.y}`] && d.x >= 0 && d.y >= 0) {
        regions[`${d.x}_${d.y}`] = {
          coordinates: { x: d.x, y: d.y, z: region.coordinates.z },
          title: "Unknown",
          type: "unknown"
        };
      }
    });
  }
  return result;
};

const parseLevel = level => {
  let maxX = 0;
  let maxY = 0;
  let isWrap = false;
  for (const locator in level.regions) {
    if (!level.regions.hasOwnProperty(locator)) {
      continue;
    }
    if (level.regions[locator].coordinates.x > maxX) {
      maxX = level.regions[locator].coordinates.x;
    }
    if (level.regions[locator].coordinates.y > maxY) {
      maxY = level.regions[locator].coordinates.y;
    }
    if (level.regions[locator].coordinates.x === 0) {
      isWrap = true;
    }
  }
  level.maxX = maxX;
  level.maxY = maxY;
  level.isWrap = isWrap;
  // TODO: add isTop/BottonEdge check
  return level;
};

const parseRegions = report => {
  const reportData = report.find(d => d.type === "REGIONS");
  if (!reportData || !reportData.regions) {
    return [];
  }
  return _.chain(reportData.regions)
    .reduce(parseRegion, [])
    .compact()
    .map(parseLevel)
    .value();
};

function regionsReducer(state = initialState, action) {
  switch (action.type) {
    case REPORT_LOADED:
      state = { ...state, levels: parseRegions(action.report) };
      console.log(state);
      break;
  }
  return state;
}

export default regionsReducer;
