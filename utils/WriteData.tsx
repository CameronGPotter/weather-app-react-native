import { database } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { IWeatherResponseDTO } from '.'

export default async function writeData({ currentWeather }: { currentWeather: IWeatherResponseDTO }) {

	let date = new Date()
	let path = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getHours() + "/" + date.getMinutes()
	console.log(path)
	
	set(ref(database, path), currentWeather);
}