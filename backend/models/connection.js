const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://adrienneyron:NvCbiCfjkZBGkD9v@cluster0.5ppkfxj.mongodb.net/collectivites';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch (error => console.error(error));