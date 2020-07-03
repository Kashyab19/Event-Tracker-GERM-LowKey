const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');
const {buildSchema} = require('graphql');

//Object for express
const app = express();

app.use(
    bodyParser.json()
)

app.use(
    '/apigraphql',
    graphQLHttp({
        schema:buildSchema(`
            type rootQuery{
                events : [String!]!
            }
            
            type rootMutation{
                createEvent(name:String) : String
            }
            schema{
                query:rootQuery
                mutation:rootMutation
                }

        `),
        rootValue:{
            events :() => {
                return ['String 1','String 2','String 3']
            },
            createEvent: (args) => {
                //the args.name is the name at the top of the createEventf
                const eventName =  args.name;
                return eventName;
            } 
        },
        graphiql:true
    })
);//end of app.use('/graphql'..)

app.listen(5000,() => console.log(`Connected on 5000,right now`))