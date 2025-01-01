import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

export default function MatchesLayout() {
	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</SafeAreaProvider>
	)
}
