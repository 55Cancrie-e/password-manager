const express = require('express');
const { getLists, createList, updateList, deleteList } = require('../controllers/listsController');

const router = express.Router();


router.get('/', getLists);

router.post('/', createList);

router.patch('/:id', updateList)

router.delete('/:id', deleteList)

module.exports = {
    listRouter: router
}