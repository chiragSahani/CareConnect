const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require("./models");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

const startServer = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced!");
    if (process.env.NODE_ENV !== 'production') {
      require('./seed');
    }
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
