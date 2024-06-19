import { Grid } from "@mui/material";

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
    sx={{ alignItems: "center", paddingY: 0.5 }}
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

export default WeatherItem;
