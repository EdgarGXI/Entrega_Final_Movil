import { View } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_900Black } from "@expo-google-fonts/nunito";
import MainNavigator from "./navigation/mainNavigator";
import "../global.css";
import { AppProvider } from "../context/AppProvider";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black
  });

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <View className="bg-white flex-grow">
        <MainNavigator />
      </View>
    </AppProvider>
  );
}