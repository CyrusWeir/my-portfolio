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

export default router;
