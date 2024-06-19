import { fetchWeatherApi } from "openmeteo";
import { useState } from "react";
import dayjs from "dayjs";

const API_URL = "https://api.open-meteo.com/v1/forecast";

export const WEATHER_CONDITIONS: {
  [key: number]: { name: string; iconUrl: string };
} = {
  0: {
    name: "Clear sky",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/c01d.png",
  },
  1: {
    name: "Mainly clear",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/c02d.png",
  },
  2: {
    name: "Partly cloudy",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/c03d.png",
  },
  3: {
    name: "Overcast",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/c04d.png",
  },
  45: {
    name: "Fog",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/a05d.png",
  },
  48: {
    name: "Depositing rime fog",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/a06d.png",
  },
  51: {
    name: "Light drizzle",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/d01d.png",
  },
  53: {
    name: "Moderate drizzle",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/d02d.png",
  },
  55: {
    name: "Dense drizzle",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/d03d.png",
  },
  56: {
    name: "Light freezing drizzle",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/d01d.png",
  },
  57: {
    name: "Dense freezing drizzle",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/d02d.png",
  },
  61: {
    name: "Slight rain",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r01d.png",
  },
  63: {
    name: "Moderate rain",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r02d.png",
  },
  65: {
    name: "Heavy rain",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r03d.png",
  },
  66: {
    name: "Light freezing rain",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/f01d.png",
  },
  67: {
    name: "Heavy freezing rain",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/f01d.png",
  },
  71: {
    name: "Slight snow fall",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png",
  },
  73: {
    name: "Moderate snow fall",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s02d.png",
  },
  75: {
    name: "Heavy snow fall",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s03d.png",
  },
  77: {
    name: "Snow grains",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s02d.png",
  },
  80: {
    name: "Slight rain showers",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r04d.png",
  },
  81: {
    name: "Moderate rain showers",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r05d.png",
  },
  82: {
    name: "Violent rain showers",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/r06d.png",
  },
  85: {
    name: "Slight snow showers",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png",
  },
  86: {
    name: "Heavy snow showers",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/s02d.png",
  },
  95: {
    name: "Thunderstorm",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/t01d.png",
  },
  96: {
    name: "Thunderstorm with slight hail",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/t05d.png",
  },
  99: {
    name: "Thunderstorm with heavy hail",
    iconUrl: "https://cdn.weatherbit.io/static/img/icons/t05d.png",
  },
};

export interface WeatherQueryParams {
  latitude: string;
  longitude: string;
  dateRange: string[] | null[];
}

export interface WeatherData {
  hourly: {
    temperature_2m: number[];
    precipitation: number[];
    time: string[];
    wind_speed_10m: number[];
  };
}

export type Status = "idle" | "pending" | "success" | "error";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const useWeatherData = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<Error | undefined>();

  const execute = async (params: WeatherQueryParams) => {
    setError(undefined);
    setStatus("pending");

    try {
      const responses = await fetchWeatherApi(API_URL, {
        latitude: params.latitude,
        longitude: params.longitude,
        start_date: dayjs(params.dateRange[0]).format("YYYY-MM-DD"),
        end_date: dayjs(params.dateRange[1]).format("YYYY-MM-DD"),
        timeformat: "unixtime",
        hourly: [
          "temperature_2m",
          "weather_code",
          "wind_speed_10m",
          "soil_temperature_0cm",
          "precipitation",
        ],
        current: [
          "temperature_2m",
          "precipitation",
          "weather_code",
          "wind_speed_10m",
        ],
      });

      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;
      const elevation = response.elevation()!;
      const generation_time_ms = response.generationTimeMilliseconds()!;

      const weatherData = {
        hourly: {
          time: range(
            Number(hourly.time()),
            Number(hourly.timeEnd()),
            hourly.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          weatherCode: hourly.variables(1)!.valuesArray()!,
          windSpeed10m: hourly.variables(2)!.valuesArray()!,
          soilTemperature0cm: hourly.variables(3)!.valuesArray()!,
        },
      };

      const data = weatherData.hourly.time.map((item, index) => ({
        time: item.toISOString(),
        temperature_2m: weatherData.hourly.temperature2m[index],
        weather_code: weatherData.hourly.weatherCode[index],
        wind_speed_10m: weatherData.hourly.windSpeed10m[index],
        soil_temperature_0cm: weatherData.hourly.soilTemperature0cm[index],
      }));

      const current_data = {
        time: new Date(
          (Number(current.time()) + utcOffsetSeconds) * 1000
        ).toISOString(),
        temperature2m: current.variables(0)!.value(),
        precipitation: current.variables(1)!.value(),
        weatherCode: current.variables(2)!.value(),
        windSpeed10m: current.variables(3)!.value(),
      };

      setValue({
        data,
        elevation,
        location: params,
        generation_time_ms,
        current_data,
      });
      setError(undefined);
      setStatus("success");
    } catch (error: unknown) {
      console.error(error);

      setError(error as Error);
      setStatus("error");
    }
  };

  return {
    execute,
    status,
    value,
    error,
  };
};
