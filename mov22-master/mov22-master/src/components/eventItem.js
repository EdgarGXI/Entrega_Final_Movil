import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import Text from "./text";

export default function EventItem({ item, handleDelete, navigateEdit }) {

  return (
    <View className="rounded-3xl bg-white px-5 py-6 w-full flex-row justify-between items-center">
      <View className="w-[90%]">
        <Text
          className="text-xl font-strong text-ellipsis overflow-hidden"
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View className="flex-row gap-1 items-center">
          <MaterialIcons name="place" size={22} color="gray" />
          <Text className="text-ellipsis overflow-hidden text-gray-600" numberOfLines={1}>
            {item.location}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center">
          <MaterialIcons name="event" size={22} color="gray" />
          <Text className="text-gray-600">
            {item.date}
          </Text>
        </View>
      </View>

      <View className="gap-2 justify-around">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-pink-200 rounded-full items-center w-10 h-10 justify-center"
          onPress={() => handleDelete(item._id)}
          accessibilityLabel="Delete event"
        >
          <MaterialIcons name="delete-outline" size={20} color="#C2185B" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-pink-200 rounded-full items-center w-10 h-10 justify-center"
          onPress={() => navigateEdit(item._id)}
          accessibilityLabel="Edit event"
        >
          <MaterialIcons name="design-services" size={20} color="#C2185B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
