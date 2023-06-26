## isko4-telegram-bot
Програма представляє собою код на JavaScript для створення Telegram-бота за допомогою бібліотеки Telegraf. Бот має ряд команд, які виконують різні дії, такі як блокування, розблокування, приглушення та інші дії з користувачами в Telegram-чаті. Команди можуть бути виконані тільки адміністраторами чату. Бот також може приймати повідомлення-скарги від користувачів і надсилати їх до визначеної групи для подальшого розгляду. Код також містить допоміжні функції для розрахунку тривалості в секундах та перевірки статусу адміністратора користувача.
```json
{
  "constants": {
    "BOT_ID": "BOT_ID",
    "REPORT_CHAT_ID": "-REPORT_CHAT_ID"
  },
  "dependencies": {
    "Telegraf": "telegraf"
  },
  "functions": [
    {
      "name": "bot.command('ban')",
      "description": "Заблоковує користувача та виводить опис блокування.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command('unban')",
      "description": "Розблоковує користувача та виводить опис розблокування.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command('umt')",
      "description": "Відключає режим приглушення користувача та виводить повідомлення про це.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command('gdam')",
      "description": "Заблоковує користувача, видаляє його повідомлення та виводить опис блокування.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command('mt')",
      "description": "Приглушує користувача на певний період часу та виводить повідомлення про це.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command('fakerep')",
      "description": "Приглушує користувача на 1 день за вигадане повідомлення-скаргу та виводить повідомлення про це.",
      "parameters": [],
      "returns": [],
      "async": true
    },
    {
      "name": "bot.command(['report'])",
      "description": "Відправляє повідомлення-скаргу до групи, зберігає його для подальшого розгляду.",
      "parameters": [],
      "returns": [],
      "async": true
    }
  ],
  "launch": {
    "function": "bot.launch",
    "parameters": [],
    "async": false
  },
  "helperFunctions": [
    {
      "name": "calculateDurationInSeconds",
      "description": "Розраховує тривалість в секундах на основі вказаного формату часу.",
      "parameters": [
        {
          "name": "timeDuration",
          "type": "string",
          "description": "Рядок, що представляє тривалість у форматі 'Xm', 'Xh' або 'Xd', де X - число."
        }
      ],
      "returns": {
        "type": "number",
        "description": "Тривалість в секундах."
      },
      "async": false
    },
    {
      "name": "isAdmin",
      "description": "Перевіряє, чи є користувач адміністратором чату.",
      "parameters": [
        {
          "name": "ctx",
          "type": "object",
          "description": "Контекст бота."
        },
        {
          "name": "userId",
          "type": "number",
          "description": "Ідентифікатор користувача."
        }
      ],
      "returns": {
        "type": "boolean",
        "description": "true, якщо користувач є адміністратором чату, false - в іншому випадку."
      },
      "async": true
    }
  ]
}
```
