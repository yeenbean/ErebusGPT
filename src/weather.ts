import { openWeatherMapKey } from "./config.ts";

export interface openWeatherMap {
    "coord"?: {
        "lon"?: number;
        "lat"?: number;
    };
    "weather"?: {
        "id"?: number;
        "main"?: string;
        "description"?: string;
        "icon"?: number;
    };
    "base"?: string;
    "main"?: {
        "temp"?: number;
        "feels_like"?: number;
        "pressure"?: number;
        "humidity"?: number;
        "temp_min"?: number;
        "temp_max"?: number;
        "sea_level"?: number;
        "grnd_level"?: number;
    };
    "visibility"?: number;
    "wind"?: {
        "speed"?: number;
        "deg"?: number;
        "gust"?: number;
    };
    "clouds"?: {
        "all"?: number;
    };
    "rain"?: {
        "1h"?: number;
        "3h"?: number;
    };
    "snow"?: {
        "1h"?: number;
        "3h"?: number;
    };
    "dt"?: number;
    "sys"?: {
        "type"?: any;
        "id"?: number;
        "message"?: string;
        "country"?: string;
        "sunrise"?: number;
        "sunset"?: number;
    };
    "timezone"?: number;
    "id"?: number;
    "name"?: string;
    "cod"?: any;
}

async function getWeather(city: string): Promise<openWeatherMap | null> {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapKey}&limit=1&units=imperial`,
    );
    try {
        return await response.json();
    } catch (_e) {
        return null;
    }
}

export async function makeReport(city: string): Promise<string> {
    let weatherReport: string = "";
    const weather = await getWeather(city);

    // build weather report
    if (!weather) {
        weatherReport = weatherReport +
            `There was an error while retrieving the weather for ${city}.`;
        return weatherReport;
    } else {
        weatherReport += `Weather report for ${city}:\n`;

        if (weather.weather) {
            weatherReport += `\n`;
            if (weather.weather.main) {
                weatherReport += `Weather type: ${weather.weather.main}\n`;
            }
            if (weather.weather.description) {
                weatherReport +=
                    `Weather description: ${weather.weather.description}\n`;
            }
        }

        if (weather.main) {
            weatherReport += `\n`;
            if (weather.main.temp) {
                weatherReport += `Temperature: ${weather.main.temp}°F\n`;
            }
            if (weather.main.feels_like) {
                weatherReport += `Feels like: ${weather.main.feels_like}°F\n`;
            }
            if (weather.main.humidity) {
                weatherReport += `Humidity: ${weather.main.humidity}%\n`;
            }
        }
        return weatherReport;
    }
}

async function runTest(): Promise<string> {
    return await makeReport("flagstaff");
}

// for testing
if (import.meta.main) {
    console.log(await runTest());
}
