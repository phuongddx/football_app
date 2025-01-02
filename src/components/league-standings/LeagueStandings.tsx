import { useEffect, useState } from 'react'
import { View, Text } from '../Themed'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { FootballAPI } from '@/src/services/apis'

interface LeagueStandingsProps {
	leagueId: number
	season: number
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ leagueId, season }) => {
	const [standings, setStandings] = useState<Standing[]>([])
	const [loading, setLoading] = useState(false) // Changed initial state to false
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Clear previous data when props change
		setStandings([])
		setError(null)
		fetchStandings()
	}, [leagueId, season])

	const fetchStandings = async () => {
		if (loading) return // Prevent multiple simultaneous requests

		try {
			setLoading(true)
			setError(null)
			const { response } = await FootballAPI.getStandings(leagueId, season)
			if (response && Array.isArray(response)) {
				setStandings(response)
			} else {
				setError('Invalid data received')
			}
			console.log('Response', response)
		} catch (err) {
			setError('Failed to load standings')
		} finally {
			setLoading(false)
		}
	}

	const renderTeamRow = ({ item }: { item: Standing }) => (
		<View style={styles.row}>
			<Text style={styles.rank}>{item.rank}</Text>
			<Text style={styles.team}>{item.team.name}</Text>
			<Text style={styles.points}>{item.points}</Text>
			{/* <Text style={styles.stats}>{`${item.win}W ${item.draw}D ${item.lose}L`}</Text> */}
		</View>
	)

	if (loading) {
		return <ActivityIndicator size="small" />
	}

	if (error) {
		return <Text style={styles.error}>{error}</Text>
	}

	return (
		<View style={styles.container}>
			{/* <View style={styles.header}>
				<Text style={styles.rank}>Pos</Text>
				<Text style={styles.team}>Team</Text>
				<Text style={styles.points}>Pts</Text>
				<Text style={styles.stats}>W-D-L</Text>
			</View> */}
			{/* <FlatList
				data={standings}
				renderItem={renderTeamRow}
				keyExtractor={(item) => item.team.id.toString()}
			/> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#f4f4f4',
		borderBottomWidth: 1,
		borderColor: '#ddd',
	},
	row: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	rank: {
		width: 40,
		fontWeight: 'bold',
	},
	team: {
		flex: 1,
	},
	points: {
		width: 50,
		textAlign: 'center',
	},
	stats: {
		width: 100,
		textAlign: 'right',
	},
	error: {
		color: 'red',
		textAlign: 'center',
		padding: 20,
	},
})
