require("dotenv").config({ path: __dirname + "/.env" });

const connectDB = require("./src/config/db");
const app = require("./src/app");

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
