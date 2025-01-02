import { LeagueStandings } from '@/src/components/league-standings/LeagueStandings'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function HomeScreen() {
	return (
		<SafeAreaProvider style={styles.container}>
			<LeagueStandings leagueId={39} season={2023} />
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 25,
		fontWeight: '700',
		color: '#fff',
	},
	button: {
		fontSize: 50,
		textDecorationLine: 'underline',
		color: '#fff',
	},
})
