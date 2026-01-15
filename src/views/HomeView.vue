<template>
  <div class="container py-5" style="background: transparent;">
    <BackButton />
    <div class="row mb-5">
      <div class="col-lg-8">
        <div class="card border-0 shadow-lg" style="background: linear-gradient(135deg, #2A2A2A 0%, #1F1F1F 100%); border-top: 4px solid #28A745;">
          <div class="card-body p-5">
            <h1 class="card-title mb-3" style="color: #28A745; text-shadow: 0 0 15px rgba(40, 167, 69, 0.3);">Valletta Suites Hotel</h1>
            <h3 class="mb-4" style="color: #A8E6A1;">Booking Management System</h3>
            <p class="card-text lead" style="color: #B8E6B1;">Manage your hotel bookings efficiently. View, add, edit, and delete reservations with ease.</p>
            <div class="d-flex gap-3 mt-4">
              <RouterLink to="/listings" class="btn btn-lg btn-animated" style="background: linear-gradient(135deg, #28A745 0%, #218838 100%); color: white; border: none; border-radius: 8px; font-weight: 600; padding: 12px 28px; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); transition: all 0.3s ease;">
                View Bookings
              </RouterLink>
              <RouterLink to="/add-booking" class="btn btn-lg btn-animated-outline" style="background-color: #1A1A1A; color: #28A745; border: 2px solid #28A745; border-radius: 8px; font-weight: 600; padding: 12px 28px; transition: all 0.3s ease;">
                New Booking
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="background-color: #2A2A2A; border-left: 4px solid #28A745;">
          <div class="card-body">
            <h5 class="card-title" style="color: #28A745; font-weight: 600;">Easy Management</h5>
            <p class="card-text" style="color: #A8E6A1;">Quickly manage all your hotel bookings in one place.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="background-color: #2A2A2A; border-left: 4px solid #28A745;">
          <div class="card-body">
            <h5 class="card-title" style="color: #28A745; font-weight: 600;">Complete Details</h5>
            <p class="card-text" style="color: #A8E6A1;">Track rooms, guests, services, and booking status.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="background-color: #2A2A2A; border-left: 4px solid #28A745;">
          <div class="card-body">
            <h5 class="card-title" style="color: #28A745; font-weight: 600;">Real-time Updates</h5>
            <p class="card-text" style="color: #A8E6A1;">All changes are saved instantly to the database.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    BackButton,
    RouterLink
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4) !important;
}

/* Button animations */
.btn-animated:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.5) !important;
}

.btn-animated:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3) !important;
}

.btn-animated-outline:hover {
  background-color: #2C2C2C !important;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-animated-outline:active {
  transform: translateY(-1px) scale(0.98);
}
</style>
