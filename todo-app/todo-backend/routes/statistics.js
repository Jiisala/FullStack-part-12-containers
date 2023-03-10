const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET STATISTICS */
router.get('/', async (_, res) => {
    const added_todos = await redis.getAsync("added_todos")
    added_todos ? res.json({added_todos: Number(added_todos)}) : res.json({added_todos: 0})
})

module.exports = router;