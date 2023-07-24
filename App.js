import React, { useEffect, useRef, useState } from "react";
import MainNavigator from "./src/navigations";
import { Provider } from 'react-redux';
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import app from "./src/services/firebase";
import { AppState } from "react-native";
import socket from "./src/services/socket";

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background|unknown/) &&
        nextAppState === 'active'
      ) {
        socket.instance.connectToSocket();
      } else if (
        !(appState.current === 'unknown' && nextAppState === 'unknown')
      ) {
        socket.instance.disconnectFromServer();
      }
      appState.current = nextAppState;
    });

    return () => {

      subscription.remove();
    }

  }, [])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App;