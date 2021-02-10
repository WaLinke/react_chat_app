const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("Connexion Established [mongoDB]");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connection Reestablished [mongoDB]");
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected [mongoDB]");
});

mongoose.connection.on("close", () => {
  console.log("Connection Closed [mongoDB]");
});

mongoose.connection.on("error", (error) => {
  console.log("ERROR: " + error);
});

const mongooseConnexion = async () => {
  await mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

mongooseConnexion().catch((error) => console.error(error));

module.exports = mongooseConnexion;