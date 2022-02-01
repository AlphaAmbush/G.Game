import React from 'react';
import urlGenerator from './UrlGenerator'
import { useFetch } from './useFetch'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFilter} from 'react-icons/fa'
import Row from './Row'
import HeaderTotals from './HeaderTotal'

const Table = ({colNames,dateRange}) => {
  const [loading, setLoading] = React.useState(true);
  let url = urlGenerator(dateRange)
  let data = (useFetch(url))
  let appData = (useFetch('http://go-dev.greedygame.com/v3/dummy/apps'))
  let visibleColumn = []
  colNames.map((col)=>{
    if(col.visible) {
      visibleColumn.push(col.name)
    }
  })
  
  React.useEffect(()=>{
     if(data.loading==false && appData.loading == false)
     {
       setLoading(false)
     }
  },[appData,data])

  const handleSort = (i) =>{
    let attributeName = visibleColumn[i]
    alert("You have Clicked '"+ attributeName +"' column ,sorry 'Sorting' not working yet ")
  }

  if(!loading){
    return (
    <table className="table table-bordered" style={{marginTop:'50px', textAlign:'center'}}>
      
      <thead>
        <tr>
        {visibleColumn.map((col,index)=>{
          return(
            <th scope="col" key={index} onClick={()=>handleSort(index)}><FaFilter/></th>
        )})}
        </tr>
        <tr >
        {visibleColumn.map((col,index)=>{
          return(
             <th scope="col" key={index}>{col}</th>
        )})}
        </tr>
        <tr>
        {visibleColumn.map((col,index)=>{
          return(
           <HeaderTotals key={index} col = {col} repData = {data.products.data} />
        )})}
        </tr>
     </thead>
      <tbody>
            {data.products.data.map((dataPoint,index)=>{
              return(
                <tr> <Row key={index} col = {visibleColumn}  repData = {dataPoint} appData = {appData.products.data}/></tr>
            )})}
      </tbody>
    </table>)
  }
  return <></>
};

export default Table;
