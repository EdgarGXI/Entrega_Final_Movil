import axios from 'axios';

class EventService {
  constructor(baseURL = "https://api-puntog-nfmr.onrender.com") {
    this.api = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all events from the API
   * @returns {Promise<Array>} Promise that resolves to an array of events
   */
  async getAllEvents() {
    try {
      const response = await this.api.get('/events');
      if (response.status !== 200) {
        throw new Error(`Failed fetching events: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error fetching events:', error.message);
      throw error;
    }
  }

  /**
   * Get one event from the API from its id
   * @returns {Promise<Object>} Promise that resolves to an event
   */
  async getEvent(id) {
    try {
      const response = await this.api.get(`/events/${id}`);
      if (response.status !== 200) {
        throw new Error(`Failed to get event: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error getting event:', error.message);
      throw error;
    }
  }

  /**
   * Get the current events version from the API
   * @returns {Promise<Object>} Promise that resolves to the events version object
   */
  async getEventsVersion() {
    try {
      const response = await this.api.get('/events/version');
      return response.data;
    } catch (error) {
      console.log('Error fetching events version:', error.message);
      throw error;
    }
  }

  /**
   * Get events filtered by type
   * @param {string} type - The event type to filter by
   * @returns {Promise<Array>} Promise that resolves to filtered events
   */
  async getEventsByType(type) {
    try {
      const response = await this.api.get(`/events/type/${type}`);
      if (response.status !== 200) {
        throw new Error(`Failed to get events by type: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error filtering events by type:', error.message);
      throw error;
    }
  }

  /**
   * Adds a new event
   * @param {Object} data – event data
   * @returns {Promise<boolean>} true on success, false otherwise
   */
  async createEvent(data) {
    try {
      const response = await this.api.post('/events', data);
      return response.status === 200;
    } catch (error) {
      console.log('Error creating event:', error.message);
      throw error;
    }
  }
    
  /**
   * Updates an existing event.
   * @param {Object} event – updated event data
   * @returns {Promise<Object>} updated event on success
   */
  async updateEvent(event) {
    const { _id, ...updatedEvent } = event;
    try {
      const response = await this.api.put(`/events/${_id}`, updatedEvent);
      if (response.status !== 200) {
        throw new Error(`Failed to update event: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error updating event:', error.message);
      throw error;
    }
  }

  /**
   * Deletes an event by id.
   * @param {string} eventId - The ID of the event to delete
   * @returns {Promise<Object>} response data on success
   */
  async deleteEvent(eventId) {
    try {
      const response = await this.api.delete(`/events/${eventId}`);
      if (response.status !== 200) {
        throw new Error(`Failed to delete event: ${response.data.error}`);
      }
      return response.data;
    } catch (error) {
      console.log('Error deleting event:', error.message);
      throw error;
    }
  }
}

const eventService = new EventService();

export default eventService;