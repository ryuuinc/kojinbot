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
This bot will help you do some stuff, but not for now.
`)
);

export default bot;
