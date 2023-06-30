import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.mide.ionic.pegsolitaire',
  appName: 'PegSolitaire',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
