import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define project-related routes
import projectActions from "./modules/project/projectActions";

router.get("/api/project", projectActions.browse);
router.get("/api/project/:id", projectActions.read);
router.put("/api/project/edit/:id", projectActions.edit);
router.post("/api/project", projectActions.add);
router.delete("/api/project/delete/:id", projectActions.destroy);

/* ************************************************************************* */

import messageActions from "./modules/message/messageActions";

router.get("/api/message", messageActions.browse);
router.get("/api/message/:id", messageActions.read);
router.put("/api/message/edit/:id", messageActions.edit);
router.post("/api/message", messageActions.add);
router.delete("/api/message/delete/:id", messageActions.destroy);

import userActions from "./modules/users/userActions";
router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.put("/api/user/edit/:id", userActions.edit);
router.post("/api/user", userActions.hashPassword, userActions.add);
router.delete("/api/user/delete/:id", userActions.destroy);

export default router;
