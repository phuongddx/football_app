import React from 'react'
import {
	View,
	StyleSheet,
	Image,
	RefreshControl,
	ScrollView,
	Text,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import { Table, Row } from 'react-native-reanimated-table'

interface StandingListProps {
	standings: any[]
	refreshing: boolean
	onRefresh: () => void
	onRowPress: (item: any) => void
	styles?: any
}

const StandingsTable: React.FC<StandingListProps> = ({
	standings,
	refreshing,
	onRefresh,
	onRowPress,
	styles: customStyles,
}) => {
	const windowWidth = Dimensions.get('window').width
	const stickyColumnWidth = windowWidth * 0.4

	const tableHead = ['MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts', 'Form']
	const widthArr = [60, 60, 60, 60, 60, 60, 60, 60, 80]

	const formatRow = (standing: any) => [
		standing.all.played,
		standing.all.win,
		standing.all.draw,
		standing.all.lose,
		standing.all.goals.for,
		standing.all.goals.against,
		standing.goalsDiff,
		standing.points,
		standing.form,
	]

	const tableData = standings.map(formatRow)

	return (
		<View style={styles.container}>
			{/* Sticky Team Column */}
			<View style={[styles.stickyColumn, { width: stickyColumnWidth }]}>
				<View style={styles.headerCell}>
					<Text style={styles.headerText}>Team</Text>
				</View>
				<ScrollView
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					{standings.map((standing, index) => (
						<TouchableOpacity
							key={standing.team.id}
							onPress={() => onRowPress(standing)}
							style={styles.teamRow}
						>
							<View style={styles.teamInfo}>
								<Text style={styles.rankText}>{standing.rank}</Text>
								<Image source={{ uri: standing.team.logo }} style={styles.teamLogo} />
								<Text style={styles.teamName} numberOfLines={1}>
									{standing.team.name}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{/* Scrollable Content */}
			<ScrollView horizontal={true} style={styles.scrollableContent}>
				<View>
					<Table borderStyle={styles.tableBorder}>
						<Row
							data={tableHead}
							widthArr={widthArr}
							style={styles.header}
							textStyle={styles.headerText}
						/>
						<ScrollView
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						>
							{tableData.map((rowData, index) => (
								<TouchableOpacity key={index} onPress={() => onRowPress(standings[index])}>
									<Row
										data={rowData}
										widthArr={widthArr}
										style={styles.row}
										textStyle={styles.text}
									/>
								</TouchableOpacity>
							))}
						</ScrollView>
					</Table>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	stickyColumn: {
		backgroundColor: '#fff',
		zIndex: 1,
		elevation: 1,
		shadowColor: '#000',
		shadowOffset: { width: 2, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	scrollableContent: {
		flex: 1,
	},
	header: {
		height: 50,
		backgroundColor: '#f4f4f4',
	},
	headerCell: {
		height: 50,
		backgroundColor: '#f4f4f4',
		justifyContent: 'center',
		paddingHorizontal: 8,
	},
	headerText: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	text: {
		textAlign: 'center',
	},
	row: {
		height: 60,
		backgroundColor: '#fff',
	},
	teamRow: {
		height: 60,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	tableBorder: {
		borderWidth: 1,
		borderColor: '#eee',
	},
	teamInfo: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	rankText: {
		marginRight: 8,
		fontWeight: 'bold',
		width: 20,
	},
	teamLogo: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
	teamName: {
		flex: 1,
	},
})

export default StandingsTable
