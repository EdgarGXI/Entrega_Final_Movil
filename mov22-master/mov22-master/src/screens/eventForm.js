import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Alert, FlatList, TouchableOpacity, View } from "react-native";
import Text from "../components/text";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
  TimePickerModal,
} from "react-native-paper-dates";
import useEventForm from "../hooks/useEventForm";
import InputComponent from "../components/inputComponent";
import BaseInputComponent from "../components/baseInputComponent";
import LoadingScreen from "./loadingScreen";
import eventBackgroundsMap from "../utils/eventBackgroundsMap";
import { Image } from "react-native";
import { useState } from "react";
registerTranslation("en-GB", enGB);

export default function EventForm({ navigation }) {
  const route = useRoute();
  const { eventId } = route.params || {};

  const {
    eventData,
    categoryDropdownProps,
    datePickerProps,
    timePickerProps,
    setOpenDatePicker,
    setOpenTimePicker,
    handleInputChange,
    subscribedNumber,
    handleSubmit,
    loading,
    error,
    setError,
  } = useEventForm(eventId, navigation);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (item) => {
    setLoadedImages((prev) => ({ ...prev, [item]: true }));
  };

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
      <View className="flex-1 pb-36">
        <View className="bg-pink-800 h-60 rounded-br-[65px]">
          <View className="bg-pink-100 h-60 w-60 rounded-full absolute top-[-90px] right-[-79px]" />
          <View className="bg-pink-600 h-36 w-36 rounded-full absolute top-[-42px] right-[-34px]" />
          <View className="bg-pink-500 h-10 w-10 rounded-full absolute top-28 right-3" />
          <View className="bg-pink-300 h-20 w-20 rounded-full absolute top-3 right-32" />
          <View className="w-10/12 flex-1 absolute bottom-7 left-5">
            <InputComponent
              name="title"
              icon="view-headline"
              color="white"
              defaultValue={eventData.title}
              transparent={true}
              onChange={handleInputChange}
            />
          </View>
        </View>
        <View className="pl-5 pr-6 pt-7 gap-4">
          <View className="w-full flex-row items-stretch gap-5">
            <InputComponent
              name="date"
              icon="event"
              defaultValue={eventData.date?.toLocaleDateString()}
              onPress={() => setOpenDatePicker(true)}
              disabled={true}
              onChange={handleInputChange}
            />
            <InputComponent
              name="time"
              icon="schedule"
              defaultValue={eventData.date?.toLocaleTimeString("en-GB")}
              onPress={() => setOpenTimePicker(true)}
              disabled={true}
              onChange={handleInputChange}
            />
          </View>
          <InputComponent
            name="location"
            icon="location-pin"
            defaultValue={eventData.location}
            onChange={handleInputChange}
          />
          <InputComponent
            name="details"
            icon="description"
            defaultValue={eventData.details}
            longText={true}
            onChange={handleInputChange}
          />
          <BaseInputComponent name="category" icon="category">
            <DropDownPicker
              {...categoryDropdownProps}
              listMode="SCROLLVIEW"
              autoScroll={true}
              dropDownContainerStyle={{
                backgroundColor: "#f3f4f6",
                borderWidth: 0,
              }}
              disabledStyle={{ borderWidth: 4 }}
              style={{ backgroundColor: "#f3f4f6", borderWidth: 0 }}
              textStyle={{ fontFamily: "Nunito_400Regular", fontSize: 16 }}
            />
          </BaseInputComponent>
          <InputComponent
            name="participants"
            icon="loyalty"
            defaultValue={eventData.participants}
            onChange={handleInputChange}
            keyboardType="numeric"
          />
          {eventId && (
            <View className="mt-[-7px] flex-row items-center opacity-60 gap-1">
              <MaterialIcons name="error-outline" size={17} />
              <Text>Currently, {subscribedNumber} people have subscribed</Text>
            </View>
          )}
          <BaseInputComponent name="background image" icon="image">
            <FlatList
              data={Object.keys(eventBackgroundsMap)}
              keyExtractor={(item) => item}
              numColumns={2}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="flex-1"
                  onPress={() => handleInputChange("path", item)}
                >
                  <Image 
                    source={eventBackgroundsMap[item]} 
                    className="w-full h-28"
                    resizeMode="cover"
                    onLoad={() => handleImageLoad(item)}
                  />
                  {!loadedImages[item] && (
                    <View className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <ActivityIndicator size="small" color="#EC4899" />
                    </View>
                  )}
                  {item == eventData.path && <View className="absolute inset-0 bg-pink-400 opacity-70" />}
                </TouchableOpacity>
              )}
              ListFooterComponent={<View className="h-4" />}
            />
          </BaseInputComponent>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-pink-200 rounded-full py-3 px-6 self-center flex-row gap-2 items-center"
            onPress={handleSubmit}
          >
            <MaterialIcons name="save" size={20} color="#C2185B" />
            <Text className="text-pink-600 text-xl">Save event</Text>
          </TouchableOpacity>

          <DatePickerModal
            locale="en-GB"
            mode="single"
            date={eventData.date == undefined ? Date.now() : eventData.date}
            {...datePickerProps}
          />
          <TimePickerModal
            locale="en-GB"
            hours={eventData.date?.getHours() ?? 0}
            minutes={eventData.date?.getMinutes() ?? 0}
            {...timePickerProps}
          />
        </View>
      </View>
    </ScrollView>
  );
}
