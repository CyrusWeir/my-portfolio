import type { RequestHandler } from "express";
interface message {
  id: number;
  user_name: string;
  email: string;
  message: string;
}

// Import access to data
import messageRepository from "./messageRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all messages
    const messages = await messageRepository.readAll();

    // Respond with the messages in JSON format
    res.json(messages);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific project based on the provided ID
    const messageId = Number(req.params.id);
    const message = await messageRepository.read(messageId);

    // If the message is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the message in JSON format
    if (message == null) {
      res.sendStatus(404);
    } else {
      res.json(message);
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
    const message = {
      id: Number(req.params.id),
      user_name: req.body.user_name,
      email: req.body.email,
      message: req.body.message,
    };

    const affectedRows = await messageRepository.update(message);

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
    const newMessage: Omit<message, "id"> = {
      user_name: req.body.user_name,
      email: req.body.email,
      message: req.body.message,
    };

    // Create the Message
    const insertId = await messageRepository.create(newMessage);

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
    const messageId = Number(req.params.id);

    await messageRepository.delete(messageId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
