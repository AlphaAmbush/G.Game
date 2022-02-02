import React from 'react';
import {useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateComponent = ({dateCallback}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  
    useEffect(()=>{
      if(endDate!=null){
         dateCallback(dateRange)
      }
    }, [endDate])
    
  return(
      <DatePicker 
      selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="MMM d , yy"
        placeholderText='Select Start and End Date'
      ><h3>Select start and end date</h3></DatePicker>
  )
};

export default DateComponent;
