const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
//const admin = require('firebase-admin'); // uncomment to use Firebase
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));

// Firebase starter code appears below

// let serviceAccount = require('[YOUR JSON FILE PATH HERE]');
// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount)
// });
// let db = admin.firestore();


const cities = ["Fairfax", "Vienna", "Falls Church", "Arlington"];

const populations = [24019, 16489, 14128, 236842];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cities', async (req, res) => {

  try {
    const result = await fetch('https://services.arcgis.com/neT9SoYxizqTHZPH/arcgis/rest/services/STAR_Scores/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    res.status(200).json({
      status: 'success',
      result:result
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    })
  }

  res.send('data success')
  // return res.json(cities)
})

app.get('/populations', (req, res) => {
  return res.json(populations)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;