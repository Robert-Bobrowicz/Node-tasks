const chalk = require('chalk');
const Task = require('../db/models/task');

class TaskController {

  async showTasks(req, res) {
    // pobierz wszystkie taski i wyświetl na widoku
    const tasks = await Task.find({});
    res.render('pages/tasks/index', { tasks });
  }

  showCreateForm(req, res) {
    // wyświetl formularz nowego taska
    res.render('pages/tasks/create');
  }

  async create(req, res) {
    // console.log(req.body);
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      done: 0
    });
    try {
      // zapisz task i przekieruj do strony głównej
      await task.save();
      console.log(chalk.green(`nowe zadanie dodane do bazy danych: ${task.title}`));
      res.redirect('/');
    } catch (e) {
      // jeśli są błędy, wyświetl ja na widoku
      res.render('pages/tasks/create', {
        errors: e.errors,
        form: req.body
      });
    }
  }

  async showEditForm(req, res) {
    // pobierz task i wyświetl formularz edycji
    // mongoose posiada metodę .findById
    // Przykła: task = await Task.findById('60fec8c43501d21b309befbd')
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    const task = await Task.findById(req.params.id); console.log(task)
    res.render('pages/tasks/edit', { form: task });
  }

  async edit(req, res) {
    // pobierz task
    const task = await Task.findById(req.params.id);
    // zaktualizuj dane
    task.title = req.body.title;
    task.description = req.body.description;
    try {
      // zapisz i przekieruj na stronę główną
      await task.save();
      res.redirect('/');
    } catch (e) {
      // jeśli są błędy, wyświetl ja na widoku
      res.render('pages/tasks/edit', {
        errors: e.errors,
        form: req.body
      });
    }
  }

  async delete(req, res) {
    try {
      // usuń task i przekieruj na stronę główną
      res.redirect('/');
    } catch (e) {
      // opcjonalnie obsłuż błąd
    }
  }

  async toggleDone(req, res) {
    // pobierz task
    const task = await Task.findById(req.params.id);
    // zmień wartość "done" taska (na odwrotną, czyli z 1 na 0, lub z 0 na 1) 
    task.done = task.done ? 0 : 1;
    await task.save();
    // oraz przekieruj na stronę główną
    res.redirect('/');
  }

}

module.exports = new TaskController();