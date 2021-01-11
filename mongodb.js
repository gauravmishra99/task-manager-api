// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Alankrit",
    //     age: 20,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    //   db.collection("users").insertMany(
    //     [
    //       {
    //         name: "Jon",
    //         age: 20,
    //       },
    //       {
    //         name: "Gunther",
    //         age: 27,
    //       },
    //     ],
    //     (error, result) => {
    //       if (error) {
    //         return console.log("Unable to insert documents");
    //       }

    //       console.log(result.ops);
    //     }
    //   );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Complete task",
    //       completed: false,
    //     },
    //     {
    //       description: "Watch Suits",
    //       completed: false,
    //     },
    //     {
    //       description: "Apply for internship",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne(
    //   { _id: new ObjectID("5fb778c133890037a8fbe4ee") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 20 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });
    // db.collection("users")
    //   .find({ age: 20 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("5fb77a436f8e1b38c67073ba") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     console.log(tasks);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5fb6b46ccd4b19375b40cc26"),
    //     },
    //     {
    //       // $set: {
    //       //   name: "Goku",
    //       // },
    //       $inc:{
    //         age: 1
    //       }
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .deleteMany({
    //     age: 20,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    db.collection("tasks")
      .deleteOne({
        description: "Watch Suits",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
