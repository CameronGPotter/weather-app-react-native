import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'

import writeData from './utils/WriteData';
import { IWeatherResponseDTO, colors } from './utils/index';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

import { WEATHER_API_KEY, BASE_WEATHER_URL } from '@env';

export default function App() {

    const [errorMessages, setErrorMessages] = useState<string | null>(null)
    const [currentWeather, setCurrentWeather] = useState<IWeatherResponseDTO | null>(null)
    const [unitsSystem, setUnitsSystem] = useState<string>('metric')

    useEffect(() => {
        load()
    }, [unitsSystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessages(null)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessages('Location permission not granted')
                return
            }

            const location = await Location.getCurrentPositionAsync({})

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessages(result.message)
            }

        } catch (error: any) {
            setErrorMessages(error.message)
        }
    }

    if (currentWeather) {
        writeData({currentWeather})
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.main}>
                    <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
                    <ReloadIcon load={load} />
                    <WeatherInfo currentWeather={currentWeather} />
                </View>
                <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
            </View>
        );
    } else if (errorMessages) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={{ textAlign: 'center' }}>{errorMessages}</Text>
                <StatusBar style="auto" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    }
});
