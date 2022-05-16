const user = require('./../controllers/user.controller');
const router = require('express').Router();

router.get('/', user.getAll);
router.get('/:id', user.get);
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
router.delete('/:id', user.delete);
router.delete('/', user.deleteAll);

module.exports = router;