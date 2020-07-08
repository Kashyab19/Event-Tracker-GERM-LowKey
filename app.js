const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const mongoose = require('mongoose');
const app = express();

const graphQLSchema = require("./graphql/schema/index")
const graphQLResolvers = require("./graphql/resolvers/index")

const bcrpyt = require('bcryptjs')
const isAuth =require("./middleware/isAuth")

//runs on every incoming request
app.use(isAuth)

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-wd6ik.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ,{ useNewUrlParser: true, useUnifiedTopology: true}).then(
        () =>{
        app.listen(5000,()=>{console.log("5000/graphql in local")});   
        }
    ).catch(err => {
        console.log(err);
    });

