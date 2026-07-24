import { type MatchData } from "./matchData";

export class UploadedMatch {
	id: string;
    devId: string;
	status: "pending" | "uploaded" | "failed";
    type: "match" | "practice" | "pre" | "pit";
	createdAt: number;
	competition : string;
	matchNumber : number;
	teamNumber: number;
	scouter: string;
	data: MatchData;

	constructor(
		id: string,
        devId : string,
		status: "pending" | "uploaded" | "failed",
        type: "match" | "practice" | "pre" | "pit",
		createdAt: number,
		competition : string,
		matchNumber: number,
		teamNumber: number,
		scouter: string,
		data: MatchData
	) {
		this.id = id;
        this.devId = devId;
		this.status = status;
        this.type = type;
		this.createdAt = createdAt;
		this.competition = competition;
		this.matchNumber = matchNumber;
		this.teamNumber = teamNumber;
		this.scouter = scouter;
		this.data = data;
	};
}