What's new in 0.7.1
- macOS: the app no longer shows "JarvisQL is damaged and can't be opened" after you download it. JarvisQL is not notarized by Apple, so the first time you open it macOS still asks you to confirm. Click Done, then open System Settings, Privacy & Security and click Open Anyway. You only need to do this once. Full steps: https://github.com/fftfaisal/jarvisql-releases#opening-jarvisql-on-macos
- Already have 0.7.0 on macOS and it won't open? Run `xattr -cr /Applications/JarvisQL.app` in Terminal, then open JarvisQL.
