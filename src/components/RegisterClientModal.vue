<template>
    <div class="modal fade" ref="modal" tabindex="-1" aria-labelledby="registerClientModalLabel" aria-hidden="true"
        @hidden.bs.modal="handleModalHidden">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="registerClientModalLabel">Registrar Cliente</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleAddClients">
                        <div class="form-group mb-3">
                            <label for="firstName" class="form-label">First Name:</label>
                            <input type="text" v-model="form.firstName" class="form-control" required />
                        </div>
                        <div class="form-group mb-3">
                            <label for="lastName" class="form-label">Last Name:</label>
                            <input type="text" v-model="form.lastName" class="form-control" required />
                        </div>
                        <div class="form-group mb-3">
                            <label for="identityDocument" class="form-label">Identity Document:</label>
                            <input type="text" v-model="form.identityDocument" class="form-control" required />
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
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
});
const emit = defineEmits(['close']);

const modal = ref<HTMLElement | null>(null);
let bootstrapModal: Modal | null = null;
const store = useStore()

const form = {
    firstName: "",
    lastName: "",
    identityDocument: ""
}

const closeModal = () => {
    if (bootstrapModal) {
        bootstrapModal.hide();
    }
    emit('close');
};

const handleModalHidden = () => {
    emit('close');
};

watch(() => props.open, (newVal) => {
    if (modal.value) {
        if (newVal) {
            bootstrapModal = new Modal(modal.value);
            bootstrapModal.show();
        } else {
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    }
});

const handleAddClients = async () => {
    await store.addClients(form)
    closeModal();

    // console.log("CLIENTS", store.clients)
}

</script>

<style scoped>
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>