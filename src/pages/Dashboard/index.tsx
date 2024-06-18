import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Card,
  CardContent,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRange } from "@mui/x-date-pickers-pro";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useWeatherData } from "../../api";
import WeatherChart from "../../components/WeatherChart";
import WeatherCard from "../../components/WeatherCard";

const Dashboard = () => {
  const formik = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
      dateRange: [null, null],
    },
    validationSchema: Yup.object().shape({
      latitude: Yup.number().min(-90).max(90).required(),
      longitude: Yup.number().min(-180).max(180).required(),
      dateRange: Yup.array()
        .required("Please select date")
        .test(
          "dateRange",
          "Start and end date are required",
          (dateRange) =>
            dateRange.length === 2 &&
            dateRange[0] != null &&
            dateRange[1] != null
        ),
    }),
    validateOnBlur: true,
    onSubmit: () => {
      execute();
    },
  });

  const { value, execute, status } = useWeatherData(formik.values);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Card>
        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            onReset={formik.handleReset}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              Location and Date
            </Typography>
            <Grid container direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Latitude"
                  variant="outlined"
                  name="latitude"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.latitude}
                  helperText={formik.touched.latitude && formik.errors.latitude}
                  error={
                    formik.touched.latitude && Boolean(formik.errors.latitude)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Longitude"
                  variant="outlined"
                  name="longitude"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.longitude}
                  helperText={
                    formik.touched.longitude && formik.errors.longitude
                  }
                  error={
                    formik.touched.longitude && Boolean(formik.errors.longitude)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormControl
                    error={Boolean(formik.errors.dateRange)}
                    fullWidth
                  >
                    <DateRangePicker
                      format="YYYY-MM-DD"
                      localeText={{
                        start: "Start Date",
                        end: "End Date",
                      }}
                      name="dataRange"
                      onChange={(value) =>
                        formik.setFieldValue("dateRange", value)
                      }
                      value={formik.values.dateRange as DateRange<Dayjs>}
                    />
                  </FormControl>
                  {formik.errors.dateRange && (
                    <FormHelperText>{formik.errors.dateRange}</FormHelperText>
                  )}
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    !(formik.dirty && formik.isValid) || status === "pending"
                  }
                >
                  Get Weather
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

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
