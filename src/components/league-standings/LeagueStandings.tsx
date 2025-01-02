import React, { useState, useEffect } from 'react'
import { FootballAPI } from '@/src/services/apis'
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	RefreshControl,
	Dimensions,
	FlatList,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

interface LeagueStandingsProps {
	leagueId: number
	season: number
}

interface StandingListProps {
	standings: Standing[]
	refreshing: boolean
	onRefresh: () => void
	onRowPress: (team: Standing) => void
	styles: Record<string, any>
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const StandingsList: React.FC<StandingListProps> = ({
	standings,
	refreshing,
	onRefresh,
	onRowPress,
	styles,
}) => {
	return (
		<FlatList
			data={standings}
			keyExtractor={(item) => item.team.id.toString()}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			renderItem={({ item, index }) => (
				<TouchableOpacity
					style={[styles.teamRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
					onPress={() => onRowPress(item)}
				>
					<Text style={[styles.text, styles.positionColumn]}>{item.rank}</Text>
					<View style={styles.teamColumn}>
						<View style={styles.teamInfo}>
							<Image source={{ uri: item.team.logo }} style={styles.teamLogo} />
							<Text style={styles.teamName}>{item.team.name}</Text>
						</View>
					</View>
					<Text style={[styles.text, styles.statsColumn]}>{item.all.played}</Text>
					<Text style={[styles.text, styles.statsColumn]}>{item.all.win}</Text>
					<Text style={[styles.text, styles.statsColumn]}>{item.all.draw}</Text>
					<Text style={[styles.text, styles.statsColumn]}>{item.all.lose}</Text>
					<Text style={[styles.text, styles.statsColumn]}>{item.goalsDiff}</Text>
					<Text style={[styles.text, styles.statsColumn, styles.pointsColumn]}>{item.points}</Text>
				</TouchableOpacity>
			)}
			ListHeaderComponent={
				<View style={styles.headerRow}>
					<Text style={[styles.headerText, styles.positionColumn]}>#</Text>
					<Text style={[styles.headerText, styles.teamColumn]}>Team</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>MP</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>W</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>D</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>L</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>GD</Text>
					<Text style={[styles.headerText, styles.statsColumn]}>Pts</Text>
				</View>
			}
		/>
	)
}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({ leagueId, season }) => {
	const [standings, setStandings] = useState<Standing[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		setStandings([])
		setError(null)
		fetchStandings()
	}, [leagueId, season])

	const fetchStandings = async () => {
		if (loading) return
		try {
			setLoading(true)
			setError(null)
			const data: StandingResponse = await FootballAPI.getStandings(leagueId, season)
			setStandings(data.response[0].league.standings[0])
		} catch (err) {
			setError('Failed to load standings')
		} finally {
			setLoading(false)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await fetchStandings()
		setRefreshing(false)
	}

	const handleRefresh = async () => {}

	if (loading && !refreshing) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		)
	}

	if (error) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>{error}</Text>
				<TouchableOpacity onPress={fetchStandings} style={styles.retryButton}>
					<Text style={styles.retryButtonText}>Retry</Text>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<StandingsList
					standings={standings}
					refreshing={refreshing}
					onRefresh={handleRefresh}
					onRowPress={(team) => alert(`Tapped on team: ${team.team.name}`)}
					styles={styles}
				/>
			</View>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: SCREEN_WIDTH,
		backgroundColor: '#fff',
	},
	centerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	headerRow: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 32,
		backgroundColor: '#f4f4f4',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	teamRow: {
		flexDirection: 'row',
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	evenRow: {
		backgroundColor: '#ffffff',
	},
	oddRow: {
		backgroundColor: '#fafafa',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#666',
	},
	text: {
		fontSize: 14,
		color: '#333',
	},
	positionColumn: {
		width: 30,
		textAlign: 'center',
	},
	teamColumn: {
		flex: 1,
		marginRight: 10,
	},
	statsColumn: {
		width: 35,
		textAlign: 'center',
	},
	pointsColumn: {
		fontWeight: 'bold',
	},
	teamInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	teamLogo: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
	teamName: {
		fontSize: 14,
		color: '#333',
		flex: 1,
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
	},
	retryButton: {
		padding: 10,
		backgroundColor: '#0066cc',
		borderRadius: 5,
	},
	retryButtonText: {
		color: '#fff',
		fontSize: 16,
	},
})
