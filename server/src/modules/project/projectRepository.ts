import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export type Project = {
  id: number;
  name: string;
  url: string;
  image: string;
  tech: string;
  context: string;
};

class ProjectRepository {
  // The C of CRUD - Create operation

  async create(project: Omit<Project, "id">) {
    // Execute the SQL INSERT query to add a new project to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into project (name, url, image, tech, context) values (?, ?, ?, ?, ?)",
      [project.name, project.url, project.image, project.tech, project.context],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from project where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Project;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from project");

    // Return the array of items
    return rows as Project[];
  }

  // The U of CRUD - Update operation
  async update(project: Project) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update project set name = ?, url = ?, image = ?, tech = ?, context =? where id = ?",
      [
        project.name,
        project.url,
        project.image,
        project.tech,
        project.context,
        project.id,
      ],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from project where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProjectRepository();
