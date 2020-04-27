import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';
dotenv.config();

// prepare
import bot from './telegram';

// server or local
if (process.env.BOT_ENV === 'production') {
  bot.telegram.setWebhook(process.env.API_URL + '/kojinbot');

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
