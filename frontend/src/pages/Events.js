import React, { Component } from 'react';

import ModalPop from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from "../context/auth-context"
import './Events.css';

class EventPage extends Component {
  state = {
    creating: false,
    events: []
  };

  constructor(props)
  {
    super(props)
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount(){
    this.fetchEvents();
  }

  static contextType = AuthContext;

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;  

    if(title.trim().length===0||price<=0||date.trim().length===0||description.trim().length===0){
      return;
    }

    const event = {title:title,
                  price:price,
                  date:date,
                description:description}
    console.log(event);

   
    const requestBody = {
      query: `
      mutation {
        createEvent(eventInput: { title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
          _id
          title
          description
          price
          creator {
            _id
            email
          }
        }
      }
    `
    };
    const token = this.context.token;

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization :'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.fetchEvents();
        // if(resData.data.login.token)
        // {
        //   this.context.login(
        //     resData.data.login.token,
        //     resData.data.login.userId,
        //     resData.data.login.tokenExpiration
            
        //   )
        // }
      })
      .catch(err => {
        console.log(err);
      });


  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };


  fetchEvents(){
    const requestBody = {
      query: `
      query {
        events {
          _id
          title
          description
          price
          creator {
            _id
            email
          }
        }
      }
    `
    };
    
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const events = resData.data.events;
        this.setState({ events: events });
      })
      .catch(err => {
        console.log(err);
      });
  }



  render() {
    const eventList = this.state.events.map(event => {
      return (    
        <>
        <li key={event._id} className="events__list-item">
          <em><b>Title:</b></em>{event.title}
          <li key={event._id} className="events__list-item">
            <em><b>Description:</b></em>{event.description}
          </li>
        </li>
      </>

      );
    });

    return (
      <React.Fragment>  
      <div className = "event-main">
        {this.state.creating && <Backdrop />}
        
        {this.state.creating && (
          <ModalPop
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Modal Content</p>
            <form>
            <div className="event-form  ">
              
              <div className = "">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef}/>
              </div>

              <div className = "">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef}/>
              </div>

              <div className = "">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef}/>
              </div>

              <div className ="">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4" ref={this.descriptionElRef}/>
              </div>
            </div>

            </form>
          </ModalPop>
          
        )}
        
        {this.context.token&&(
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
        </div>
        )}

      <ul className="events__list">{eventList}</ul>
      </div>
      </React.Fragment>
    );
  }
}

export default EventPage;