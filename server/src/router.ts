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

export default router;
