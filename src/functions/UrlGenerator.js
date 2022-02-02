

export default function urlGenerator  (dateRange)  {
  let startDate = ( "startDate="+
    dateRange[0].getFullYear() +"-"+
    ('0' + (dateRange[0].getMonth()+1)).slice(-2) +"-"+
    ('0' + dateRange[0].getDate()).slice(-2)
  )
  let endDate = ( "endDate="+
    dateRange[1].getFullYear() +"-"+
    ('0' + (dateRange[1].getMonth()+1)).slice(-2) +"-"+
    ('0' + dateRange[1].getDate()).slice(-2)
  )
  let reportURL = "https://go-dev.greedygame.com/v3/dummy/report?"+startDate+"&"+endDate

  return reportURL
};



