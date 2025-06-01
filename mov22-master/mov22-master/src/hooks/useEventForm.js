import { useState, useCallback, useEffect, useContext } from "react";
import useDropdown from "./useDropdown";
import { AppContext } from "../../context/AppProvider";
import dateParser from "../utils/dateParser";
import dateFormatter from "../utils/dateFormatter";
import handleAction from "../utils/actionHandler";
import { Alert } from "react-native";

const useEventForm = (eventId, navigation) => {
  const {
    createEvent,
    updateEvent,
    getCategoryTypeFromValue,
    categories,
    getOneEvent,
    loading,
    error,
    setError,
  } = useContext(AppContext);
  const [eventData, setEventData] = useState({
    title: "",
    type: "",
    location: "",
    date: new Date(new Date().setSeconds(0, 0)),
    details: "",
    participants: 0,
    availableSpots: 0,
    path: "lib/identity01.png",
    isJoined: false,
  });
  const [subscribedNumber, setSubscribedNumber] = useState(0);
  const categoryDropdownProps = useDropdown(categories.slice(1));
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const handleInputChange = useCallback((key, value) => {
    setEventData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

  const onDismissTimePicker = useCallback(() => {
    setOpenTimePicker(false);
  }, []);

  const onDismissDatePicker = useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  const onConfirmDatePicker = useCallback(({ date }) => {
    setOpenDatePicker(false);

    setEventData((prevData) => {
      const newDate = new Date(prevData.date);
      newDate?.setFullYear(date.getFullYear());
      newDate?.setMonth(date.getMonth());
      newDate?.setDate(date.getDate());

      return { ...prevData, date: newDate };
    });
  }, []);

  const onConfirmTimePicker = useCallback(
    ({ hours, minutes }) => {
      setOpenTimePicker(false);
      if (!eventData.date) return;

      setEventData((prevData) => {
        const newDate = new Date(prevData.date);
        newDate?.setHours(hours);
        newDate?.setMinutes(minutes);

        return { ...prevData, date: newDate };
      });
    },
    [eventData.date]
  );

  const handleSubmit = async () => {
    if (eventId !== undefined) {
      // update existing event
      handleAction(
        "Update Event",
        "Are you sure you want to overwrite event data?",
        "Changes saved.",
        async () =>
          await updateEvent({
            ...eventData,
            date: dateFormatter(eventData.date),
          })
      );
    } else {
      // create new event
      const success = await createEvent({ ...eventData, date: dateFormatter(eventData.date), availableSpots: eventData.participants });
      if (success) {
        Alert.alert("Success", "Event created successfully.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId !== undefined) {
        try {
          const fetchedData = await getOneEvent(eventId);
          const newDate = dateParser(fetchedData.date);
          setEventData({ ...fetchedData, date: newDate });
          setSubscribedNumber(
            fetchedData.participants - fetchedData.availableSpots
          );
          categoryDropdownProps.setValue(
            categories.find((e) => e.label === fetchedData.type)?.value
          );
        } catch (error) {
          console.log("Error fetching event data:", error.message);
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  return {
    eventData,
    categoryDropdownProps: {
      ...categoryDropdownProps,
      onChangeValue: (v) =>
        handleInputChange("type", getCategoryTypeFromValue(v)),
    },
    timePickerProps: {
      visible: openTimePicker,
      onDismiss: onDismissTimePicker,
      onConfirm: onConfirmTimePicker,
    },
    datePickerProps: {
      visible: openDatePicker,
      onDismiss: onDismissDatePicker,
      onConfirm: onConfirmDatePicker,
    },
    subscribedNumber,
    setEventData,
    setOpenDatePicker,
    setOpenTimePicker,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    setError,
  };
};

export default useEventForm;
