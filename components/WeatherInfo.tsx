import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { IWeatherResponseDTO, colors } from '../utils'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherInfo({ currentWeather }: { currentWeather: IWeatherResponseDTO }) {

	const {
		weather: [details],
		main: { temp },
		name
	} = currentWeather
	const { id, main, description, icon } = details
	const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`

	return (
		<View style={styles.weatherInfo}>
			<Text>{name}</Text>
			<Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
			<Text style={styles.textPrimary}>{temp}°</Text>
			<Text style={styles.weatherDescription}>{description}</Text>
			<Text style={styles.textSecondary}>{main}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	weatherInfo: {
		alignItems: 'center'
	},
	weatherIcon: {
		width: 100,
		height: 100
	},
	weatherDescription: {
		textTransform: 'capitalize',
	},
	textPrimary: {
		color: PRIMARY_COLOR,
		fontSize: 40
	},
	textSecondary: {
		color: SECONDARY_COLOR,
		fontSize: 20,
		fontWeight: '500',
		marginTop: 10
	}
})