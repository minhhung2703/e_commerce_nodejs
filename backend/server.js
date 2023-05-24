const app = require("./app");
const connectDatabase = require("./db/Database");

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log("Shutting down the server for handling server for handling uncaught exception");
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//connect db
connectDatabase();

//create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//unhandled promist reject
process.on("unhandleRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(() => {
        process.exit(1);
    })
});