import React from "react";
import { connect } from "react-redux";
import { ICombinedReducersState } from "../../reducers";
import Gate from "./gate";
import Details from "./details";
import { IRegionDetailsProps } from "./details-region.d";
import "./styles/index.scss";

const Region = ({ region }: IRegionDetailsProps) => {
  if (!region) {
    return <div className="card-body" />;
  }

  return (
    <div className="card-body atl-region">
      <h5 className="card-title atl-region__header">{region.title}</h5>
      <Details region={region} />
      <Gate region={region} />
    </div>
  );
};

const mapStateToProps = (state: ICombinedReducersState): IRegionDetailsProps => {
  const currentLevelData = state.regions.levels[state.regions.mapLevel];
  if (!currentLevelData) {
    return {};
  }
  return {
    region: currentLevelData.regions[currentLevelData.selectedRegion]
  };
};

export default connect(mapStateToProps)(React.memo(Region));
