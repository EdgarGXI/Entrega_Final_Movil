import Text from "./text";
import { View, TouchableOpacity } from "react-native";

export default function CategoryItemHorizontal({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} accessibilityLabel={`Navigate to ${item.label}`}>
      <View className="justify-center items-center p-5 bg-pink-700 rounded-3xl h-24 w-48 overflow-clip">
        <Text className="text-center text-white leading-tight">
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
