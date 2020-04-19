import dotenv from 'dotenv';
import axios from 'axios';
import Telegraf from 'telegraf';
import Koa from 'koa';
import koaBody from 'koa-body';

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

// how to run telegram
if (BOT_ENV === 'production') {
  bot.telegram.setWebhook(API_URL + '/kojinbot');
  // koa
  const app = new Koa();
  app.use(koaBody());
  app.use(async (ctx, next) => {
    if (ctx.method !== 'POST') {
      return next();
    }
    await bot.handleUpdate(ctx.request.body, ctx.response.body);
    ctx.status = 200;
  });
  app.listen(50000);
} else {
  bot.telegram.deleteWebhook();
  bot.launch();
}
