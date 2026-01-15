<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import BackButton from "../components/BackButton.vue"
import bookingsService from "../services/bookingsService"

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = reactive({
  guestName: "",
  hotelName: "",
  roomNumber: "",
  roomType: "",
  checkIn: "",
  checkOut: "",
  totalPrice: 0,
  services: [],
  status: "",
})

const loading = ref(false)
const saving = ref(false)
const error = ref("")

async function loadOne() {
  try {
    loading.value = true
    error.value = ""
    const booking = await bookingsService.getBookingById(id)
    if (!booking) {
      error.value = "Booking not found"
      return
    }
    form.guestName = booking.guestName ?? ""
    form.hotelName = booking.hotelName ?? ""
    form.roomNumber = String(booking.roomNumber ?? "")
    form.roomType = booking.roomType ?? ""
    form.checkIn = booking.checkIn ?? ""
    form.checkOut = booking.checkOut ?? ""
    form.totalPrice = booking.totalPrice ?? 0
    form.services = Array.isArray(booking.services) ? booking.services : []
    form.status = booking.status ?? ""
  } catch (e) {
    error.value = e.message || "Failed to load booking"
  } finally {
    loading.value = false
  }
}

async function submit() {
  try {
    saving.value = true
    error.value = ""
    
    // Check if room is available (excluding current booking)
    const isAvailable = await bookingsService.isRoomAvailable(
      form.hotelName,
      form.roomNumber,
      form.checkIn,
      form.checkOut,
      id
    )
    
    if (!isAvailable) {
      error.value = `Room ${form.roomNumber} at ${form.hotelName} is already booked for these dates. Please select different dates or room.`
      saving.value = false
      return
    }
    
    await bookingsService.updateBooking(id, {
      guestName: form.guestName,
      hotelName: form.hotelName,
      roomNumber: form.roomNumber,
      roomType: form.roomType,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      totalPrice: Number(form.totalPrice),
      services: form.services,
      status: form.status,
    })
    router.push("/listings")
  } catch (e) {
    error.value = e.message || "Failed to update booking"
  } finally {
    saving.value = false
  }
}

onMounted(loadOne)
</script>

<template>
  <div class="container py-5" style="background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%); min-height: 100vh; border-radius: 8px;">
    <BackButton />
    
    <div class="row">
      <div class="col-lg-7">
        <div class="card border-0 shadow-sm" style="background-color: #F5F5F5; border-top: 4px solid #28A745;">
          <div class="card-header py-3" style="background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%); color: white;">
            <h2 class="card-title mb-0">Edit Booking</h2>
          </div>
          
          <div v-if="error" class="alert alert-danger m-3 mb-0" style="background-color: #FFE5E5; color: #C44545; border: 2px solid #FF8C8C; border-radius: 8px;">{{ error }}</div>
          
          <div v-if="loading" class="card-body text-center py-5">
            <div class="spinner-border" style="color: #28A745;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p style="color: #333; margin-top: 0.5rem;">Loading booking details...</p>
          </div>

          <div v-if="!loading" class="card-body p-4">
            <form class="row g-3" @submit.prevent="submit">
      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Guest Name</label>
        <input v-model="form.guestName" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required />
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Hotel Name</label>
        <select v-model="form.hotelName" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required>
          <option value="" style="background-color: #FFFFFF; color: #333;">Select a hotel</option>
          <option value="Grand Plaza Hotel" style="background-color: #FFFFFF; color: #333;">Grand Plaza Hotel</option>
          <option value="Ocean View Resort" style="background-color: #FFFFFF; color: #333;">Ocean View Resort</option>
          <option value="City Center Inn" style="background-color: #FFFFFF; color: #333;">City Center Inn</option>
        </select>
      </div>

      <div class="col-md-4">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Room Number</label>
        <input v-model="form.roomNumber" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required />
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Room Type</label>
        <select v-model="form.roomType" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required>
          <option value="">Select room type</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Deluxe Ocean View">Deluxe Ocean View</option>
          <option value="Executive Suite">Executive Suite</option>
          <option value="Family Room">Family Room</option>
          <option value="Penthouse">Penthouse</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Check In</label>
        <input v-model="form.checkIn" type="date" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required />
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Check Out</label>
        <input v-model="form.checkOut" type="date" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required />
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Total Price</label>
        <input v-model="form.totalPrice" type="number" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required />
      </div>

      <div class="col-md-6">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Status</label>
        <select v-model="form.status" class="form-control" style="background-color: #FFFFFF; color: #333; border: 2px solid #6C757D; border-radius: 8px;" required>
          <option value="">Select status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label" style="color: #28A745; font-weight: 600;">Services</label>
        <div class="form-check">
          <input
            id="edit-breakfast"
            v-model="form.services"
            type="checkbox"
            class="form-check-input"
            style="border-color: #28A745;"
            value="breakfast"
          />
          <label class="form-check-label" for="edit-breakfast" style="color: #A8E6A1;">Breakfast</label>
        </div>
        <div class="form-check">
          <input
            id="edit-spa"
            v-model="form.services"
            type="checkbox"
            class="form-check-input"
            style="border-color: #28A745;"
            value="spa"
          />
          <label class="form-check-label" for="edit-spa" style="color: #A8E6A1;">Spa</label>
        </div>
        <div class="form-check">
          <input
            id="edit-parking"
            v-model="form.services"
            type="checkbox"
            class="form-check-input"
            style="border-color: #28A745;"
            value="parking"
          />
          <label class="form-check-label" for="edit-parking" style="color: #A8E6A1;">Parking</label>
        </div>
        <div class="form-check">
          <input
            id="edit-gym"
            v-model="form.services"
            type="checkbox"
            class="form-check-input"
            style="border-color: #28A745;"
            value="gym"
          />
          <label class="form-check-label" for="edit-gym" style="color: #A8E6A1;">Gym</label>
        </div>
        <div class="form-check">
          <input
            id="edit-airport-transfer"
            v-model="form.services"
            type="checkbox"
            class="form-check-input"
            style="border-color: #28A745;"
            value="airport-transfer"
          />
          <label class="form-check-label" for="edit-airport-transfer" style="color: #A8E6A1;">Airport Transfer</label>
        </div>
      </div>

      <div class="col-12">
        <button class="btn" style="background: linear-gradient(135deg, #28A745 0%, #218838 100%); color: white; font-weight: 600; padding: 12px 32px; border-radius: 8px; border: none;" :disabled="saving">
          {{ saving ? "Saving..." : "Update Booking" }}
        </button>
      </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-check-input:checked {
  background-color: #28A745 !important;
  border-color: #28A745 !important;
}

.form-check-input:focus {
  border-color: #28A745 !important;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25) !important;
}
</style>

<style scoped>
.form-check-input:checked {
  background-color: #28A745 !important;
  border-color: #28A745 !important;
}

.form-check-input:focus {
  border-color: #28A745 !important;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25) !important;
}
</style>
