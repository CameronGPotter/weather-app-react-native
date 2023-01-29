/**
 * Represents colors used in the application
 */
export const colors = {
	PRIMARY_COLOR: "#ff304f",
	SECONDARY_COLOR: "#002651",
	BORDER_COLOR: "#dbdbdb"
}

/**
 * Represents a response DTO shape from the Weather API.
 */
export interface IWeatherResponseDTO {
	coord: {
		lon: number,
		lat: number
	},
	weather: Array<{
		id: any,
		main: any,
		description: any,
		icon: any
	}>,
	base: string,
	main: {
		temp: number,
		feels_like: number,
		pressure: number,
		humidity: number
		temp_min: number,
		temp_max: number,
		sea_level: number,
		grnd_level: number
	},
	visibility: number,
	wind: {
		speed: number,
		deg: number,
		gust: number
	},
	clouds: {
		all: number
	},
	rain: {
		one_h: number,
		three_h: number
	}
	dt: number,
	sys: {
		type: string,
		id: number,
		country: string,
		sunrise: number,
		sunset: number
	},
	timezone: string,
	id: number,
	name: string,
	cod: number
}