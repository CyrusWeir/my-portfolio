import type { RequestHandler } from "express";
import type { Project } from "./projectRepository";

// Import access to data
import projectRepository from "./projectRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all projects
    const projects = await projectRepository.readAll();

    // Respond with the projects in JSON format
    res.json(projects);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific project based on the provided ID
    const projectId = Number(req.params.id);
    const project = await projectRepository.read(projectId);

    // If the project is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the project in JSON format
    if (project == null) {
      res.sendStatus(404);
    } else {
      res.json(project);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//The E of BREAD - Edit(update)
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific project based on the provided ID
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
      url: req.body.url,
      image: req.body.image,
      tech: req.body.tech,
      context: req.body.context,
    };

    const affectedRows = await projectRepository.update(category);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.send("successfully changed");
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the project data from the request body
    const newProject: Omit<Project, "id"> = {
      name: req.body.name,
      url: req.body.url,
      image: req.body.image,
      tech: req.body.tech,
      context: req.body.context,
    };

    // Create the project
    const insertId = await projectRepository.create(newProject);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//The D of BREAD - Destroy (delete)
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific project based on the provided ID
    const projectId = Number(req.params.id);

    await projectRepository.delete(projectId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
