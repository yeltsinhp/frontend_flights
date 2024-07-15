<template>
    <div class="card p-4">
        <form @submit.prevent="reserveFlight">
            <div class="row">
                <div class="form-group col-md-2 mb-3">
                    <label for="client" class="form-label">Client:</label>
                    <select v-model="selectedClientId" class="form-control" required>
                        <option v-for="client in store.clients" :key="client.id" :value="client.id">{{ client.firstName
                            }} {{ client.lastName }}</option>
                    </select>
                </div>

                <div class="form-group col-md-4 mb-3">
                    <label for="flight" class="form-label">Flight:</label>
                    <select v-model="selectedFlightId" class="form-control" required>
                        <option v-for="flight in store.flights" :key="flight.id" :value="flight.id">{{ flight.origin }}
                            - {{ flight.destination }}</option>
                    </select>
                </div>

                <div class="form-group col-md-2 mb-3">
                    <label for="date" class="form-label">Date:</label>
                    <input type="date" v-model="date" class="form-control" required />
                </div>

                <div class="form-group col-md-2 mb-3">
                    <label for="time" class="form-label">Time:</label>
                    <input type="time" v-model="time" class="form-control" required />
                </div>

                <div class="form-group col-md-2 d-flex align-items-end mb-3">
                    <button type="submit" class="btn btn-primary w-100">Reserve</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useStore } from '@/stores/store'

const emit = defineEmits(['open', 'data']);

onMounted(() => {
    handleListClients();
    handleListFlights()
});

const selectedClientId = ref<number | null>(null);
const selectedFlightId = ref<number | null>(null);
const date = ref<string>('');
const time = ref<string>('');
const store = useStore()

// Watch for changes in selectedFlightId and update date and time accordingly
watch(selectedFlightId, (newFlightId) => {
    const selectedFlight = store.flights.find((flight: any) => flight.id === newFlightId);
    if (selectedFlight) {
        date.value = selectedFlight.date;
        time.value = selectedFlight.time;
    } else {
        date.value = '';
        time.value = '';
    }
});

const reserveFlight = async() => {
    const selectedClient = store.clients.find((client: any) => client.id === selectedClientId.value);
    const selectedFlight = store.flights.find((flight: any) => flight.id === selectedFlightId.value);

    if (selectedClient && selectedFlight && date.value && time.value) {
        const reservationDetails = {
            client: selectedClient,
            flight: selectedFlight,
            date: date.value,
            time: time.value,
        };
        // console.log('Reservation details:', reservationDetails);
        emit('data', reservationDetails)
        // await store.reserveFlight(reservationDetails)
        // alert('Reservation successful!');
        emit('open');
    }
};

const handleListClients = async () => {
    await store.fetchClients()
    // console.log("CLIENTS", store.clients)
}

const handleListFlights = async () => {
    await store.fetchFlights()
    // console.log("CLIENTS", store.clients)
}
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.card {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>