import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Status, weatherConditions } from "../api";

interface CurrentWeather {
  time: string;
  temperature2m: number;
  precipitation: number;
  weatherCode: number;
  weatherCondition: string;
  windSpeed10m: number;
}

interface WeatherItemProps {
  img: string;
  alt: string;
  value: string;
}

const WeatherItem = ({ img, alt, value }: WeatherItemProps) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={3}
    display={"flex"}
    sx={{ alignItems: "center", paddingY: 1 }}
  >
    <img
      width={60}
      height={60}
      src={img}
      alt={alt}
      style={{ marginRight: 16 }}
    />
    {value}
  </Grid>
);

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
                img="https://i.ibb.co/s97pdD6/png-transparent-computer-icons-schedule-miscellaneous-text-rectangle-removebg-preview.png"
                alt="date time"
                value={dayjs(data.time).format("HH:mm, D MMMM YYYY")}
              />
              <WeatherItem
                img="https://i.ibb.co/T8638jD/image-1-removebg-preview.png"
                alt="temperature"
                value={`${data.temperature2m.toFixed(2)}°C`}
              />
              <WeatherItem
                img={weatherConditions[data.weatherCode].iconUrl}
                alt="weather condition"
                value={`${weatherConditions[data.weatherCode].name}`}
              />
              <WeatherItem
                img="https://i.ibb.co/kSspHWm/Screenshot-20-removebg-preview.png"
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
