import nacl from 'tweetnacl';
import QRCode from 'qrcode';

export async function generateWarpConfig(options: {
  selectedServices: string[];
  siteMode: 'all' | 'specific';
  deviceType: 'computer' | 'phone';
}) {
  const { selectedServices, siteMode, deviceType } = options;

  // Генерация ключей с использованием tweetnacl
  const keyPair = nacl.box.keyPair();
  const publicKey = Buffer.from(keyPair.publicKey).toString('base64');
  const privateKey = Buffer.from(keyPair.secretKey).toString('base64');

  // Формирование конфигурации WARP
  const config = {
    private_key: privateKey,
    public_key: publicKey,
    services: siteMode === 'all' ? ['all'] : selectedServices,
    device_type: deviceType,
  };

  // Генерация QR-кода
  const configString = JSON.stringify(config);
  const qrCodeBase64 = await QRCode.toDataURL(configString);

  return {
    configBase64: Buffer.from(configString).toString('base64'),
    qrCodeBase64,
  };
}
