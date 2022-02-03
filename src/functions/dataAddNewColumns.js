

const dataAddNewColumns = (data,appData) => {
  if(data.loading==false && appData.loading == false)
  {    
    let value = null
    const checkApp = (id)=>{
      let returnValue = null
      for (let i=0; i<appData.products.data.length; i++)
      {
        if(appData.products.data[i].app_id==id)
        {
          returnValue = appData.products.data[i].app_name
        
          break;
        }
      }
        return returnValue
          
      }

    data.products.data.map((dataPoint)=>{
      value = ((dataPoint.requests/dataPoint.responses)*100);
      dataPoint.fill_rate = value;
      value = ((dataPoint.clicks/dataPoint.impressions)*100);
      dataPoint.ctr = value;
      value = checkApp(dataPoint.app_id)
      dataPoint.app_name = value
    })}
};

export default dataAddNewColumns;
