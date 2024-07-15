<template>
    <div class="card p-4">
        <form @submit.prevent="reserveFlight">
            <div class="row">
                <div class="form-group col-md-2 mb-3">
                    <label for="client" class="form-label">Cliente:</label>
                    <select v-model="selectedClientId" class="form-control" required>
                        <option v-for="client in store.clients" :key="client.id" :value="client.id">{{ client.firstName
                            }} {{ client.lastName }}</option>
                    </select>
                </div>

                <div class="form-group col-md-4 mb-3">
                    <label for="flight" class="form-label">Vuelo:</label>
                    <select v-model="selectedFlightId" class="form-control" required>
                        <option v-for="flight in store.flights" :key="flight.id" :value="flight.id">{{ flight.origin }}
                            - {{ flight.destination }}</option>
                    </select>
                </div>

                <div class="form-group col-md-2 mb-3">
                    <label for="date" class="form-label">Fecha:</label>
                    <input type="date" v-model="date" class="form-control" required disabled />
                </div>

                <div class="form-group col-md-2 mb-3">
                    <label for="time" class="form-label">Hora:</label>
                    <input type="time" v-model="time" class="form-control" required disabled />
                </div>

                <div class="form-group col-md-2 d-flex align-items-end mb-3">
                    <button type="submit" class="btn btn-primary w-100">Reservar</button>
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

const reserveFlight = async () => {
    const selectedClient = store.clients.find((client: any) => client.id === selectedClientId.value);
    const selectedFlight = store.flights.find((flight: any) => flight.id === selectedFlightId.value);

    if (selectedClient && selectedFlight && date.value && time.value) {
        const reservationDetails = {
            client: selectedClient,
            flight: selectedFlight,
            date: date.value,
            time: time.value,
        };
        emit('data', reservationDetails)
        emit('open');
    }
};

const handleListClients = async () => {
    await store.fetchClients()
}

const handleListFlights = async () => {
    await store.fetchFlights()
}

const resetForm = () => {
    selectedClientId.value = null;
    selectedFlightId.value = null;
    date.value = '';
    time.value = '';
};

defineExpose({ resetForm });
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