import argon2 from "argon2";
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific user based on the provided ID
    const user = {
      id: Number(req.params.id),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const affectedRows = await userRepository.update(user);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Create a new user based on the request body
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    // Insert the new user into the database
    const userId = await userRepository.create(user);

    // Respond with the ID of the newly created user
    res.status(201).json({ id: userId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific user based on the provided ID
    const userId = Number(req.params.id);
    const affectedRows = await userRepository.delete(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);

    req.body.password = hashedPassword;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

export default {
  browse,
  read,
  edit,
  add,
  destroy,
  hashPassword,
};
