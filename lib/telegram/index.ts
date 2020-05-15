import axios from 'axios';
import Telegraf from 'telegraf';

import { botConfig, axiosConfig } from '../configs/agentConfig';
const instance = axios.create(axiosConfig);
const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: botConfig
});

/* start */
bot.start((ctx) =>
  ctx.reply(`
This bot will help you do some stuff. Simply send:

/generar generate Clash config
`)
);

/* generar */
bot.command('generar', async (ctx) => {
  const response = await instance.post(process.env.API_URL + '/generar');
  if (response.data.isDone === true) {
    ctx.reply('Clash config has been generated.');
  } else {
    ctx.reply('Ops! Maybe you need rerun this command.');
  }
});

export default bot;
