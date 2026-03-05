const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("serverr is running on port 3000");
});
