import { TouchableOpacity, View } from "react-native";
import Text from "../components/text";
import useAppNavigation from "../hooks/useAppNavigation";


export default function AddScreen() {
  const { navigateToEventEdit, navigateToCategoryEdit } = useAppNavigation();

  return (
    <View className="flex-1 bg-white items-center justify-center relative mb-20">
      <View className="absolute rounded-full bg-pink-700/50 w-24 h-24 top-10 left-10" />
      <View className="absolute rounded-full bg-pink-300/40 w-20 h-20 top-32 right-8" />
      <View className="absolute rounded-full bg-pink-200/30 w-28 h-28 bottom-20 left-12" />
      <View className="absolute rounded-full bg-pink-700/20 w-16 h-16 bottom-10 right-12" />
      <View className="absolute rounded-full bg-pink-200/20 w-12 h-12 top-32 left-20" />
      <View className="absolute rounded-full bg-pink-300/15 w-24 h-24 top-40 right-28" />
      <View className="absolute rounded-full bg-pink-700/10 w-32 h-32 bottom-40 left-28" />
      <View className="absolute rounded-full bg-pink-200/30 w-14 h-14 bottom-32 right-24" />
      <View className="absolute rounded-full bg-pink-300/25 w-10 h-10 top-60 left-40" />
      <View className="absolute rounded-full bg-pink-700/15 w-16 h-16 top-72 right-5" />
      <View className="absolute rounded-full bg-pink-200/20 w-20 h-20 bottom-60 left-5" />
      <View className="absolute rounded-full bg-pink-300/10 w-24 h-24 bottom-72 right-20" />
      
      <View className="w-4/5 gap-6 z-10">
        <TouchableOpacity
          className="bg-pink-700 py-4 px-5 rounded-xl items-center"
          onPress={() => navigateToEventEdit()}
        >
          <Text className="text-white text-lg font-medium">New Event</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-pink-300 py-4 px-5 rounded-xl items-center"
          onPress={() => navigateToCategoryEdit()}
        >
          <Text className="text-white text-lg font-medium">New Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
