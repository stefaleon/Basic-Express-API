// import * as path from 'path';
import express from 'express';

import connect from './connect.js';

import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/users.js';

const app = express();

app.use(express.json());

/*
Static serve a front-end client app 
*/
// app.use(express.static('./client/build'));

app.get('/api', (req, res) => {
  res.send('This is the API');
});

app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ error: 'Server Error', code: err.code, message: err.message });
});

/*
Wildcart routing for a potential front-end client app
*/
// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
// });

const listen = async () => {
  const conn = await connect(process.env.DB);
  if (conn) {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
    return;
  }
  console.log('Server did not start');
};

listen();
