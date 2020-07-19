import React from 'react';
import {Card, Button} from "react-bootstrap";
import "./BookingList.css"

const bookingList = props =>(
    <ul className="bookings__list">
        {
            props.bookings.map(booking=>{
                return(
                    <li className="bookings__item" key={booking._id}>
                        <div className="bookings__item-data">{booking.event.title}</div>
                        <div className="bookings__item-actions"><Button onClick={props.onDelete.bind(this,booking._id)}>Cancel</Button></div>
                    </li>
                    ); //end of return
                
            })
        }
    </ul>   
)

export default bookingList;