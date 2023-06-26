const BOT_ID = 'BOT_ID';
const REPORT_CHAT_ID = '-REPORT_CHAT_ID';

const { Telegraf } = require('telegraf');
const bot = new Telegraf(BOT_ID);


//ban
bot.command('ban', async (ctx) => {

    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;


    if (await isAdmin(ctx, message.from.id) && replyMessage && replyMessage.from.id !== bot.botInfo.id) {
        const userId = replyMessage.from.id;

        const description = ctx.message.text.replace('/ban', '').trim();

        bot.telegram.banChatMember(chatId, userId);
        ctx.reply(`Користувач ${replyMessage.from.username} був заблокований.\nОпис: ${description}`);
    }

});

//unban
bot.command('unban', async (ctx) => {
    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;

    if (await isAdmin(ctx, message.from.id) && replyMessage && replyMessage.from.id !== bot.botInfo.id) {
        const userId = replyMessage.from.id;

        const description = ctx.message.text.replace('/unban', '').trim();


        bot.telegram.unbanChatMember(chatId, userId);
        ctx.reply(`Користувач ${replyMessage.from.username} був розблокований.\nОпис: ${description}`);
    }
});

//unmute
bot.command('umt', async (ctx) => {
    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;

    if (await isAdmin(ctx, message.from.id) && replyMessage && replyMessage.from.id !== bot.botInfo.id) {
        const userId = replyMessage.from.id;

        bot.telegram.restrictChatMember(chatId, userId, {
            until_date: 0,
            can_send_messages: true,
        });

        ctx.reply(`Користувач ${replyMessage.from.username} був unmuted.`);
    }
});

//katsap
bot.command('gdam', async (ctx) => {
    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;

    if (await isAdmin(ctx, message.from.id) && replyMessage && replyMessage.from.id !== bot.botInfo.id) {
        const userId = replyMessage.from.id;

        bot.telegram.deleteMessage(chatId, message.reply_to_message.message_id);
        bot.telegram.banChatMember(chatId, userId);
        ctx.reply(`Користувач ${replyMessage.from.username} був заблокований.\nОпис: Кацап`);
    }
});

//mute time m/h/d
bot.command('mt', async (ctx) => {
    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;

    if (await isAdmin(ctx, message.from.id) && replyMessage && replyMessage.from.id !== bot.botInfo.id) {
        const userId = replyMessage.from.id;

        const timeDuration = ctx.message.text.replace('/mt', '').trim();

        const durationInSeconds = calculateDurationInSeconds(timeDuration);

        if (durationInSeconds > 0) {
            bot.telegram.restrictChatMember(chatId, userId, {
                until_date: Math.floor(Date.now() / 1000) + durationInSeconds,
                can_send_messages: false,
            });

            ctx.reply(`Користувач ${replyMessage.from.username} був muted на ${timeDuration}.`);
        } else {
            ctx.reply('Invalid duration. Please use time markers like 12m (minutes), 1h (hours), or 2d (days).');
        }
    }
});

//fake report
bot.command('fakerep', async (ctx) => {
    const message = ctx.message;
    const chatId = message.chat.id;
    const replyMessage = message.reply_to_message;

    if (await isAdmin(ctx, message.from.id) && replyMessage) {
        const userId = replyMessage.from.id;

        const timeDuration = "1d";

        const durationInSeconds = calculateDurationInSeconds(timeDuration);


        bot.telegram.restrictChatMember(chatId, userId, {
            until_date: Math.floor(Date.now() / 1000) + durationInSeconds,
            can_send_messages: false,
        });

        ctx.reply(`Користувач ${replyMessage.from.username} був muted на 1 день за fake report.`);



    }
});

//report
bot.command(['report'], async (ctx) => {
    const message = ctx.message;
    const replyMessage = message.reply_to_message;

    if (replyMessage) {
        const additionalText = message.text.slice(message.text.indexOf(' ') + 1);

        const reportMessage = `Report from user ${message.from.username} (${message.from.id}):\n\n${additionalText}`;
        const reportGroupId = REPORT_CHAT_ID;

        bot.telegram.sendMessage(reportGroupId, reportMessage);
        ctx.reply('Дякуємо за повідомлення. Його відправлено на розгляд.');
    }
});

// bot.on('new_chat_members', async (ctx) => {
//     const chatId = ctx.chat.id;
//     const newMembers = ctx.message.new_chat_members;

//     for (const member of newMembers) {
//       const welcomeMessage = `Hello ${member.first_name}! Welcome to the group.\n\nPlease make sure to follow these rules:\n1. Be respectful to others.\n2. No spamming or advertising.\n3. Avoid sharing sensitive personal information.\n\nEnjoy your time in the group!`;

//       await ctx.telegram.sendMessage(chatId, welcomeMessage);
//     }
//   });

bot.launch();

function calculateDurationInSeconds(timeDuration) {
    const durationPattern = /^(\d+)([mhd])$/;
    const matches = durationPattern.exec(timeDuration);

    if (matches) {
        const value = parseInt(matches[1]);
        const marker = matches[2];

        if (marker === 'm') {
            return value * 60;
        } else if (marker === 'h') {
            return value * 60 * 60;
        } else if (marker === 'd') {
            return value * 60 * 60 * 24;
        }
    }

    return 0;
}

async function isAdmin(ctx, userId) {
    const chatId = ctx.chat.id;
    const chatMember = await ctx.telegram.getChatMember(chatId, userId);
    return chatMember.status === 'administrator' || chatMember.status === 'creator';
}
