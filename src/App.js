import React from 'react';
import {useState, useContext, useEffect,Suspense} from 'react'
import DateComponent from './components/DateComponent'
import Settings from './components/Settings'
import ColNames from './data/ColumnNames'
import Table from './components/Table'


function App() {

  const [showSetting, setShowSetting] = useState(false);//display or hide setting
  const [colNames, setColNames] = useState(ColNames)//for updating position or visibility of column names
  const [haveDateRange, setHaveDateRange] = useState(false);//to check if we have date range
  const [dateRange, setDateRange] = useState(false);
  let recivedColNames = []//to change column names after apply is clicked

  const dateHandler = (dRange) =>{//callback to get date range
   setDateRange(dRange)
   setHaveDateRange(true)
  }
  
  const colNameHandler = (items) => {//callback to get column Names
    recivedColNames = items
  }
  const cancelHandler = () =>{ //cancel button
    setShowSetting(!showSetting)
  }
  const applyHandler = () =>{//apply column configuration
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
