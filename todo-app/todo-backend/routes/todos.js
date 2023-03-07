const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo) // Implement this: DONE
});

/* PUT todo. */ 
singleRouter.put('/:id?', async (req, res) => {
  try {
    const updated = await Todo.updateOne(
      { _id: req.todo._id },
      {
        $set: {
          text: req.body.text,
          done: req.body.done,
        },
      }
    )
    res.status(201).json({
      message: "updating succesfull",
      updated, 
    })  
  } catch (e){
    res.status(400).json({ error: e})
  }
    }); // Implement this: DONE, note to self, might be a good idea to revisit the using mongo part of the course 

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
