import { Container, Typography, Box } from "@mui/material";
import { useWeatherData } from "../../api";
import { Weather } from "../../assets/images";
import { WeatherCard, WeatherChart, WeatherForm } from "../../components";

const Dashboard = () => {
  const { value, execute, status } = useWeatherData();

  return (
    <Container sx={{ paddingY: 2 }}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <img width={80} height={80} src={Weather} alt="weather dashboard" />
        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.125rem",
            },
          }}
          align="center"
          fontWeight={"bold"}
        >
          Weather Forecast Dashboard
        </Typography>
      </Box>

      <WeatherForm onFilterWeather={execute} status={status} />

      <Box sx={{ marginTop: 2 }}>
        <WeatherCard data={value && value.current_data} status={status} />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <WeatherChart weatherData={value} status={status} />
      </Box>
    </Container>
  );
};

export default Dashboard;
