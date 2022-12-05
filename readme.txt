Setting up the development enviroment:
https://reactnative.dev/docs/environment-setup 

To launch the app run:
    npm install
    yarn android

If you run into errors first try deleting the node_module directory and then running npm install:
    rm -rf node_modules
    npm install
    yarn android

If reinstalling node modules does not working you can try cleaning the gradle build:
    cd android &&./gradlew clean
    cd ..
    yarn android

If you get an error regarding watchman failing try running the following:
    watchman watch-del-all && watchman shutdown-server
    yarn android

If that does not resolve the watchman errors, you can try giving watchman full desktop access: 
https://stackoverflow.com/a/64328425/20381576 
