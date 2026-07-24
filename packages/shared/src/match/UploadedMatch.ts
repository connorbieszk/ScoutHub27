import { type MatchData } from "./MatchData";

export class UploadedMatch {
	id: string;
	status: "pending" | "uploaded" | "failed";
	createdAt: number;
	matchNumber: string;
	data: MatchData;

	constructor(
		id: string,
		status: "pending" | "uploaded" | "failed",
		createdAt: number,
		matchNumber: string,
		data: MatchData
	) {
		this.id = id;
		this.status = status;
		this.createdAt = createdAt;
		this.matchNumber = matchNumber;
		this.data = data;
	};

}