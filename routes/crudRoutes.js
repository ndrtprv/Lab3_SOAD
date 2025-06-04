const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo.js');
const parseXmlAsync = require('../utils/xmlParser.js');

// GET all
router.get('/tasks', async (req, res) => {
    const tasks = await Todo.find();
    res.formatResponse(tasks);
});

// GET one
router.get('/tasks/:id', async (req, res) => {
    const task = await Todo.findById(req.params.id);
    if (!task) return res.status(404).send("Not found");
    res.formatResponse(task);
});

// POST
router.post('/tasks', async (req, res) => {
    let taskData;
    if (req.is('application/xml')) {
        try {
            const parsed = await parseXmlAsync(req.body);
            taskData = parsed.task;
        } catch {
            return res.status(400).send("Invalid XML");
        }
    } else {
        taskData = req.body;
    }

    try {
        const newTask = await Todo.create(taskData);
        res.status(201);
        res.formatResponse(newTask);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT
router.put('/tasks/:id', async (req, res) => {
    let data;
    if (req.is('application/xml')) {
        try {
            const parsed = await parseXmlAsync(req.body);
            data = parsed.task;
        } catch {
            return res.status(400).send("Invalid XML");
        }
    } else {
        data = req.body;
    }

    try {
        const updated = await Todo.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!updated) return res.status(404).send("Not found");
        res.formatResponse(updated);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// DELETE
router.delete('/tasks/:id', async (req, res) => {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Not found");
    res.status(204).send();
});

module.exports = router;