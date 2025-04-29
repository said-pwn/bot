import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors'; // <-- Add this line

const app = express();
const TELEGRAM_TOKEN = '7991694639:AAEqlqfzYpUy4vy-_e8K-yWYPyz9nEeov9s'; // Replace with your bot token
const CHAT_ID = '1395598568'; // Replace with your Telegram chat ID

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-data', async (req, res) => {
  const { userName, userPhone } = req.body;
  const message = `Новый заказ от ${userName},\nТелефон номер: ${userPhone}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    res.status(200).json({ message: 'Успешно отправлено в Telegram' });
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    res.status(500).json({ message: 'Ошибка при отправке в Telegram' });
  }
});

app.listen(5000, () => {
  console.log('Сервер работает на порту 5000');
});
