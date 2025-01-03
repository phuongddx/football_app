import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	RefreshControl,
	FlatList,
} from 'react-native'

import { SCREEN_WIDTH } from './LeagueStandings'
import StandingsTable from './StandingTable'

interface StandingListProps {
	standings: Standing[]
	refreshing: boolean
	onRefresh: () => void
	onRowPress: (team: Standing) => void
	styles: Record<string, any>
}

export const StandingsList: React.FC<StandingListProps> = ({
	standings,
	refreshing,
	onRefresh,
	onRowPress,
	styles,
}) => {
	return (
		<StandingsTable
			standings={standings}
			refreshing={refreshing}
			onRefresh={onRefresh}
			onRowPress={onRowPress}
			styles={styles}
		/>
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
