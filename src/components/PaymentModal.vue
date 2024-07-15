<template>
    <div class="modal fade" ref="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true"
        @hidden.bs.modal="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentModalLabel">Pago</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitPayment">
                        <div class="mb-3">
                            <label for="paymentAmount" class="form-label">Monto de Pagos</label>
                            <input type="number" v-model="paymentAmount" class="form-control" id="paymentAmount"
                                required />
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mb-3">Pago</button>
                    </form>
                    <h5>Detalles de la compra</h5>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Nombre Cliente:</strong> {{ purchaseDetails.clientName }} {{ purchaseDetails.lastName }}</li>
                        <li class="list-group-item"><strong>Origin Vuelo:</strong> {{ purchaseDetails.origin }}</li>
                        <li class="list-group-item"><strong>Destino Vuelo:</strong> {{ purchaseDetails.destination }}</li>
                        <li class="list-group-item"><strong>Fecha:</strong> {{ purchaseDetails.date }}</li>
                        <li class="list-group-item"><strong>Hora:</strong> {{ purchaseDetails.time }}</li>
                        <li class="list-group-item"><strong>Numero de Asiento:</strong> {{ purchaseDetails.seatNumber }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import { Modal } from 'bootstrap';
import { useStore } from '@/stores/store'

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    purchaseDetails: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['close', 'submitPayment']);
const store = useStore()

const paymentModal = ref<HTMLElement | null>(null);
const paymentAmount = ref<number | null>(null);
let bootstrapModal: Modal | null = null;

const submitPayment = () => {
    if (paymentAmount.value !== null) {
        emit('submitPayment', paymentAmount.value);
        paymentAmount.value = null; // Reset the payment amount
        emit('close');
    }
};

const closeModal = () => {
    store.cancelFlight(props.purchaseDetails)
    if (bootstrapModal) {
        bootstrapModal.hide();
    }
    emit('close');
};

watch(() => props.open, (newVal) => {
    if (paymentModal.value) {
        if (newVal) {
            bootstrapModal = new Modal(paymentModal.value);
            bootstrapModal.show();
        } else {
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    }
});
</script>

<style scoped>
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>