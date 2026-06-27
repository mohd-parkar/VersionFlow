const express = require("express");
const repoController = require("../controllers/repo.controller");

const router = express.Router();

router.post("/repo/create", repoController.createRepository);
router.get("/repo/all", repoController.getAllRepositories);
router.get("/repo/:id", repoController.fetchRepositoryById);
router.get("/repo/:name", repoController.fetchRepositoryByName);
router.get("/repo/:userID", repoController.fetchRepositoryForCurrentUser);
router.put("/repo/update/:id", repoController.updateRepositoryById);
router.delete("/repo/delete/:id", repoController.deleteRepositoryById);
router.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

module.exports = router;