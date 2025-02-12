import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Message = {
  id: number;
  user_name: string;
  email: string;
  message: string;
};

class MessageRepository {
  // The C of CRUD - Create operation

  async create(message: Omit<Message, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into message (user_name, email, message) values (?, ?, ?)",
      [message.user_name, message.email, message.message],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from message where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Message;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from message");

    // Return the array of items
    return rows as Message[];
  }

  // The U of CRUD - Update operation
  async update(message: Message) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update message set user_name = ? email = ? message = ? where id = ?",
      [message.user_name, message.email, message.message],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from message where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new MessageRepository();
