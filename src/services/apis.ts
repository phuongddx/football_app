import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
	// baseURL: 'https://v3.football.api-sports.io',
	baseURL: 'https://mocki.io/v1/54b3bd1b-862f-4e36-abbb-b4bf208d5434',
	headers: {
		'x-rapidapi-host': 'v3.football.api-sports.io',
		'x-rapidapi-key': '77258dca53882e76d5e16f502ee4bc5e',
		'Content-Type': 'application/json',
	},
})

apiClient.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (!error.response) {
			console.error('Network Error', error.response)
		}
		const message = error.response?.data?.message || error.message
		console.error('API Error:', message, error)
		return Promise.reject(error)
	},
)

export class FootballAPI {
	static async getStandings(league: number, season: number): Promise<StandingResponse> {
		// return apiClient.get('/standings', { params: { league, season } })
		return apiClient.get('')
	}
}
