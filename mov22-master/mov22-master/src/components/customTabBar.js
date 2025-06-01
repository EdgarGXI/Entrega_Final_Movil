import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const iconsMap = {
  Home: "dashboard",
  "Add Navigator": "add-circle",
  Search: "explore",
  Edit: "design-services",
  Feedback: "reviews",
};

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View className="flex-row h-20 bg-pink-700 rounded-[30px] items-center justify-evenly absolute bottom-8 left-4 right-4">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name, route.options ?? {})}
            accessibilityLabel={`Navigate to ${route.name}`}
          >
            <MaterialIcons
              name={iconsMap[route.name]}
              size={route.name == "Add Navigator" ? 60 : 40}
              color="white"
              className={isFocused ? "" : "opacity-70"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
