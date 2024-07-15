<template>
    <div class="container mt-5">
        <div class="d-flex justify-content-end align-items-center mb-3">
            <button class="btn btn-primary" @click="openModalRegister">Register Client</button>
        </div>
        <ReservationForm @open="handleOpenSeat" @data="handleDataReservation" />
        <RegisterClientModal :open="showModal" @close="handleCloseModal" />
        <SeatMap v-show="showSeat" @seatSelected="handleSeatSelected" :purchaseDetails="purchaseDetails" />
        <PaymentModal :open="showPaymentModal" :purchaseDetails="purchaseDetails" @close="handleCloseModal"
            @submitPayment="handlePayment" />

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SeatMap from '@/components/SeatMap.vue'
import ReservationForm from '@/components/ReservationForm.vue';
import RegisterClientModal from '@/components/RegisterClientModal.vue';
import PaymentModal from '@/components/PaymentModal.vue';
import { useStore } from '@/stores/store'

const store = useStore()
const showModal = ref(false);
const showSeat = ref(false);
const showPaymentModal = ref(false);
// const dataClient = ref({})

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
    // Update purchase details with the selected seat
    purchaseDetails.value.seatNumber = seat.seatNumber;
    // console.log("DATA CLIENTS", purchaseDetails.value)
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
    // console.log('Payment received:', amount);
    const data = {
        clientId: purchaseDetails.value.clientId,
        reservationId: (purchaseDetails.value as any).reserveId,
        amount: amount,
        flightId: (purchaseDetails.value as any).flightId
    }
    // console.log("DATA PAYMENT", data)
    store.payFlight(data)
    showSeat.value = false;
    // Implement the payment processing logic here
};

const handleOpenSeat = () => {
    showSeat.value = true;
};

const handleDataReservation = (data: any) => {
    // console.log("DATA RESERVATION", data)
    purchaseDetails.value.clientId = data.client.id
    purchaseDetails.value.clientName = data.client.firstName
    purchaseDetails.value.lastName = data.client.lastName
    purchaseDetails.value.flightId = data.flight.id
    purchaseDetails.value.origin = data.flight.origin
    purchaseDetails.value.destination = data.flight.destination
    purchaseDetails.value.date = data.date
    purchaseDetails.value.time = data.time
    // date: (dataClient.value as any).date,
    // time: (dataClient.value as any).time,
};

const handleCloseModal = () => {
    showModal.value = false;
    showPaymentModal.value = false;
};
</script>