import { useEffect, useState, createContext } from "react";
import eventService from "../services/eventService";
import categoryService from "../services/categoryService";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Create the context
export const AppContext = createContext({
  loading: false,
  error: undefined,
  setError: () => {},
  // events
  events: [],
  refreshEvents: () => {},
  getOneEvent: async (id) => {},
  createEvent: async (data) => Boolean,
  updateEvent: async (data) => Boolean,
  deleteEvent: async (id) => Boolean,
  getEventsByType: async (type) => {},
  // category
  categories: [],
  refreshCategories: () => {},
  getOneCategory: async (id) => {},
  createCategory: async (data) => Boolean,
  updateCategory: async (data) => Boolean,
  deleteCategory: async (id) => Boolean,
  getCategoryTypeFromValue: (value) => string,
  getCategoryValueFromLabel: (label) => number,
});

// Provider component
export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [categories, setCategories] = useState([]);

  // Initial fetch
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      data?.forEach((cat, index) => {
        cat.value = index;
      });
      setCategories(data);
    } catch (err) {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  // Get one event
  const getOneEvent = async (id) => {
    setLoading(true);
    try {
      const data = await eventService.getEvent(id);
      return data;
    } catch (err) {
      setError("Failed to fetch event.");
    } finally {
      setLoading(false);
    }
  };

  // Get one category
  const getOneCategory = async (id) => {
    setLoading(true);
    try {
      const data = await categoryService.getCategory(id);
      return data;
    } catch (err) {
      setError("Failed to fetch category.");
    } finally {
      setLoading(false);
    }
  };

  // Get events by type
  const getEventsByType = async (type) => {
    setLoading(true);
    try {
      const data = await eventService.getEventsByType(type);
      return data;
    } catch (err) {
      setError("Failed to fetch events by type.");
    } finally {
      setLoading(false);
    }
  };

  // Create a new event
  const createEvent = async (data) => {
    setLoading(true);
    try {
      await eventService.createEvent(data);
      await fetchEvents();
      return true;
    } catch (err) {
      setError("Failed to create event.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (data) => {
    setLoading(true);
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
      return true;
    } catch (err) {
      setError("Failed to create category.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing event
  const updateEvent = async (event) => {
    setLoading(true);
    try {
      await eventService.updateEvent(event);
      await fetchEvents();
      return true;
    } catch (err) {
      setError("Failed to update event.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing category
  const updateCategory = async (category) => {
    setLoading(true);
    try {
      await categoryService.updateCategory(category);
      await fetchCategories();
      return true;
    } catch (err) {
      setError("Failed to update category.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete an event by id
  const deleteEvent = async (id) => {
    setLoading(true);
    try {
      const result = await eventService.deleteEvent(id);
      if (result) {
        // Actualizar el estado local inmediatamente
        setEvents((prevEvents) => {
          const updatedEvents = prevEvents.filter((event) => event._id !== id);
          return updatedEvents;
        });
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete event.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a category by id
  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const success = await categoryService.deleteCategory(id);
      if (success) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete category.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTypeFromValue = (value) => {
    return categories.find((c) => c.value === value)?.type || "Unbound";
  };

  const getCategoryValueFromLabel = (label) => {
    return categories.find((c) => c.label === label)?.value || -1;
  };

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          events,
          loading,
          error,
          refreshEvents: fetchEvents,
          getOneEvent,
          createEvent,
          updateEvent,
          deleteEvent,
          getEventsByType,
          categories,
          refreshCategories: fetchCategories,
          getOneCategory,
          createCategory,
          updateCategory,
          deleteCategory,
          getCategoryTypeFromValue,
          getCategoryValueFromLabel,
          setError,
        }}
      >
        {children}
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};
