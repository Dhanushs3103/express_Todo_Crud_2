//importing the packages .
import express from "express";
import { readFileSync, writeFileSync } from "node:fs";

let app = express();
let PORT = 3000;

app.use(express.json()); // middleware

// This is for home Page,
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home page</h1>");
});

// This is an endpoint of getting data from the database[db.json] and send back as response to the client.
app.get("/get-data", (req, res) => {
  let data = readFileSync("db.json");
  // sending the response.
  res.send(data);
});

// This is an endpoint of adding(POST) data to the data base.
app.post("/add-data", (req, res) => {
  let currentData = JSON.parse(readFileSync("db.json")); // retrieving data form db.json file.
  let userData = req.body; // user data form post request.
  // adding new data to current data.
  currentData.todos.push(userData);
  // updating the db.json file with new data.
  writeFileSync("db.json", JSON.stringify(currentData, null, 2), "utf8");
  // sending the response.
  res.send(`Data added successfully ${userData}`);
});

// This is an endpoint of updating(POST) data based on the below conditions.
app.patch("/update-even-todos", (req, res) => {
  let currentData = JSON.parse(readFileSync("db.json")); // retrieving data form db.json file.
  currentData.todos.forEach((todo) => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  // updating the db.json file with new data.
  writeFileSync("db.json", JSON.stringify(currentData, null, 2), "utf8");
  // sending the response.
  res.send(`Data Updated successfully ${currentData}`);
});

// This is an endpoint to delete specific todo if its status is true
app.delete("/delete-completed-todo" ,(req,res)=>{
   let currentData = JSON.parse(readFileSync("db.json")); // retrieving data form db.json file.

   // Filtering out completed todos.
   let incompleteTodos = currentData.todos.filter((todo)=> !todo.status);

   // Update currentData with incomplete todos
   currentData.todos = incompleteTodos;
   
   // updating the db.json file with new data
   writeFileSync("db.json", JSON.stringify(currentData, null, 2), "utf8");

   // sending the response.
   res.send(`Data Updated successfully ${currentData}`);

})

// Server is listening at port 3000.
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
