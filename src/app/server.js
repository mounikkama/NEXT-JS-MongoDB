// src/app/server.js

import express from 'express';
import middleware from './middleware';
import routes from './routes';

const app = express();

app.use(middleware);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
