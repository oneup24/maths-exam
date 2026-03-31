# Mobile App Setup Guide

Your math-exam app has been converted to a mobile app using **Capacitor**. You can now build and deploy it to iOS and Android devices.

## Quick Start

### Prerequisites
- **macOS**: For iOS development, install Xcode from the App Store
- **Android**: Install Android Studio and set up Android SDK

### Development Workflow

1. **Build web assets**
   ```bash
   npm run build
   ```

2. **Sync to mobile platforms**
   ```bash
   npm run mobile:sync
   ```

3. **Open iOS project in Xcode**
   ```bash
   npm run mobile:ios
   ```
   Then click the Play button in Xcode to run on simulator or device.

4. **Open Android project in Android Studio**
   ```bash
   npm run mobile:android
   ```
   Then use Android Studio to build and run on emulator or device.

## One-Command Build & Sync
```bash
npm run mobile:build
```
This builds your web code and updates both iOS and Android projects.

## Development Tips

- **Hot Reload During Development**: Run `npm run dev` in one terminal while testing in the web browser first
- **Make Changes**: Edit your React code in `src/`
- **Test on Mobile**: Run `npm run build`, then `npm run mobile:sync`, then open iOS/Android to rebuild and deploy
- **Live Testing**: Use Capacitor DevTools for debugging on device

## File Structure

```
ios/              ← iOS Xcode project
android/          ← Android Studio project
dist/             ← Built web files (copied to mobile apps)
src/              ← Your React source code
```

## iOS Requirements
- Xcode 14+
- iOS 13.0 or higher
- Apple Developer Account (for device deployment)

## Android Requirements
- Android Studio
- Android SDK 21+
- JDK 11+

## Troubleshooting

- **App not updating**: Run `npm run mobile:sync` before rebuilding
- **iOS build fails**: Open iOS project and update signing in Xcode
- **Android build fails**: Ensure Android SDK is properly installed

## Next Steps

1. Test on iOS simulator: `npm run mobile:ios`
2. Test on Android emulator: `npm run mobile:android`
3. Customize app icon and splash screen (see Capacitor docs)
4. Deploy to App Store / Google Play when ready

---

For more info: https://capacitorjs.com/docs/getting-started
