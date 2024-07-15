<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-end align-items-center mb-3">
            <button class="btn btn-primary" @click="openModalRegister">Registrar Cliente</button>
        </div>
        <ReservationForm ref="reservationForm" @open="handleOpenSeat" @data="handleDataReservation" />
        <RegisterClientModal :open="showModal" @close="handleCloseModal" />
        <SeatMap v-show="showSeat" @seatSelected="handleSeatSelected" :purchaseDetails="purchaseDetails"
            :clearSelection="clearSelection" />
        <PaymentModal :open="showPaymentModal" :purchaseDetails="purchaseDetails" @close="handleCloseModal"
            @submitPayment="handlePayment" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SeatMap from '@/components/SeatMap.vue';
import ReservationForm from '@/components/ReservationForm.vue';
import RegisterClientModal from '@/components/RegisterClientModal.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import { useStore } from '@/stores/store';

const store = useStore();
const showModal = ref(false);
const showSeat = ref(false);
const showPaymentModal = ref(false);
const clearSelection = ref(false);
const reservationForm = ref(null);

const purchaseDetails = ref({
    clientId: 0,
    clientName: "",
    lastName: "",
    flightId: 0,
    origin: "",
    destination: "",
    date: "",
    time: "",
    seatNumber: 0
});

const openModalRegister = () => {
    setTimeout(() => {
        showModal.value = false;
    }, 100);

    setTimeout(() => {
        showModal.value = true;
    }, 100);
};

const handleSeatSelected = (seat: any) => {
    console.log('Seat selected:', seat);
    purchaseDetails.value.seatNumber = seat.seatNumber;
    openPaymentModal();
};

const openPaymentModal = () => {
    setTimeout(() => {
        showPaymentModal.value = false;
    }, 100);

    setTimeout(() => {
        showPaymentModal.value = true;
    }, 100);
};

const handlePayment = (amount: number) => {
    const data = {
        clientId: purchaseDetails.value.clientId,
        reservationId: (purchaseDetails.value as any).reserveId,
        amount: amount,
        flightId: (purchaseDetails.value as any).flightId
    };
    store.payFlight(data);
    showSeat.value = false;
    clearSelection.value = true;
    (reservationForm.value as any).resetForm();
};

const handleOpenSeat = () => {
    showSeat.value = true;
    clearSelection.value = false;
};

const handleDataReservation = (data: any) => {
    purchaseDetails.value.clientId = data.client.id;
    purchaseDetails.value.clientName = data.client.firstName;
    purchaseDetails.value.lastName = data.client.lastName;
    purchaseDetails.value.flightId = data.flight.id;
    purchaseDetails.value.origin = data.flight.origin;
    purchaseDetails.value.destination = data.flight.destination;
    purchaseDetails.value.date = data.date;
    purchaseDetails.value.time = data.time;
};

const handleCloseModal = () => {
    showModal.value = false;
    showPaymentModal.value = false;
    clearSelection.value = true;
};
</script>