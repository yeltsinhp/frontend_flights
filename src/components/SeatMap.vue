<template>
    <div class="card">
        <div class="card-header text-center">
            Select Seat
        </div>
        <div class="card-body">
            <div class="seat-map">
                <div v-for="row in rows" :key="row" class="seat-row">
                    <div v-for="seat in getSeatsForRow(row)" :key="seat.id" class="seat"
                        :class="{ reserved: seat.status === 'reserved', available: seat.status === 'available', selected: isSelected(seat) }"
                        @click="handleSeatClick(seat)">
                        {{ seat.seatNumber }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted, watch } from 'vue';
import { useStore } from '@/stores/store'

const store = useStore()

const rows = computed(() => {
    const rowCount = Math.ceil(store.seats.length / columns.value);
    return Array.from({ length: rowCount }, (_, i) => i + 1);
});

const columns = ref(5);

const selectedSeat = ref(null);

const props = defineProps({
    purchaseDetails: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['seatSelected']);

watch(props.purchaseDetails, () => {
    handleListSeats()
});

const handleListSeats = async () => {
    await store.fetchSeats(props.purchaseDetails.flightId)
}

const getSeatsForRow = (row: any) => {
    const start = (row - 1) * columns.value;
    const end = row * columns.value;
    return store.seats.slice(start, end);
};

const isSelected = (seat: any) => {
    return selectedSeat.value && (selectedSeat.value as any).id === seat.id;
};

const handleSeatClick = async (seat: any) => {
    if (seat.status === 'reserved') {
        return;
    }

    if (isSelected(seat)) {
        selectedSeat.value = null; // Deselect the seat if it's already selected
    } else {
        selectedSeat.value = seat; // Select the new seat

        const data = {
            clientId: props.purchaseDetails.clientId,
            flightId: props.purchaseDetails.flightId,
            seatNumber: (selectedSeat.value as any).seatNumber
        }
        const reserveData = await store.reserveFlight(data)
        props.purchaseDetails.reserveId = reserveData.id
        // console.log("RESERVE DATA", reserveData)
        // console.log("SELECT SEAT", data)
        // console.log("SELECT SEAT 2", props.purchaseDetails)
        emit('seatSelected', seat); // Emit the event with the selected seat
    }
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.card-header {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
}

.seat-map {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.seat-row {
    display: flex;
    margin-bottom: 10px;
}

.seat {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.seat.available {
    background-color: #ddd;
}

.seat.reserved {
    background-color: red;
    cursor: not-allowed;
}

.seat.selected {
    background-color: green;
}
</style>