import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vincent-technologies.app',
  appName: 'MoneyMate',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, 
      backgroundColor: "#000000",
      androidScaleType: "CENTER_INSIDE",
      showSpinner: false
    }
  }
};

export default config;
