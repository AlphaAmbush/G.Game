import React from 'react';
import refactoredData from './refactoredData'
const Row = ({col,repData,appData}) => {
  const cellData = []
  col.map((column)=>{
    cellData.push(refactoredData(column,repData,appData))
  })
  
  return (
      cellData.map((item,index)=>{

        return(
          <th scope="col" key={index}>{item}</th>
        )
      })
  )
};

export default Row;
