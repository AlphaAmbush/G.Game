import React from 'react';
import {useState, useContext, useEffect,Suspense} from 'react'
import DateComponent from './DateComponent'
import Settings from './Settings'
import ColNames from './ColumnNames'
import Table from './Table'


function App() {
  const [showSetting, setShowSetting] = useState(false);
  const [colNames, setColNames] = useState(ColNames)
  const [haveDateRange, setHaveDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  let recivedColNames = []

  const dateHandler = (dRange) =>{
   setDateRange(dRange)
   setHaveDateRange(true)
  }
  
  const colNameHandler = (items) => {
    recivedColNames = items
  }
  const cancelHandler = () =>{
    setShowSetting(!showSetting)
    
  }
  const applyHandler = () =>{
    setColNames(recivedColNames)
    setShowSetting(!showSetting)
  }
  
  return <>
    <div className="container">
      <h2>Analytics</h2>
      <div className="upperComponents">
        <DateComponent dateCallback = {dateHandler}/>
        <button onClick={() => setShowSetting(!showSetting)}>Settings</button>
      </div>
      {showSetting && <>
      <Settings colNameHandler = {colNameHandler} colNames = {colNames}/>
        <button onClick={()=>cancelHandler()}>Cancel</button>
        <button onClick={()=>applyHandler()}>Apply Changes</button>
      </>
      }
      
      {haveDateRange?<Table colNames = {colNames} dateRange = {dateRange}/>:""}
    </div>
  </>
}

export default App;
