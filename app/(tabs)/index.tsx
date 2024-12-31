import { Text, View } from '@/components/Themed'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home screen</Text>
			<Link href="/about" style={styles.button}>
				Go to About screen
			</Link>
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
		color: '#fff',
	},
	button: {
		fontSize: 20,
		textDecorationLine: 'underline',
		color: '#fff',
	},
})