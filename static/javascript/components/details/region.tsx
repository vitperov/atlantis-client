import React from "react";
import { connect } from "react-redux";

const Region = props => {
  return (
    <div className="card-body">
      <h5 className="card-title region-header">hills (43,21) in Zarka, 88 peasants (dwarfs), $88.</h5>
      <div className="dropdown-divider" />
      <div className="card-text">Wages: $6 (Max: $105).</div>
      <div className="card-text">Wanted: none.</div>
      <div className="card-text">For Sale: 17 dwarfs [DWA] at $48.</div>
      <div className="card-text">Entertainment available: $4.</div>
      <div className="card-text">Products: 14 iron [IRON], 14 livestock [LIVE].</div>
      <div className="dropdown-divider" />
      <div className="card-text">There is a Gate here (Gate 14 of 211).</div>
      <div className="dropdown-divider" />
      <div className="card-text">Exits:</div>
      <div className="card-text ml-3">North: wasteland (13,19) in Zarka.</div>
      <div className="card-text ml-3">Northeast: wasteland (14,20) in Zarka.</div>
      <div className="card-text ml-3">Southeast: swamp (14,22) in Zarka.</div>
      <div className="card-text ml-3">South: swamp (13,23) in Zarka.</div>
      <div className="card-text ml-3">Southwest: wasteland (12,22) in Zarka.</div>
      <div className="card-text ml-3">Northwest: ocean (22,20) in Zarka Ocean.</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(React.memo(Region));