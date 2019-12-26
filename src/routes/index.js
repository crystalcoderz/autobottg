import express from 'express';
import { bot } from './../bot';
import { getIpAction } from '../helpers';
import { messages } from '../messages';
import path from "path";
import { getReplyKeyboard } from '../keyboards';

const routes = express.Router();

const getHandle = async (req, res) => {

  await getIpAction(req);

  await bot.telegram.sendMessage(
    req.params.id,
    messages.agreed,
    getReplyKeyboard()
  );

  bot.context.listenPressButton = true;

  res.redirect(302, 'https://changenow.io/terms-of-use');
};

routes.get('/user-ip/:id', getHandle);

routes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../public/404.html'));
});

export default routes;



