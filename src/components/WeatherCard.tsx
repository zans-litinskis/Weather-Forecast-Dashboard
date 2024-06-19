import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import WeatherItem from "./WeatherItem";
import { Status, WEATHER_CONDITIONS } from "../api";
import { Calendar, Temperature, Wind } from "../assets/images";

interface CurrentWeather {
  time: string;
  temperature2m: number;
  precipitation: number;
  weatherCode: number;
  weatherCondition: string;
  windSpeed10m: number;
}

const WeatherCard = ({
  data,
  status,
}: {
  data: CurrentWeather | undefined;
  status: Status;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          Current Weather
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {status === "pending" ? (
            <CircularProgress />
          ) : !data ? (
            "No data to display"
          ) : (
            <Grid container direction={"row"}>
              <WeatherItem
                img={Calendar}
                alt="date time"
                value={dayjs(data.time).format("HH:mm, D MMMM YYYY")}
              />
              <WeatherItem
                img={Temperature}
                alt="temperature"
                value={`${data.temperature2m.toFixed(2)}°C`}
              />
              <WeatherItem
                img={WEATHER_CONDITIONS[data.weatherCode].iconUrl}
                alt="weather condition"
                value={`${WEATHER_CONDITIONS[data.weatherCode].name}`}
              />
              <WeatherItem
                img={Wind}
                alt="wind speed"
                value={`${data.windSpeed10m.toFixed(2)}km/h`}
              />
            </Grid>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
