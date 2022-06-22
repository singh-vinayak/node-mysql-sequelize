const project = require('./../controllers/project.controller');
const router = require('express').Router();
router.get('/', project.getAll);
router.get('/:id', project.get);
router.post('/', project.createProject);
router.put('/:id', project.updateProject);
router.delete('/:id', project.delete);
router.delete('/', project.deleteAll);
module.exports = router;