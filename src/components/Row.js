import React from 'react';
import refactoredData from '../functions/refactoredData'
const Row = ({col,repData}) => {
  const cellData = []
  col.map((column)=>{
    cellData.push(refactoredData(column.name,repData))
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
