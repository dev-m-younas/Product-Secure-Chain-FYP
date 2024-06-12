const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;

connectToMongo();

app.use(cors())
app.use(express.json());

app.use('/api' , require('./routes/productinfo'));

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost ${PORT}`);
});
