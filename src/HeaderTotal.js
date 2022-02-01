import React from 'react';

const HeaderTotal = ({col,repData}) => {
    function numFormatter (labelValue) {

    // Nine Zeroes for Billions
    return (Math.abs(Number(labelValue)) >= 1.0e+9)

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : (Math.abs(Number(labelValue)));

}

    let cell = null
    let data1=0;
    let data2=0;

    switch (col) {
        case 'Date':
            cell =repData.length
            break;
        case 'App Name':
            cell =repData.length
            break;
        case 'AD Request':
            cell = 0;
             repData.map((item)=>{
                 cell = cell+ item.requests
             })
             cell = numFormatter(cell)
            break;
        case 'AD Response':
            cell = 0;
             repData.map((item)=>{
                 cell = cell+ item.responses
             })
             cell = numFormatter(cell)
            break;
        case 'Impression':
            cell = 0;
            repData.map((item)=>{
                 cell = cell+ item.impressions
             })
             cell = numFormatter(cell)
            break;
        case 'Clicks':
            cell = 0;
             repData.map((item)=>{
                 cell = cell+ item.clicks
             })
             cell = numFormatter(cell)
            break;
        case 'Revenue':
            cell = 0;
             repData.map((item)=>{
                 cell = cell+ item.revenue
             })
           
                 cell ="$" + (numFormatter(cell))

        break;
        case 'Fill Rate':
             data1 = 0;
              data2 = 0;
             repData.map((item)=>{
                 data1 =data1 + item.requests
                 data2 =data2 + item.responses
             })
             cell = ((data1/data2)*100).toFixed(2)+"%"
        break;
        case 'CTR':
              data1 = 0;
              data2 = 0;
             repData.map((item)=>{
                 data1 =data1 + item.clicks
                 data2 =data2 + item.impressions
             })
             cell = ((data1/data2)*100).toFixed(2)+"%"
        break;
    }

    return <th scope="col" >{cell}</th>
};

export default HeaderTotal;
