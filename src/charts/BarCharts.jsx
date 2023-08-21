import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2017", 500, 450, 200],
    ["2018", 700, 300, 200],
    ["2019", 1000, 400, 200],
    ["2020", 1270, 460, 250],
    ["2021", 660, 1120, 300],
    ["2022", 1030, 540, 350],
];

export const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2017-2022",
    },
};

const BarCharts = () => {
    return (
        <Chart
            chartType='Bar'
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default BarCharts