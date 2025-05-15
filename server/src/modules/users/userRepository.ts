import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type User = {
  id: number;
  email: string;
  password: string;
};

class UserRepository {
  // The C of CRUD - Create operation
  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, password) values (?, ?)",
      [user.email, user.password],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select email from user");

    // Return the array of items
    return rows as User[];
  }
  // The U of CRUD - Update operation
  async update(user: User) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update user set email = ?, password = ? where id = ?",
      [user.email, user.password, user.id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to delete a specific item by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

export default new UserRepository();
