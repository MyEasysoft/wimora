import React from "react";
import "./styles.css";
import { Bar, char } from "react-chartjs-2";

const data = {
  labels: ["Gigs", "Completed","Pending"],
  previousDate: {
    label: "08/10/2019 - 09/30/2019",
    dataSet: [20000, 15000, 10000, 50]
  },
  currentDate: {
    label: "10/01/2019 - 11/20/2019",
    dataSet: [10000, 5000, 2000, 100]
  },
  currentLost: {
    label: "10/01/2019 - 11/20/2019",
    dataSet: [5000, 2000, 500, 100]
  }
};

export default function BarChart2() {
  return (
    <div className="App">
      <Bar
        pointStyle="star"
        data={{
          labels: data.labels,
          responsive: true,
          offset: true,
          datasets: [
            {
              label: "Gigs",
              pointStyle: "rectRounded",
              backgroundColor: "#6ED3FF",
              barThickness: 40,
              categoryPercentage: 1,
              data: data.previousDate.dataSet //From API
            },
            {
              label: "Profit",
              backgroundColor: "#1497FF",
              barThickness: 40,
              categoryPercentage: 1,
              
              data: data.currentDate.dataSet //From API
            },
            {
                label: "Lost",
                backgroundColor: "#d40000",
                barThickness: 40,
                categoryPercentage: 1,
                
                data: data.currentLost.dataSet //From API
              }
          ]
        }}
        height={381}
        options={{
          offsetGridLines: true,
          drawTicks: true,
          layout: {
            padding: {
              top: 30,
              right: 40,
              bottom: 40
            }
          },
          legend: {
            display: true,
            position: "right",
            align: "start",
            labels: {
              usePointStyle: true
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  padding: 5
                },
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                stacked: false,
                gridLines: {
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true,
                  maxTicksLimit: 6,
                  padding: 20,
                  callback(n) {
                    if (n < 1e3) return n;
                    if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                  }
                }
              }
            ]
          }
        }}
      />
    </div>
  );
}
