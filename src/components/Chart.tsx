import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { WEATHER_CONDITIONS } from "../api";

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

const Chart = ({ weatherData }: { weatherData: WeatherChartProps }) => {
  const { data, location, elevation, generation_time_ms } = weatherData;

  const options: Highcharts.Options = {
    title: {
      text: `${Number(location.latitude).toFixed(2)}°N ${Number(
        location.longitude
      ).toFixed(2)}°E ${elevation}m above sea level`,
    },
    subtitle: {
      text: `Generated in ${generation_time_ms.toFixed(2)}ms`,
    },
    chart: {
      zooming: {
        type: "x",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      categories: data.map((d) => d.time),
      title: {
        text: "",
      },
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%e %b %Y", Number(this.value));
        },
      },
      tickPositioner: function () {
        var positions = [],
          interval = Math.ceil(data.length / 10);

        for (var i = 0; i < data.length; i += interval) {
          var timestamp = Date.parse(data[i].time);
          positions.push(timestamp);
        }

        return positions;
      },
    },
    yAxis: [
      {
        title: {
          text: "Temperature (°C)",
        },
      },
      {
        title: {
          text: "Wind Speed (km/h)",
        },
      },
      {
        title: {
          text: "Weather Code (wmo)",
        },
      },
    ],
    series: [
      {
        name: "temperature_2m",
        data: data.map((d) => [new Date(d.time).getTime(), d.temperature_2m]),
        type: "line",
        yAxis: 0,
        lineWidth: 1.5,
        marker: {
          enabled: false,
        },
      },
      {
        name: "wind_speed_10m",
        data: data.map((d) => [new Date(d.time).getTime(), d.wind_speed_10m]),
        type: "line",
        yAxis: 1,
        lineWidth: 1.5,
        marker: {
          enabled: false,
        },
      },
      {
        name: "weather_code",
        data: data.map((d) => [new Date(d.time).getTime(), d.weather_code]),
        type: "line",
        yAxis: 2,
        lineWidth: 1.5,
        marker: {
          enabled: false,
        },
      },
      {
        name: "soil_temperature_0cm",
        data: data.map((d) => [
          new Date(d.time).getTime(),
          d.soil_temperature_0cm,
        ]),
        type: "line",
        lineWidth: 1.5,
        marker: {
          enabled: false,
        },
      },
    ],
    legend: {
      itemStyle: {
        fontWeight: "bold",
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        const points = this.points!;
        const date = Highcharts.dateFormat(
          "%A, %e %B %Y, %l:%M %p",
          this.x as number
        );

        let tooltip = `<b>${date}</b><br/>`;
        points.forEach((point) => {
          const color = point.series.color;
          tooltip += `<span style="color: ${color}">\u25CF</span> ${
            point.series.name
          }: <b>${
            point.series.name !== "weather_code"
              ? point.y?.toFixed(2)
              : WEATHER_CONDITIONS[point.y!].name
          }</b><br/>`;
        });

        return tooltip;
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
