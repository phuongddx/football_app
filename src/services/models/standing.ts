interface Team {
	id: number
	name: string
	logo: string
}

interface Goals {
	for: number
	against: number
}

interface MatchRecord {
	played: number
	win: number
	draw: number
	lose: number
	goals: Goals
}

interface Standing {
	rank: number
	team: Team
	points: number
	goalsDiff: number
	group: string
	form: string
	status: string
	description: string
	all: MatchRecord
	home: MatchRecord
	away: MatchRecord
	update: string
}

interface League {
	id: number
	name: string
	country: string
	logo: string
	flag: string
	season: number
	standings: Standing[][]
}
