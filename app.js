const express = require("express");
const cors = require("cors");
const toysRoutes = require("./routes/toys.routes");
const usersRoutes = require("./routes/users.routes");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// { origin: ['http://127.0.0.1:5500/', 'http://127.0.0.1:5501/'] }
app.use(cors());

app.use("/api/v1/toys", toysRoutes);
app.use("/api/v1/users", usersRoutes);

// app.get("/test", (req, res) => {
//     res.json({ msg: "works properly" });
// });

/* Global error handler */
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(400).send({ msg: error.message });
});


module.exports.app = app;