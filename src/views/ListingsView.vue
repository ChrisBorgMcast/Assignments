<template>
  <!-- View all bookings in a table -->
  <div class="container py-5" style="background: linear-gradient(135deg, #1F1F1F 0%, #2C2C2C 100%); min-height: 100vh; border-radius: 8px;">
    <BackButton />
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0" style="color: #28A745; font-weight: 700; text-shadow: 0 0 15px rgba(40, 167, 69, 0.3);">Hotel Bookings</h1>
      <RouterLink to="/add-booking" class="btn btn-new-booking" style="background: linear-gradient(135deg, #28A745 0%, #218838 100%); color: white; font-weight: 600; padding: 10px 24px; border-radius: 8px; border: none; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); transition: all 0.3s ease;">
        + New Booking
      </RouterLink>
    </div>
    
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" style="color: #28A745;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p style="color: #A8E6A1; margin-top: 0.5rem;">Loading bookings...</p>
    </div>

    <div v-else-if="bookings.length === 0" class="alert alert-dismissible fade show" role="alert" style="background-color: #2A2A2A; color: #A8E6A1; border: 2px solid #28A745; border-radius: 8px;">
      <strong>No bookings found.</strong> Start by creating a new booking.
    </div>

    <div v-else class="card border-0 shadow-sm" style="background-color: #2A2A2A; border-radius: 12px;">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0" style="color: #A8E6A1;">
      <thead style="background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%);">
        <tr>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Guest Name</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Hotel</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Room</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Room Type</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Check In</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Check Out</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Services</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Price</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Status</th>
          <th class="fw-bold" style="color: #28A745; text-shadow: 0 0 8px rgba(40, 167, 69, 0.3);">Actions</th>
        </tr>
      </thead>
      <TransitionGroup name="list-item" tag="tbody">
        <tr v-for="booking in bookings" :key="booking.id" style="border-bottom: 1px solid #3A3A3A;" class="booking-row">
          <td>{{ formatUpperLower(booking.guestName) }}</td>
          <td>{{ getFirst3(booking.hotelName) }}</td>
          <td>{{ booking.roomNumber }}</td>
          <td>{{ toLowerCase(booking.roomType) }}</td>
          <td>{{ booking.checkIn }}</td>
          <td>{{ booking.checkOut }}</td>
          <td>
            <span v-if="booking.services && booking.services.length > 0" class="badge" style="background-color: #28A745; color: white;">
              {{ booking.services.length }} services
            </span>
            <span v-else class="badge" style="background-color: #6C757D; color: white;">None</span>
          </td>
          <td>{{ formatPrice(booking.totalPrice) }}</td>
          <td>{{ formatStatus(booking.status) }}</td>
          <td>
            <RouterLink 
              class="btn btn-sm" 
              style="background: linear-gradient(135deg, #28A745 0%, #218838 100%); color: white; font-weight: 600; margin-right: 8px;"
              :to="`/edit/${booking.id}`"
            >
              Edit
            </RouterLink>
            <button 
              class="btn btn-sm" 
              style="background-color: #DC3545; color: white; font-weight: 600;"
              @click="deleteBooking(booking.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </TransitionGroup>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import bookingsService from '@/services/bookingsService.js'

export default {
  components: {
    BackButton,
    RouterLink
  },
  data() {
    return {
      bookings: [],
      loading: false,
      deletingId: null
    }
  },
  mounted() {
    this.fetchBookings()
  },
  methods: {
    async fetchBookings() {
      this.loading = true
      try {
        this.bookings = await bookingsService.getAllBookings()
      } catch (error) {
        console.error('Error fetching bookings:', error)
        alert('Failed to load bookings. Please try again.')
      } finally {
        this.loading = false
      }
    },
    async deleteBooking(id) {
      if (confirm('Are you sure you want to delete this booking?')) {
        try {
          this.deletingId = id
          await bookingsService.deleteBooking(id)
          setTimeout(() => {
            this.bookings = this.bookings.filter(b => b.id !== id)
            this.deletingId = null
          }, 100)
          setTimeout(() => {
            alert('Booking deleted successfully!')
          }, 500)
        } catch (error) {
          console.error('Error deleting booking:', error)
          alert('Failed to delete booking. Please try again.')
          this.deletingId = null
        }
      }
    },

    trimText(text) {
      return String(text ?? '').trim()
    },
    toUpperCase(text) {
      return this.trimText(text).toUpperCase()
    },
    toLowerCase(text) {
      return this.trimText(text).toLowerCase()
    },
    getFirst3(text) {
      return this.trimText(text).slice(0, 3)
    },
    addPlusSign(value) {
      return `+${value}`
    },
    formatUpperLower(text) {
      const trimmed = this.trimText(text)
      const mid = Math.ceil(trimmed.length / 2)
      return trimmed.substring(0, mid).toUpperCase() + trimmed.substring(mid).toLowerCase()
    },
    formatPrice(price) {
      return this.addPlusSign(`$${Number(price).toFixed(2)}`)
    },
    formatStatus(status) {
      return this.addPlusSign(this.trimText(status))
    }
  }
}
</script>

<style scoped>
table {
  margin-top: 20px;
}

/* List item animations */
.list-item-enter-active {
  animation: slideInFade 0.5s ease-out;
}

.list-item-leave-active {
  animation: slideOutFade 0.4s ease-in;
  position: absolute;
  width: 100%;
}

.list-item-move {
  transition: transform 0.5s ease;
}

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideOutFade {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(30px) scale(0.95);
    background-color: rgba(220, 53, 69, 0.1);
  }
}

/* Button animations */
.btn-sm {
  transition: all 0.3s ease;
}

.btn-sm:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.btn-sm:active {
  transform: translateY(0) scale(0.98);
}

/* Row hover effect */
.booking-row {
  transition: background-color 0.2s ease;
}

.booking-row:hover {
  background-color: rgba(40, 167, 69, 0.05) !important;
}

/* New Booking button animation */
.btn-new-booking:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.5) !important;
}

.btn-new-booking:active {
  transform: translateY(-1px) scale(0.98);
}
</style>
