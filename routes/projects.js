const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.get('/projects', projectsController.getAllProjects);
router.get('/projects/:id', projectsController.getProjectById);
router.post('/projects', projectsController.createProject);
router.put('/projects/:id', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);

module.exports = router;