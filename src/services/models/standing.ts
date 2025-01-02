interface ApiResponse<T = unknown> {
	response: Array<T>
	errors?: string[]
	results?: number
	paging?: {
		current: number
		total: number
	}
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

type StandingResponse = ApiResponse<League>

interface Standing {
	rank: number
	team: {
		id: number
		name: string
		logo: string
	}
	points: number
	goalsDiff: number
	group: string
	form: string
	status: string
	description: string
	all: MatchStats
	home: MatchStats
	away: MatchStats
	update: string
}

interface MatchStats {
	played: number
	win: number
	draw: number
	lose: number
	goals: {
		for: number
		against: number
	}
}
