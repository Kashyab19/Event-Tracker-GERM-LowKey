import React from 'react';
import {Bar as  BarChart} from 'react-chartjs'

//Why is the key w/o Single Quotes??
const BOOKING_BUCKETS={
    Cheap:{min:0,max:200},
    Normal:{min:201,max:500},
    Expensive:{min:501,max:1000}
}
const bookingChart = (props) =>{
    const chartData = { labels: [], datasets: [] };
    let values = [];
    for(const  bucket in BOOKING_BUCKETS){
        const filteredBookingsCount = props.bookings.reduce(
            (prev,current)=>{
            if( current.event.price>BOOKING_BUCKETS[bucket].min && current.event.price<BOOKING_BUCKETS[bucket].max)
            {return prev + 1;}
            else
            {return prev;}
        }
        , 0);
        values.push(filteredBookingsCount);
        chartData.labels.push(bucket);
        chartData.datasets.push({
          // label: "My First dataset",
          fillColor: 'rgb(212, 81, 19)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
          data: values
        });
        values = [...values];
        values[values.length - 1] = 0;
    }
    
    
    return(
    <div>
      <BarChart data={chartData} />
    </div>
    )
}

export default bookingChart;