export default function refactoredData(col,data,appdata){
   var cell = null

    const checkApp = (id)=>{
        let returnValue = null
        appdata.map((app)=>{
            if(app.app_id==id)
            {
                returnValue = app.app_name
            }
        })
        return returnValue
    }
    switch (col) {
      case 'Date':
          let date = new Date(data.date)
            cell = ( new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "2-digit"
            }).format(date))
        break;
      case 'App Name':
            cell = checkApp(data.app_id)
        break;
      case 'AD Request':
            cell = (new Intl.NumberFormat('en-IN',{
            }).format(data.requests))
        break;
      case 'AD Response':
            cell = (new Intl.NumberFormat('en-IN',{
            }).format(data.responses))
        break;
      case 'Impression':
            cell = (new Intl.NumberFormat('en-IN',{
            }).format(data.impressions))
        break;
      case 'Clicks':
            cell = (new Intl.NumberFormat('en-IN',{
            }).format(data.clicks))
        break;
      case 'Revenue':
            cell = (new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0, 
            maximumFractionDigits: 2, 
            }).format(data.revenue))
        break;
      case 'Fill Rate':
             cell = ((data.requests/data.responses)*100).toFixed(2)+"%";
      break;
      case 'CTR':
           cell = ((data.clicks/data.impressions)*100).toFixed(2)+"%";
      break;
    }
    
return cell;
}