import React from 'react';
import urlGenerator from '../functions/UrlGenerator'
import { useFetch } from './useFetch'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFilter} from 'react-icons/fa'
import Row from './Row'
import HeaderTotals from './HeaderTotal'
import dataAddNewColumns from '../functions/dataAddNewColumns'
import {FaSearch} from 'react-icons/fa'

const Table = ({colNames,dateRange}) => {
  const [loading, setLoading] = React.useState(true);//set false after data is fetched
  let url = urlGenerator(dateRange)//simple function to add date in url
  let data = (useFetch(url))//custom hook which return loading and product
  let appData = (useFetch('https://go-dev.greedygame.com/v3/dummy/apps'))
  dataAddNewColumns(data,appData)// function to add app_name, fill rate and ctr components
  let visibleColumn = [] // data of which columns are visible
  colNames.map((col)=>{//add all visible column to above data
    if(col.visible) {
      visibleColumn.push(col)
    }
  })

  const getAttributeName=(columnName)=>{//get name of attribute related to column
    let returnVal = null
    switch(columnName){
      case 'Date': returnVal= 'date'; break;
      case 'App Name': returnVal= 'app_name'; break;
      case 'AD Request': returnVal= 'requests'; break;
      case 'AD Response': returnVal= 'responses'; break;
      case 'Impression': returnVal= 'impressions'; break;
      case 'Clicks': returnVal= 'clicks'; break;
      case 'Revenue': returnVal= 'revenue'; break;
      case 'Fill Rate': returnVal= 'fill_rate'; break;
      case 'CTR': returnVal= 'ctr'; break;
    }
    return returnVal;
  }

  
  React.useEffect(()=>{
    if(data.loading==false && appData.loading == false) // if custom hook has returned true loading means data is fetched so setloading to false
    {
      
      setLoading(false)
    }
  },[appData,data])


  const handleSort = (i,e) =>{
    setLoading(true)

    const sort_by = (field, reverse, primer) => {
      const key = primer ?
        function(x) {
          return primer(x[field]);
        } :
        function(x) {
          return x[field];
        };
      reverse = !reverse ? 1 : -1;
      return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      };
    };
    
    let columnName = visibleColumn[i].name
    let attributeName = getAttributeName(columnName)
    data.products.data.sort(sort_by(attributeName, visibleColumn[i].sorted));
    visibleColumn[i].sorted = !visibleColumn[i].sorted
    setLoading(true)
  }

  if(!loading){
    return (
    <table className="table table-bordered" style={{marginTop:'50px', textAlign:'center'}}>
      
      <thead>
        <tr>
        {visibleColumn.map((col,index)=>{
          return(
            <th scope="col" key={index}  onClick={(e)=>handleSort(index,e)}><FaFilter/></th>
        )})}
        </tr>
        <tr >
        {visibleColumn.map((col,index)=>{
          return(<>
              <th scope="col"  key={index}>{col.name}</th>
             </>
        )})}
        </tr>
        <tr>
        {visibleColumn.map((col,index)=>{
          return(
           <HeaderTotals key={index} col = {col.name} repData = {data.products.data} />
        )})}
        </tr>
     </thead>
      <tbody>
            {data.products.data.map((dataPoint,index)=>{
              return(
                <tr> <Row key={index} col = {visibleColumn}  repData = {dataPoint} /></tr>
            )})}
      </tbody>
    </table>)
  }else if(loading){
   return(
    <div style={{width: '100%', height: '500px', border: '1px dotted black', textAlign: 'center'}}>
        <h1>LOADING...</h1>
      </div>
    )
  }
  return null
};

export default Table;
