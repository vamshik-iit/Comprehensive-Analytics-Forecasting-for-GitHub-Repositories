import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const StackBar = (props,props2) => {
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
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Issues",
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    tooltip: {
      pointFormat: "Issues: <b>{point.y} </b>",
    },
    series: [
      {
        name: "Issues Created",
        data: props.data,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#c2a7a7",
          align: "right",
          format: "{point.y}", 
          y: 10, 
          style: {
            fontSize: "14px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },

      {
        name: "Issues Closed",
        data: props.data2,
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

export default StackBar;
