import { defineStore } from "pinia";
import api from "../services/api";
import { useToast } from "vue-toastification";

export const useStore = defineStore("stores", {
  state: () => ({
    clients: [] as any,
    flights: [] as any,
    seats: [] as any,
  }),
  actions: {
    async fetchClients() {
      try {
        const response = await api.get("/client");
        this.clients = response.data;
      } catch (error) {
        console.error("Failed to load clients", error);
      }
    },
    async fetchFlights() {
      try {
        const response = await api.get("/flights");
        this.flights = response.data;
      } catch (error) {
        console.error("Failed to load flights", error);
      }
    },
    async fetchSeats(flightId: any) {
      try {
        const response = await api.get("/seats?flightId=" + flightId);
        this.seats = response.data;
      } catch (error) {
        console.error("Failed to load seats", error);
      }
    },
    async addClients(client: any) {
      const toast = useToast();
      try {
        await api.post("/register", client);
        await this.fetchClients();
        toast.success("Cliente agregado exitosamente");
      } catch (error) {
        console.error("Failed to add client", error);
        toast.error("No se pudo agregar el cliente");
      }
    },
    async reserveFlight(data: any) {
      const toast = useToast();
      try {
        const result = await api.post("/reserve", data);
        toast.success("Vuelo reservado con éxito");
        return result.data;
      } catch (error) {
        console.error("Failed to add reserve", error);
        toast.error("No se pudo reservar el vuelo");
      }
    },
    async payFlight(data: any) {
      const toast = useToast();
      try {
        const result = await api.post("/pay", data);
        await this.fetchSeats(data.flightId);
        toast.success("Pago procesado exitosamente");
        return result.data;
      } catch (error) {
        console.error("Failed to add pay", error);
        toast.error("No se pudo procesar el pago");
      }
    },
    async cancelFlight(data: any) {
      const toast = useToast();
      try {
        const result = await api.post("/cancel", data);
        await this.fetchSeats(data.flightId);
        toast.success("Reserva de vuelo cancelada con éxito");
        return result.data;
      } catch (error) {
        console.error("Failed to add pay cancel", error);
        toast.error("No se pudo cancelar la reserva de vuelo");
      }
    },
  },
});
