import React,{Component} from 'react';
import AuthContext from "../context/auth-context";
import {Card , Button} from "react-bootstrap";
import BookingList from "../components/Bookings/BookingList/BookingList"


export default class BookingPage extends Component{
    state = {
        isLoading : false,
        bookings : []
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchBookings();
      }
    
      fetchBookings = () => {
        this.setState({ isLoading: true });
        const requestBody = {
          query: `
              query {
                bookings {
                  _id
                 event {
                   _id
                   title
                   price
                   description
                 }
                }
              }
            `
        };
    
        fetch('http://localhost:5000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.context.token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            const bookings = resData.data.bookings;
            this.setState({ bookings: bookings, isLoading: false });
          })
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      };

      //CancelBooking
      deleteBookingHandler = bookingId =>{
        this.setState({ isLoading: true });
        //Alternate method for Injection.
        const requestBody = {
          query: `
              mutation CancelBooking($id:ID!) {
                cancelBooking(bookingId : $id) {
                  _id
                  title
                }
              }
            `,
            variables:{
              id : bookingId
            }
        };
    
        fetch('http://localhost:5000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.context.token
          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            this.setState(prevState => {
              const updatedBookings = prevState.bookings.filter(booking => {
                return booking._id !== bookingId;
              });
              return { bookings: updatedBookings, isLoading: false };
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      }
    
    render(){
        return(
            <React.Fragment>
            <div>
            <h1>Bookings</h1>
            <h1>Your bookings are listed below</h1>
            {/* <ul>
            {this.state.bookings.map(booking => (
             <Card style={{ width: '18rem' }} key={booking._id} id="card">
             <Card.Body>
             <Card.Title id="card-title">{booking.event.title}</Card.Title>
             <Card.Text>
             {booking.event.description}
             </Card.Text>
            <Button variant="primary">₹{booking.event.price}</Button>
            </Card.Body>
            </Card>
            )
            )}
            </ul> */}
            <BookingList bookings={this.state.bookings} onDelete={this.deleteBookingHandler}/>
            </div>
            </React.Fragment>
            );
    }
}