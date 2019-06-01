const express = require('express');
const path = require('path');

const cors = require('cors');
require('dotenv').config();

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
//const isAuth = require('./middleware/is-auth');


//config
const APP_PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

//app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true,
  //context: isAuth

}));


// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/src/'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/src/', 'index.html'));
});


app.listen(APP_PORT, ()=>{
  console.log(`App listening on port ${APP_PORT}`);
});
