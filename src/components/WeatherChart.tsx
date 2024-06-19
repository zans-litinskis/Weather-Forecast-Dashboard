import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Status } from "../api";
import Chart from "./Chart";

interface WeatherChartProps {
  data: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    soil_temperature_0cm: number;
  }[];
  location: {
    latitude: string;
    longitude: string;
  };
  elevation: number;
  generation_time_ms: number;
}

const WeatherChart = ({
  weatherData,
  status,
}: {
  weatherData: WeatherChartProps;
  status: Status;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          Weather Data
        </Typography>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <>
            {status === "pending" ? (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : !weatherData ? (
              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                There is no data to display
              </Box>
            ) : (
              <Chart weatherData={weatherData} />
            )}
          </>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
