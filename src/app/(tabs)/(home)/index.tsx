import { Text, View } from '@/src/components/Themed'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home screen</Text>
			<Link href="/details">Go to home screen</Link>
		</View>
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
