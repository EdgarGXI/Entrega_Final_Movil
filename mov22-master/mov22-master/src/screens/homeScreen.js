import { Alert, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import Text from "../components/text";
import CategoryItemHorizontal from "../components/categoryItemHorizontal";
import EventItemHorizontal from "../components/eventItemHorizontal";
import useAppNavigation from "../hooks/useAppNavigation";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import LoadingScreen from "./loadingScreen";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const { navigateToEventEdit, navigateToCategoryEdit } = useAppNavigation();
  const { events, categories, loading, error, setError, refreshCategories, refreshEvents } =
    useContext(AppContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    Alert.alert("Error", error, [
      {
        text: "OK",
        onPress: () => setError(undefined),
      },
    ]);
  }

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View className="flex-1">
        <View className="bg-pink-800 w-full h-56 rounded-br-[50px] absolute" />
        <View className="h-56 rounded-[50px] rounded-bl-none bg-pink-200 w-3/4 mt-20 p-10 justify-end overflow-hidden">
          <View className="bg-pink-100 h-28 w-28 rounded-full absolute top-[-15px] right-[-5px]" />
          <View className="bg-pink-600 h-16 w-16 rounded-full absolute top-[-5px] right-1" />
          <View className="bg-pink-300 h-6 w-6 rounded-full absolute top-20 right-6" />
          <View className="bg-pink-300 h-10 w-10 rounded-full absolute top-6 right-20" />
          <Text className="text-lg">Get started</Text>
          <Text className="text-2xl font-semibold">
            with conference management!
          </Text>
        </View>

        <View className="bg-pink-200 w-full">
          <View className="bg-white rounded-tl-[55px] p-10 pb-40">
            <View className="flex-row gap-1 items-center">
              <Text className="text-lg font-semibold">Explore categories</Text>
              <TouchableOpacity onPress={refreshCategories}>
                <MaterialIcons name="refresh" size={22} />
              </TouchableOpacity>
            </View>
            
            {categories && categories.length > 0 ? (
              <FlatList
                data={categories}
                horizontal={true}
                keyExtractor={(item, index) =>
                  item._id ? `cat-${item._id}-${index}` : `category-${index}`
                }
                renderItem={({ item }) => (
                  <CategoryItemHorizontal
                    item={item}
                    onPress={() => {
                      if (item.label != "All") {
                        navigateToCategoryEdit(item._id);
                      }
                    }}
                  />
                )}
                className="pt-2 pb-5"
                ItemSeparatorComponent={<View className="w-5" />}
              />
            ) : (
              <Text className="text-center text-gray-500 font-bold py-6">
                No categories found
              </Text>
            )}
            <View className="flex-row gap-1 items-center">
              <Text className="text-lg font-semibold">Most recent</Text>
              <TouchableOpacity onPress={refreshEvents}>
                <MaterialIcons name="refresh" size={22} />
              </TouchableOpacity>
            </View>
            {events && events.length > 0 ? (
              <FlatList
                data={[...events]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 10)}
                horizontal={true}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <EventItemHorizontal
                    item={item}
                    onPress={() => navigateToEventEdit(item._id)}
                  />
                )}
                className="pt-2 pb-5"
                ItemSeparatorComponent={<View className="w-5" />}
              />
            ) : (
              <Text className="text-center text-gray-500 font-bold py-6">
                No events found
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
