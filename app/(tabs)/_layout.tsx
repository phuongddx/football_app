import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const commonScreenOptions = {
	tabBarActiveTintColor: '#ffd33d',
	headerStyle: {
		backgroundColor: '#25292e',
	},
	headerShadowVisible: false,
	headerTintColor: '#fff',
	tabBarStyle: {
		backgroundColor: '#25292e',
	},
}

const getTabBarIcon = (focused: boolean, iconName: string, color: string) => (
	<Ionicons
		name={
			focused
				? (`${iconName}-sharp` as keyof typeof Ionicons.glyphMap)
				: (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)
		}
		color={color}
		size={24}
	/>
)

export default function TabLayout() {
	return (
		<Tabs screenOptions={commonScreenOptions}>
			<Tabs.Screen
				name="(home)"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => getTabBarIcon(focused, 'home', color),
				}}
			/>
			<Tabs.Screen
				name="matches"
				options={{
					title: 'Matches',
					tabBarIcon: ({ color, focused }) => getTabBarIcon(focused, 'information-circle', color),
				}}
			/>
		</Tabs>
	)
}
