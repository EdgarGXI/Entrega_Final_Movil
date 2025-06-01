import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import EventItem from "../components/eventItem";
import Text from "../components/text";
import { useEffect, useRef, useState, memo, useContext } from "react";
import useAppNavigation from "../hooks/useAppNavigation";
import { AppContext } from "../../context/AppProvider";
import LoadingScreen from "./loadingScreen";
import { useIsFocused } from "@react-navigation/native";
//import handleAction from "../utils/actionHandler";

const CategoryItem = memo(({ item, selectedCategory, setSelectedCategory }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => setSelectedCategory(item.label)}
    className="w-[170px]"
  >
    <Text
      className={`text-center font-semibold px-1 pb-[0.7rem] ${
        selectedCategory === item.label &&
        "border-b-2 border-b-pink-600 text-pink-600"
      }`}
    >
      {item.label}
    </Text>
  </TouchableOpacity>
));

function CategoryFlatList({
  selectedCategory,
  setSelectedCategory,
  data,
  ref,
}) {
  return (
    <FlatList
      ref={ref}
      data={data}
      horizontal={true}
      keyExtractor={(item) => item.label}
      removeClippedSubviews={true}
      getItemLayout={(data, index) => {
        return {
          length: 170,
          offset: 170 * index,
          index,
        };
      }}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      className="pt-6"
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default function SearchScreen() {
  const {
    events,
    refreshEvents,
    getEventsByType,
    categories,
    getCategoryTypeFromValue,
    getCategoryValueFromLabel,
    deleteEvent,
    loading,
  } = useContext(AppContext);
  const [eventsShown, setEventsShown] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const { navigateToEventEdit } = useAppNavigation();
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();

  const filterEventsBySearch = (eventsList, searchQuery) => {
    if (!searchQuery.trim()) return eventsList;

    return eventsList.filter(
      (event) =>
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Efecto para cargar datos iniciales cuando la pantalla se enfoca
  useEffect(() => {
    const refreshData = async () => {
      await refreshEvents();
    };
    if (isFocused) {
      refreshData();
    }
  }, [isFocused]);

  // Efecto separado para filtrar eventos cuando cambian los datos
  useEffect(() => {
    const updateEventsShown = async () => {
      let filteredEvents = [];

      if (selectedCategory === "All") {
        filteredEvents = events;
      } else {
        const catValue = getCategoryValueFromLabel(selectedCategory);
        const type = getCategoryTypeFromValue(catValue);
        filteredEvents = await getEventsByType(type);
      }

      // Aplicar filtro de búsqueda
      const searchFilteredEvents = filterEventsBySearch(
        filteredEvents,
        searchText
      );
      setEventsShown(searchFilteredEvents);
    };

    if (events.length > 0 || selectedCategory !== "All") {
      updateEventsShown();
    }
  }, [selectedCategory, searchText]); // Remover 'events' de las dependencias

  // Efecto separado para actualizar eventos mostrados cuando cambian los eventos
  useEffect(() => {
    if (selectedCategory === "All") {
      const searchFilteredEvents = filterEventsBySearch(events, searchText);
      setEventsShown(searchFilteredEvents);
    }
  }, [events]); // Solo depende de events

  const scrollToItem = (index) => {
    try {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    } catch (e) {
      flatListRef.current?.scrollToOffset({
        offset: index * 170,
        animated: true,
      });
    }
  };

  const handleDelete = (eventId) => {
    try {
      Alert.alert(
        "Delete Event",
        "Are you sure you want to delete this event?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                // Eliminar el evento usando la función del contexto
                const success = await deleteEvent(eventId);
                if (success) {
                  // Actualizar manualmente la lista filtrada
                  const updatedEvents = events.filter(
                    (event) => event._id !== eventId
                  );
                  const searchFilteredEvents = filterEventsBySearch(
                    updatedEvents,
                    searchText
                  );
                  setEventsShown(searchFilteredEvents);

                  Alert.alert("Success", "Event deleted successfully.");
                } else {
                  throw new Error("Delete operation returned false");
                }
              } catch (error) {
                Alert.alert(
                  "Error",
                  `Failed to delete event: ${error.message || "Unknown error"}`
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log("Error showing Alert:", error);
    }
  };

  useEffect(() => {
    setSelectedCategory("All");
  }, []);

  return (
    <View className="flex-1">
      <View className="pt-16 px-5 bg-white ">
        <View className="flex-row gap-2 items-center">
          <TextInput
            className="bg-gray-100 p-4 pb-5 rounded-3xl flex-1 text-lg"
            placeholder="Search events..."
            placeholderTextColor="slategray"
            style={{ fontFamily: "Nunito_400Regular" }}
            value={searchText}
            onChangeText={setSearchText}
          />
          <MaterialIcons name="search" color="darkslategray" size={30} />
        </View>
        <CategoryFlatList
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => {
            scrollToItem(getCategoryValueFromLabel(category));
            setSelectedCategory(category);
          }}
          data={categories}
          ref={flatListRef}
        />
      </View>
      {loading ? (
        <LoadingScreen />
      ) : eventsShown.length === 0 ? (
        <View className="items-center pt-48 gap-4">
          <View className="bg-pink-200 p-6 rounded-full">
            <MaterialIcons name="calendar-today" size={60} color="#C2185B" />
          </View>
          <Text className="font-bold text-2xl text-gray-500">
            No events found
          </Text>
        </View>
      ) : (
        <FlatList
          data={eventsShown}
          keyExtractor={(item, index) =>
            item._id ? `${item._id}-${index}` : `event-${index}`
          }
          renderItem={({ item }) => (
            <EventItem
              item={item}
              navigateEdit={navigateToEventEdit}
              handleDelete={handleDelete}
            />
          )}
          className="bg-gray-100 p-6"
          ItemSeparatorComponent={<View className="h-5" />}
          ListFooterComponent={<View className="h-36" />}
        />
      )}
    </View>
  );
}
