import { TouchableOpacity, View } from "react-native";
import Text from "./text";

export default function EventItemHorizontal({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} accessibilityLabel={`Access event ${item.title}`}>
      <View className="p-5 bg-pink-200 rounded-3xl w-56 h-56 justify-end overflow-hidden">
        <View className="bg-pink-600 h-28 w-28 rounded-full absolute top-[-15px] right-[-5px]" />
        <View className="bg-pink-300 h-16 w-16 rounded-full absolute top-[-5px] right-1" />
        <View className="bg-pink-100 h-6 w-6 rounded-full absolute top-20 right-6" />
        <View className="bg-pink-100 h-10 w-10 rounded-full absolute top-6 right-20" />
        <Text
          className="font-semibold text-lg text-ellipsis overflow-hidden leading-tight"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text>
          {item.availableSpots} spots available
        </Text>
      </View>
    </TouchableOpacity>
  );
}
