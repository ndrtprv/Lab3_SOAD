const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/crudRoutes.js');
const formatResponseMiddleware = require('./middleware/formatResponse.js');
const connectDB = require('./db/connection.js');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
connectDB(); // Підключення до MongoDB

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/xml' }));

app.use(formatResponseMiddleware); // Визначення бажаного формату
app.use(routes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});