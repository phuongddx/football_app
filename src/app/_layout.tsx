import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from '@/src/components/useColorScheme.web'

const RootNavigation = () => {
	const colorScheme = useColorScheme()

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

export default function App() {
	return (
		<SafeAreaProvider>
			<RootNavigation />
		</SafeAreaProvider>
	)
}
