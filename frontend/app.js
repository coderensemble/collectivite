import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";

//import de la navigation par lien
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importer les polices nescessaires
import * as Font from "expo-font";

const fetchFonts = async () => {
  await Font.loadAsync({
    "MavenPro": require("./assets/fonts/MavenPro-VariableFont_wght.ttf")
  });
};

//Store persistant et reducers
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

//import des différents screens
import HomeScreen from "./screens/HomeScreen";
import AgendaScreen from "./screens/AgendaScreen";


LogBox.ignoreAllLogs();

const reducers = combineReducers({ user });
const persistConfig = { key: "Collectivites", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return ( 
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
}