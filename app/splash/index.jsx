import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { SplashScreen, router } from "expo-router";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { customFonts } from "../../utils/customFonts";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // let customFonts = {
  //     'Inter-ExtraBold': require('../../assets/fonts/Inter-ExtraBold.ttf'),
  //     'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
  //     'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
  //     'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  //     'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
  //     'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
  //   };
  const cacheFonts = (fonts) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const loadResourcesAsync = async () => {
    try {
      //   const imageAssets = cacheImages(customImages);
      const customFontAssets = cacheFonts([customFonts]);
      //   const fontAssets = cacheFonts([
      //     MaterialCommunityIcons.font,
      //     Ionicons.font,
      //   ]);

      await Promise.all([...customFontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadResourcesAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth");
    }, 5000);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return <View style={styles.main}></View>;
}

const styles = StyleSheet.create({
  main: { backgroundColor: "pink", width: "100%", height: "100%" },
});
