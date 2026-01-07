const { Telegraf } = require("telegraf");

const token = process.env.HELLO_BOT_TOKEN;

if (!token) {
  console.error("ERROR: BOT_TOKEN is not defined!");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.command("help", (ctx) => {
  ctx.reply(`
    Бот может здороваться на разных языках.
    Список поддерживаемых приветствий:
    - привет - русский
    - hello - английский
    - hola - испанский
    `);
});

bot.hears("привет", (ctx) => ctx.reply("привет"));
bot.hears("hello", (ctx) => ctx.reply("hello"));
bot.hears("hola", (ctx) => ctx.reply("hola"));

bot.on("text", (ctx) =>
  ctx.reply(`Приветствие "${ctx.update.message.text}" не поддерживается.`)
);

bot.launch().then(() => console.log("Started"));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
