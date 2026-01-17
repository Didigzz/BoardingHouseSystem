# Assets

This folder contains app assets like icons and splash screens.

## Required Assets (Optional)

You can add these files to customize the app appearance:

- `icon.png` - App icon (1024x1024px)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `favicon.png` - Web favicon (48x48px)

For now, the app uses default Expo assets. To add custom assets:

1. Create your icon/splash images
2. Place them in this folder
3. Update `app.json` to reference them:

```json
"icon": "./assets/icon.png",
"splash": {
  "image": "./assets/splash.png",
  ...
}
```

## Fonts

Place custom font files in `assets/fonts/`:
- Poppins-Regular.ttf
- Poppins-Medium.ttf
- Poppins-SemiBold.ttf
- Poppins-Bold.ttf
- OpenSans-Regular.ttf
- OpenSans-Medium.ttf
- OpenSans-SemiBold.ttf

Download from [Google Fonts](https://fonts.google.com).
