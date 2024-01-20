import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Refer the high charts "https://github.com/highcharts/highcharts-react" for more information

const StarBarCharts = (props) => {
  const config = {
    chart: {
      type: "column",
    },
    title: {
      text: props.title,
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "9px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Stars",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Stars: <b>{point.y} </b>",
    },
    series: [
      {
        name: props.title,
        data: props.data,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#947878",
          align: "right",
          format: "{point.y}", 
          y: 10, 
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  };
  return (
    <div>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={config}
        ></HighchartsReact>
      </div>
    </div>
  );
};

export default StarBarCharts;
