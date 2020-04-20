import dotenv from 'dotenv';
import axios from 'axios';
import Telegraf from 'telegraf';

// prepare
import { botOption, axiosOption } from '../configs/agentConfig';
dotenv.config();
const { API_URL, BOT_TOKEN } = process.env;

// axios instance
const instance = axios.create(axiosOption);

// initial telegram bot
const bot = new Telegraf(BOT_TOKEN, {
  telegram: botOption
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
  const response = await instance.post(API_URL + '/generar');
  if (response.data.isDone === true) {
    ctx.reply('Clash config has been generated.');
  } else {
    ctx.reply('Ops! Maybe you need rerun this command.');
  }
});

export default bot;
