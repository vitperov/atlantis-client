export interface IReportItemBase {
  type: string;
}

export interface IReportItemFactionInfo extends IReportItemBase {
  type: "FACTION_INFO";
}

export interface IReportItemDate extends IReportItemBase {
  type: "DATE";
}

export interface IReportItemVersions extends IReportItemBase {
  type: "VERSIONS";
}

export interface IReportItemFactionStatus extends IReportItemBase {
  type: "FACTION_STATUS";
}

export interface IReportItemFactionStatus extends IReportItemBase {
  type: "FACTION_STATUS";
}

// TODO: use it from reducer or in reducer from parser?
export interface IReportObject {
  objectId: number;
  objectName: string;
  objectType: string;
  objectUnits: IReportUnit[];
}

export interface IReportUnit {
  unitName: string;
  unitId: number;
  faction: {
    factionId: number;
    factionName: string; // TODO: one of key
  };
  unitDetails: object[];
}

// TODO: remove IRegion from reducers and use this one
export interface IRegion {
  readonly id: string;
  readonly title: string;
  readonly coordinates: {
    x: number;
    y: number;
    z: number;
  };
  readonly type: string;
  readonly details: string[];
  readonly gate?: string;
  readonly exits?: {
    [key: string]: IRegion;
  };
  readonly unitsAndObjects?: string[];
  unitsAndObjectsParsed: Array<IReportObject | IReportUnit>;
}

export interface IReportItemRegions extends IReportItemBase {
  type: "REGIONS";
  regions: IRegion[];
}

export type IReportItem = IReportItemRegions | IReportItemFactionInfo | IReportItemDate | IReportItemVersions | IReportItemFactionStatus;

export type IReport = IReportItem[];
