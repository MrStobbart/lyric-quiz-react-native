This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

It is one of two Android apps developed for my MSc dissertation. 
The other app has the same features and can be found here: [Kotlin App](https://github.com/MrStobbart/lyric-quiz-kotlin).

The [master-ejected](https://github.com/MrStobbart/lyric-quiz-react-native/tree/master-ejected) branch is the ejected create-react-native-app project should be used to install the app on your phone.

To run this app locally the appConfig.example.js needs to be edited with the appropriate Spotify client id and genius api access token. The file must then be saved as appConfig.js

A signed apk can be generated according to the docs of [React Native](https://facebook.github.io/react-native/docs/signed-apk-android).
The following commands will then genereate the .apk file when a keystore has been generated according to the documentation regarding React Native.

```
$ cd android
$ ./gradlew assembleRelease
```
