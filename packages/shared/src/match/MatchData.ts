export class MatchData {
	match = {
		scouterName: '',
		matchNumber: '',
		teamNumber: '',
		teamAlliance: false
	};

	auto = {
		startingPos: '',
		fuelFromNZ: 0,
		climbedInAuto: false,
		usedOutpost: false,
		usedDepot: false,
		autoSOS: 0
	};

	tele = {
		shotsMade : 0,
		fuelPushed : 0,
		fuelPassed : 0,

		playedDefense : false,
		defenseQuality : 0,
		trenchBump: false,
		allianceZone : false,
		neutralZone : false,

		commitedFouls : false,
		defendability: 0,
		shooterRange : 0
	};

	final = {
		lostComms : false,
		brokeDown : false,
		climbed : false,
		driverSkill : 0,
		throughputSpeed : 0,
		intakeRating : 0,
		driverComments : "",
		robotComments : "",
		otherComments : ""
	};

	constructor(data?: Partial<MatchData>) {
		Object.assign(this, data);
	}
}