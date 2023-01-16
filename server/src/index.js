
import mongoose from 'mongoose'
import app from './router'

import { config } from '../_config/config'

// // Connection URL
mongoose.set("strictQuery", false);
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology : true }).then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log("Unable to connect to db server - (error) - " + error);
});

//  starting a server
app.listen(config.port, "0.0.0.0", (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})




