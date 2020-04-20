import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';

// prepare
import bot from './telegram';
dotenv.config();
const { API_URL, BOT_ENV } = process.env;

// server or local
if (BOT_ENV === 'production') {
  bot.telegram.setWebhook(API_URL + '/kojinbot');

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
  bot.launch();
}
