export interface MatchData {
	match: {
		scouterName: string;
		matchNumber: string;
		teamNumber: string;
		teamAlliance: boolean;
	};

	auto: {
		startingPos: string;
		fuelFromNZ: number;
		climbedInAuto: boolean;
		usedOutpost: boolean;
		usedDepot: boolean;
		autoSOS: number;
	};

	tele: {
		shotsMade: number;
		fuelPushed: number;
		fuelPassed: number;

		playedDefense: boolean;
		defenseQuality: number;
		trenchBump: boolean;
		allianceZone: boolean;
		neutralZone: boolean;

		commitedFouls: boolean;
		defendability: number;
		shooterRange: number;
	};

	final: {
		lostComms: boolean;
		brokeDown: boolean;
		climbed: boolean;
		driverSkill: number;
		throughputSpeed: number;
		intakeRating: number;
		driverComments: string;
		robotComments: string;
		otherComments: string;
	};
}

export function createMatchData(data: Partial<MatchData> = {}): MatchData {
	return {
		match: {
			scouterName: "",
			matchNumber: "",
			teamNumber: "",
			teamAlliance: false,
			...data.match
		},

		auto: {
			startingPos: "",
			fuelFromNZ: 0,
			climbedInAuto: false,
			usedOutpost: false,
			usedDepot: false,
			autoSOS: 0,
			...data.auto
		},

		tele: {
			shotsMade: 0,
			fuelPushed: 0,
			fuelPassed: 0,

			playedDefense: false,
			defenseQuality: 0,
			trenchBump: false,
			allianceZone: false,
			neutralZone: false,

			commitedFouls: false,
			defendability: 0,
			shooterRange: 0,
			...data.tele
		},

		final: {
			lostComms: false,
			brokeDown: false,
			climbed: false,
			driverSkill: 0,
			throughputSpeed: 0,
			intakeRating: 0,
			driverComments: "",
			robotComments: "",
			otherComments: "",
			...data.final
		}
	};
}