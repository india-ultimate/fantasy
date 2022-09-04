export const statsOrder = [
	"goal",
	"assist",
	"o-scoring-line",
	"o-line",
	"defense",
	// "block",  // We don't collect blocks data separately
	"d-scoring-line",
	"d-line",
	"throwaway",
	"drop",
];

export const displayNames = {
	assist: "Assist",
	block: "Block",
	"d-line": "On D Line",
	"d-scoring-line": "On scoring D Line",
	defense: "Defense",
	drop: "Drop",
	goal: "Goal",
	"o-line": "On O Line",
	"o-scoring-line": "On scoring O Line",
	throwaway: "Throwaway",
};

export const points = [
	{ event: "goal", points: 3 },
	{ event: "assist", points: 3 },
	{ event: "o-line", points: 0.5 },
	{ event: "o-scoring-line", points: 1 },
	{ event: "block", points: 5 },
	{ event: "d-line", points: 0.5 },
	{ event: "d-scoring-line", points: 2 },
	{ event: "drop", points: -2 },
	{ event: "throwaway", points: -2 },
];
