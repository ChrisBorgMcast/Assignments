// Database operations - handles bookings CRUD (Create, Read, Update, Delete)
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION_NAME = 'bookings'

const bookingsService = {
  // Create new booking
  async createBooking(bookingData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...bookingData,
        createdAt: new Date().toISOString()
      })
      return {
        id: docRef.id,
        ...bookingData
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  },

  // Get all bookings
  async getAllBookings() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
      const bookings = []
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return bookings
    } catch (error) {
      console.error('Error getting bookings:', error)
      throw error
    }
  },

  /**
   * READ - Get a single booking by ID
   * @param {string} id - The booking ID
   * @returns {Promise<Object|null>} - The booking data or null if not found
   */
  async getBookingById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting booking:', error)
      throw error
    }
  },

  /**
   * UPDATE - Update an existing booking
   * @param {string} id - The booking ID
   * @param {Object} bookingData - The updated booking data
   * @returns {Promise<Object>} - The updated booking
   */
  async updateBooking(id, bookingData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await updateDoc(docRef, {
        ...bookingData,
        updatedAt: new Date().toISOString()
      })
      return {
        id,
        ...bookingData
      }
    } catch (error) {
      console.error('Error updating booking:', error)
      throw error
    }
  },

  /**
   * DELETE - Delete a booking
   * @param {string} id - The booking ID
   * @returns {Promise<void>}
   */
  async deleteBooking(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting booking:', error)
      throw error
    }
  },

  /**
   * CHECK - Check if a room is available for the given dates
   * @param {string} hotelName - The hotel name
   * @param {string} roomNumber - The room number
   * @param {string} checkIn - Check-in date (YYYY-MM-DD)
   * @param {string} checkOut - Check-out date (YYYY-MM-DD)
   * @param {string} excludeBookingId - Optional booking ID to exclude from check (for updates)
   * @returns {Promise<boolean>} - True if available, false if double booked
   */
  async isRoomAvailable(hotelName, roomNumber, checkIn, checkOut, excludeBookingId = null) {
    try {
      const allBookings = await this.getAllBookings()
      
      const newCheckIn = new Date(checkIn)
      const newCheckOut = new Date(checkOut)
      
      // Check for overlapping bookings
      for (const booking of allBookings) {
        // Skip the current booking when editing
        if (excludeBookingId && booking.id === excludeBookingId) {
          continue
        }
        
        // Only check bookings for the same hotel and room
        if (booking.hotelName === hotelName && booking.roomNumber === roomNumber) {
          const existingCheckIn = new Date(booking.checkIn)
          const existingCheckOut = new Date(booking.checkOut)
          
          // Check for date overlap
          // Overlap occurs if: new check-in is before existing check-out AND new check-out is after existing check-in
          if (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn) {
            return false // Room is not available
          }
        }
      }
      
      return true // Room is available
    } catch (error) {
      console.error('Error checking room availability:', error)
      throw error
    }
  }
}

export default bookingsService
