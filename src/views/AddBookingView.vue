<template>
  <div class="container py-5" style="background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%); min-height: 100vh; border-radius: 8px;">
    <BackButton />
    <div class="row">
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm" style="background-color: #F5F5F5; border-top: 4px solid #28A745;">
          <div class="card-header text-white py-3" style="background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%);">
            <h2 class="card-title mb-0">Create New Booking</h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="submitForm">
          <!-- Guest Name Field -->
          <div class="mb-3">
            <label for="guestName" class="form-label" :style="{ color: errors.guestName && touched.guestName ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Guest Name (Letters only, 2-50 chars)</label>
            <input
              id="guestName"
              v-model="form.guestName"
              type="text"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.guestName && touched.guestName ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              placeholder="Enter guest name"
              @blur="validateGuestName"
              @input="validateGuestName"
            />
            <div v-if="errors.guestName && touched.guestName" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.guestName }}
            </div>
          </div>

          <!-- Hotel Name Field -->
          <div class="mb-3">
            <label for="hotelName" class="form-label" :style="{ color: errors.hotelName && touched.hotelName ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Hotel Name</label>
            <select
              id="hotelName"
              v-model="form.hotelName"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.hotelName && touched.hotelName ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              @blur="validateHotelName"
              @change="validateHotelName"
            >
              <option value="" style="background-color: #FFFFFF; color: #333;">Select a hotel</option>
              <option value="Grand Plaza Hotel" style="background-color: #FFFFFF; color: #333;">Grand Plaza Hotel</option>
              <option value="Ocean View Resort" style="background-color: #FFFFFF; color: #333;">Ocean View Resort</option>
              <option value="City Center Inn" style="background-color: #FFFFFF; color: #333;">City Center Inn</option>
            </select>
            <div v-if="errors.hotelName && touched.hotelName" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.hotelName }}
            </div>
          </div>

          <!-- Room Number Field -->
          <div class="mb-3">
            <label for="roomNumber" class="form-label" :style="{ color: errors.roomNumber && touched.roomNumber ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Room Number (Alphanumeric, 1-10 chars)</label>
            <input
              id="roomNumber"
              v-model="form.roomNumber"
              type="text"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.roomNumber && touched.roomNumber ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              placeholder="e.g., 301 or A12B"
              @blur="validateRoomNumber"
              @input="validateRoomNumber"
            />
            <div v-if="errors.roomNumber && touched.roomNumber" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.roomNumber }}
            </div>
          </div>

          <!-- Phone Number Field -->
          <div class="mb-3">
            <label for="phoneNumber" class="form-label" :style="{ color: errors.phoneNumber && touched.phoneNumber ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Phone Number (Numeric only, 8-15 digits)</label>
            <input
              id="phoneNumber"
              v-model="form.phoneNumber"
              type="text"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.phoneNumber && touched.phoneNumber ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              placeholder="e.g., 21234567"
              @blur="validatePhoneNumber"
              @input="validatePhoneNumber"
            />
            <div v-if="errors.phoneNumber && touched.phoneNumber" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.phoneNumber }}
            </div>
          </div>

          <!-- Postal Code Field -->
          <div class="mb-3">
            <label for="postalCode" class="form-label" :style="{ color: errors.postalCode && touched.postalCode ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Postal Code (Alphanumeric, 3-10 chars)</label>
            <input
              id="postalCode"
              v-model="form.postalCode"
              type="text"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.postalCode && touched.postalCode ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              placeholder="e.g., ABC123"
              @blur="validatePostalCode"
              @input="validatePostalCode"
            />
            <div v-if="errors.postalCode && touched.postalCode" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.postalCode }}
            </div>
          </div>

          <!-- Room Type Field -->
          <div class="mb-3">
            <label for="roomType" class="form-label" :style="{ color: errors.roomType && touched.roomType ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Room Type</label>
            <select
              id="roomType"
              v-model="form.roomType"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.roomType && touched.roomType ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              @blur="validateRoomType"
              @change="validateRoomType"
            >
              <option value="" style="background-color: #FFFFFF; color: #333;">Select room type</option>
              <option value="Standard" style="background-color: #FFFFFF; color: #333;">Standard</option>
              <option value="Deluxe" style="background-color: #FFFFFF; color: #333;">Deluxe</option>
              <option value="Deluxe Ocean View" style="background-color: #FFFFFF; color: #333;">Deluxe Ocean View</option>
              <option value="Executive Suite" style="background-color: #FFFFFF; color: #333;">Executive Suite</option>
              <option value="Family Room" style="background-color: #FFFFFF; color: #333;">Family Room</option>
              <option value="Penthouse" style="background-color: #FFFFFF; color: #333;">Penthouse</option>
            </select>
            <div v-if="errors.roomType && touched.roomType" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.roomType }}
            </div>
          </div>

          <!-- Check In Field -->
          <div class="mb-3">
            <label for="checkIn" class="form-label" :style="{ color: errors.checkIn && touched.checkIn ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Check In</label>
            <input
              id="checkIn"
              v-model="form.checkIn"
              type="date"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.checkIn && touched.checkIn ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              @blur="validateCheckIn"
              @change="validateCheckIn"
            />
            <div v-if="errors.checkIn && touched.checkIn" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.checkIn }}
            </div>
          </div>

          <!-- Check Out Field -->
          <div class="mb-3">
            <label for="checkOut" class="form-label" :style="{ color: errors.checkOut && touched.checkOut ? '#FFFFFF' : '#28A745', fontWeight: 600 }">Check Out</label>
            <input
              id="checkOut"
              v-model="form.checkOut"
              type="date"
              class="form-control"
              :style="{ backgroundColor: '#FFFFFF', color: '#333', border: errors.checkOut && touched.checkOut ? '2px solid #FFC107' : '2px solid #6C757D', borderRadius: '8px' }"
              @blur="validateCheckOut"
              @change="validateCheckOut"
            />
            <div v-if="errors.checkOut && touched.checkOut" class="text-white mt-1" style="font-size: 0.875rem; font-weight: 500;">
              {{ errors.checkOut }}
            </div>
          </div>

          <!-- Total Price Field -->
          <div class="mb-3">
            <label for="totalPrice" class="form-label" :style="{ color: '#28A745', fontWeight: 600 }">Total Price (Auto-calculated)</label>
            <input
              id="totalPrice"
              v-model.number="form.totalPrice"
              type="number"
              class="form-control"
              :style="{ backgroundColor: '#E8F5E9', color: '#28A745', border: '2px solid #28A745', borderRadius: '8px', fontWeight: 600 }"
              placeholder="Price will be calculated"
              disabled
            />
            <small style="color: #A8E6A1; display: block; margin-top: 5px;">Price is automatically calculated based on room type and number of nights</small>
          </div>

          <!-- Services Field -->
          <div class="mb-3">
            <label class="form-label" style="color: #28A745; font-weight: 600;">Services</label>
            <div class="form-check">
              <input
                id="breakfast"
                v-model="form.services"
                type="checkbox"
                class="form-check-input"
                style="border-color: #28A745;"
                value="breakfast"
              />
              <label class="form-check-label" for="breakfast" style="color: #A8E6A1;">Breakfast</label>
            </div>
            <div class="form-check">
              <input
                id="spa"
                v-model="form.services"
                type="checkbox"
                class="form-check-input"
                style="border-color: #28A745;"
                value="spa"
              />
              <label class="form-check-label" for="spa" style="color: #A8E6A1;">Spa</label>
            </div>
            <div class="form-check">
              <input
                id="parking"
                v-model="form.services"
                type="checkbox"
                class="form-check-input"
                style="border-color: #28A745;"
                value="parking"
              />
              <label class="form-check-label" for="parking" style="color: #A8E6A1;">Parking</label>
            </div>
            <div class="form-check">
              <input
                id="gym"
                v-model="form.services"
                type="checkbox"
                class="form-check-input"
                style="border-color: #28A745;"
                value="gym"
              />
              <label class="form-check-label" for="gym" style="color: #A8E6A1;">Gym</label>
            </div>
            <div class="form-check">
              <input
                id="airport-transfer"
                v-model="form.services"
                type="checkbox"
                class="form-check-input"
                style="border-color: #28A745;"
                value="airport-transfer"
              />
              <label class="form-check-label" for="airport-transfer" style="color: #A8E6A1;">Airport Transfer</label>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-submit"
            style="background: linear-gradient(135deg, #28A745 0%, #218838 100%); color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; border: none; transition: all 0.3s ease;"
            :disabled="submitting || !isFormValid"
          >
            {{ submitting ? 'Adding...' : 'Add Booking' }}
          </button>
          <div v-if="!isFormValid" class="text-warning mt-2" style="font-size: 0.875rem;">
            Please fill in all required fields correctly
          </div>

          <div v-if="successMessage" class="alert mt-3" style="background-color: #D4EDDA; color: #155724; border: 2px solid #28A745; border-radius: 8px; font-weight: 600;">
            {{ successMessage }}
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import bookingsService from '@/services/bookingsService.js'
import rooms from '@/data/rooms.json'

export default {
  components: {
    BackButton
  },
  data() {
    return {
      form: {
        guestName: '',
        hotelName: '',
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        totalPrice: 0,
        services: [],
        status: 'pending',
        phoneNumber: '',
        postalCode: ''
      },
      rooms: rooms,
      errors: {
        guestName: '',
        hotelName: '',
        roomNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: '',
        totalPrice: '',
        phoneNumber: '',
        postalCode: ''
      },
      touched: {
        guestName: false,
        hotelName: false,
        roomNumber: false,
        roomType: false,
        checkIn: false,
        checkOut: false,
        totalPrice: false,
        phoneNumber: false,
        postalCode: false
      },
      submitting: false,
      successMessage: ''
    }
  },
  computed: {
    isFormValid() {
      return Object.values(this.errors).every(error => error === '') &&
             this.form.guestName && 
             this.form.hotelName && 
             this.form.roomNumber && 
             this.form.roomType && 
             this.form.checkIn && 
             this.form.checkOut && 
             this.form.totalPrice > 0 &&
             this.form.phoneNumber &&
             this.form.postalCode
    }
  },
  methods: {
    calculatePrice() {
      if (!this.form.roomType || !this.form.checkIn || !this.form.checkOut) {
        this.form.totalPrice = 0
        return
      }

      const room = this.rooms.find(r => r.type === this.form.roomType)
      if (!room) return

      const checkIn = new Date(this.form.checkIn)
      const checkOut = new Date(this.form.checkOut)
      const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)))

      this.form.totalPrice = room.pricePerNight * nights
    },
    validateGuestName() {
      this.touched.guestName = true
      const name = this.form.guestName.trim()
      if (!name) {
        this.errors.guestName = 'Guest name is required'
      } else if (name.length < 2) {
        this.errors.guestName = 'Guest name must be at least 2 characters'
      } else if (name.length > 50) {
        this.errors.guestName = 'Guest name must not exceed 50 characters'
      } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        this.errors.guestName = 'Guest name must contain only letters'
      } else {
        this.errors.guestName = ''
      }
    },
    validateRoomNumber() {
      this.touched.roomNumber = true
      const room = this.form.roomNumber.trim()
      if (!room) {
        this.errors.roomNumber = 'Room number is required'
      } else if (!/^[a-zA-Z0-9]+$/.test(room)) {
        this.errors.roomNumber = 'Room number must be alphanumeric'
      } else if (room.length < 1 || room.length > 10) {
        this.errors.roomNumber = 'Room number must be 1-10 characters'
      } else {
        this.errors.roomNumber = ''
      }
    },
    validatePhoneNumber() {
      this.touched.phoneNumber = true
      const phone = this.form.phoneNumber.trim()
      if (!phone) {
        this.errors.phoneNumber = 'Phone number is required'
      } else if (!/^[0-9]+$/.test(phone)) {
        this.errors.phoneNumber = 'Phone number must contain only numbers'
      } else if (phone.length < 8 || phone.length > 15) {
        this.errors.phoneNumber = 'Phone number must be 8-15 digits'
      } else {
        this.errors.phoneNumber = ''
      }
    },
    validatePostalCode() {
      this.touched.postalCode = true
      const postal = this.form.postalCode.trim()
      if (!postal) {
        this.errors.postalCode = 'Postal code is required'
      } else if (!/^[a-zA-Z0-9]+$/.test(postal)) {
        this.errors.postalCode = 'Postal code must be alphanumeric'
      } else if (postal.length < 3 || postal.length > 10) {
        this.errors.postalCode = 'Postal code must be 3-10 characters'
      } else {
        this.errors.postalCode = ''
      }
    },
    validateHotelName() {
      this.touched.hotelName = true
      if (!this.form.hotelName) {
        this.errors.hotelName = 'Hotel name is required'
      } else {
        this.errors.hotelName = ''
      }
    },
    validateRoomType() {
      this.touched.roomType = true
      if (!this.form.roomType) {
        this.errors.roomType = 'Room type is required'
      } else {
        this.errors.roomType = ''
        this.calculatePrice()
      }
    },
    validateCheckIn() {
      this.touched.checkIn = true
      if (!this.form.checkIn) {
        this.errors.checkIn = 'Check-in date is required'
      } else {
        this.errors.checkIn = ''
        if (this.form.checkOut) this.validateCheckOut()
        this.calculatePrice()
      }
    },
    validateCheckOut() {
      this.touched.checkOut = true
      if (!this.form.checkOut) {
        this.errors.checkOut = 'Check-out date is required'
      } else if (this.form.checkIn && this.form.checkOut <= this.form.checkIn) {
        this.errors.checkOut = 'Check-out must be after check-in'
      } else {
        this.errors.checkOut = ''
        this.calculatePrice()
      }
    },
    validateTotalPrice() {
      this.touched.totalPrice = true
      if (!this.form.totalPrice || this.form.totalPrice <= 0) {
        this.errors.totalPrice = 'Price must be greater than 0'
      } else {
        this.errors.totalPrice = ''
      }
    },
    async submitForm() {
      this.submitting = true
      this.successMessage = ''
      
      try {
        // Check if room is available
        const isAvailable = await bookingsService.isRoomAvailable(
          this.form.hotelName,
          this.form.roomNumber,
          this.form.checkIn,
          this.form.checkOut
        )
        
        if (!isAvailable) {
          alert(`Room ${this.form.roomNumber} at ${this.form.hotelName} is already booked for these dates. Please select different dates or room.`)
          this.submitting = false
          return
        }
        
        await bookingsService.createBooking(this.form)
        this.successMessage = 'Booking added successfully!'
        
        // Reset form
        this.form = {
          guestName: '',
          hotelName: '',
          roomNumber: '',
          roomType: '',
          checkIn: '',
          checkOut: '',
          totalPrice: 0,
          services: [],
          status: 'pending',
          phoneNumber: '',
          postalCode: ''
        }
        this.errors = {
          guestName: '',
          hotelName: '',
          roomNumber: '',
          roomType: '',
          checkIn: '',
          checkOut: '',
          totalPrice: '',
          phoneNumber: '',
          postalCode: ''
        }
        this.touched = {
          guestName: false,
          hotelName: false,
          roomNumber: false,
          roomType: false,
          checkIn: false,
          checkOut: false,
          totalPrice: false,
          phoneNumber: false,
          postalCode: false
        }

        // Redirect to listings after 2 seconds
        setTimeout(() => {
          this.$router.push('/listings')
        }, 2000)
      } catch (error) {
        console.error('Error creating booking:', error)
        alert('Failed to add booking. Please try again.')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.btn-submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.btn-submit:not(:disabled):active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
}

.text-white {
  color: #FFFFFF !important;
}

.text-warning {
  color: #FFC107 !important;
}

.form-check-input:checked {
  background-color: #28A745 !important;
  border-color: #28A745 !important;
}

.form-check-input:focus {
  border-color: #28A745 !important;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25) !important;
}
</style>
