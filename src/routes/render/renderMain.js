import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Layout from '../../components/Layout';
import { Todo } from '../../db/models';

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const tasks = await Todo.findAll();
    const initState = { path: req.originalUrl, userSession: req.session?.userSession, tasks };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

route.get('/todo', async (req, res) => {
  try {
    const tasks = await Todo.findAll();
    const initState = { path: req.originalUrl, userSession: req.session.userSession, tasks };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

// регистрация

route.get('/registration', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

// авторизация

route.get('/login', async (req, res) => {
  try {
    const initState = { path: req.originalUrl, userSession: req.session.userSession };
    const html = renderToString(<Layout initState={initState} />);
    res.write('<!DOCTYPE html>');
    res.end(html);
  } catch (err) {
    console.error(err);
  }
});

// ручка создания

route.post('/add', async (req, res) => {
  const { task, status } = req.body;
  const newObj = await Todo.create({ task, status });
  res.json(newObj);
});

// ручка удаления

route.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.sendStatus(200);
});

// ручка изменения

route.patch('/edit/:id', async (req, res) => {
  const editedTask = await Todo.update(req.body, { where: { id: req.params.id } });
  res.json(editedTask);
});

// ручка изменения статуса

route.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Todo.update({ status }, { where: { id } });
  res.sendStatus(200);
});

export default route;
