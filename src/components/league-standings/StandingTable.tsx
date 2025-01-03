import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	RefreshControl,
	ScrollView,
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
	const tableHead = ['Team', 'MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts', 'Form']
	const widthArr = [160, 60, 60, 60, 60, 60, 60, 60, 60, 80]

	const formatRow = (standing: any) => {
		const teamCell = (
			<View style={styles.teamInfo}>
				<Text style={styles.rankText}>{standing.rank}</Text>
				<Image source={{ uri: standing.team.logo }} style={styles.teamLogo} />
				<Text style={styles.teamName}>{standing.team.name}</Text>
			</View>
		)

		return [
			teamCell,
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
	}

	const tableData = standings.map(formatRow)

	return (
		<ScrollView
			horizontal={true}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View>
				<Table borderStyle={styles.tableBorder}>
					<Row
						data={tableHead}
						widthArr={widthArr}
						style={styles.header}
						textStyle={styles.headerText}
					/>
					{tableData.map((rowData, index) => (
						<TouchableOpacity key={index} onPress={() => onRowPress(standings[index])}>
							<Row data={rowData} widthArr={widthArr} style={styles.row} textStyle={styles.text} />
						</TouchableOpacity>
					))}
				</Table>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 50,
		backgroundColor: '#f4f4f4',
	},
	headerText: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	text: {
		textAlign: 'center',
	},
	row: {
		height: 60,
		backgroundColor: '#fff',
	},
	tableBorder: {
		borderWidth: 1,
		borderColor: '#eee',
	},
	teamInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	rankText: {
		marginRight: 8,
		fontWeight: 'bold',
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
