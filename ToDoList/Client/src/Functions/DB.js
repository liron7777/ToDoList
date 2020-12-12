const MongoClient = require("mongodb"),
  url = "mongodb://localhost:27017";

async function connect_todo_list_db(collection) {
  var data_todo_list = MongoClient.connect(url).then((data) => {
    return data.db("ToDoList").collection(collection);
  });
  return await data_todo_list;
}

async function add_to_db(collection, user) {
  (await connect_todo_list_db(collection)).insertOne(user);
}

async function find(collection, item) {
  return (await connect_todo_list_db(collection)).find(item).toArray();
}

async function update(task_id, new_value) {
  console.log("new_value", new_value);

  (await connect_todo_list_db("Tasks")).update(
    { task_id: task_id },
    { $set: { status: new_value } }
  );
}

async function delete_task(task_id) {
  return (await connect_todo_list_db("Tasks")).remove({
    task_id: `${task_id}`,
  });
}

module.exports = {
  add_to_db,
  find,
  update,
  delete_task,
};
