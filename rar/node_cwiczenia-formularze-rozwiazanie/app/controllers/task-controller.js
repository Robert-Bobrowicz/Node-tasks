const Task = require('../db/models/task');

class TaskController {

  async showTasks(req, res) {
    const tasks = await Task.find({});
    res.render('pages/tasks/index', { tasks });
  }

  showCreateForm(req, res) {
    res.render('pages/tasks/create');
  }

  async create(req, res) {
    // przygotuj nowy task
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    try {
      await task.save();
      res.redirect('/');
    } catch (e) {
      res.render('pages/tasks/create', {
        errors: e.errors,
        form: req.body
      });
    }
  }

  async showEditForm(req, res) {
    const task = await Task.findById(req.params.id);
    res.render('pages/tasks/edit', { form: task });
  }

  async edit(req, res) {
    const task = await Task.findById(req.params.id);
    task.title = req.body.title;
    task.description = req.body.description;

    try {
      await task.save();
      res.redirect('/');
    } catch (e) {
      res.render('pages/tasks/edit', {
        errors: e.errors,
        form: req.body
      });
    }
  }

  async delete(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.redirect('/');
    } catch (e) {
      // opcjonalnie obsłuż błąd
    }
  }

  async toggleDone(req, res) {
    // pobierz task
    const task = await Task.findById(req.params.id);
    task.done = task.done ? 0 : 1;
    await task.save();
    res.redirect('/');
  }
  
}

module.exports = new TaskController();