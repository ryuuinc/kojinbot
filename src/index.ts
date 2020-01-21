import Telegraf from 'telegraf';
import dotenv from 'dotenv';
import HttpsProxyAgent from 'https-proxy-agent';

dotenv.config();

let agent = new HttpsProxyAgent(process.env.HTTP_PROXY);

const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: {
    agent: agent
  }
});

bot.start((ctx) => ctx.reply('Welcome!'));

bot.command('help', (ctx) => {
  ctx.reply('There is nothing now~');
});

bot.launch();
