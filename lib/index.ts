import dotenv from 'dotenv';
import axios from 'axios';
import Telegraf from 'telegraf';

// initial env
dotenv.config();
const { API_URL, BOT_ENV, BOT_TOKEN } = process.env;

// prepare
import { botOption, axiosOption } from './configs/agentConfig';

// axios instance
const instance = axios.create(axiosOption);

// initial telegram bot
const bot = new Telegraf(BOT_TOKEN, {
  telegram: botOption
});

// how to run telegram
if (BOT_ENV === 'production') {
  bot.telegram.setWebhook(API_URL + '/kojinbot');
}

// start tip
const startTip = `
This bot will help you do some stuff. Simply send:

/* Generar */
/build generate Clash config
`;

/* start */
bot.start((ctx) => ctx.reply(startTip));

/* Generar */
bot.command('build', async (ctx) => {
  const response = await instance.post(API_URL + '/generar/build');
  if (response.data.isDone === true) {
    ctx.reply('Clash config has been generated.');
  } else {
    ctx.reply('Ops! Maybe you need rerun this command.');
  }
});

bot.launch();
