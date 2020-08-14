const express = require('express');
const cors = require('cors');
const app = express();
const port = (process.env.PORT || 3000);
const routes = require('./routes');
const { ErrorHandler } = require('./middlewares');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', routes);
app.use(ErrorHandler);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));