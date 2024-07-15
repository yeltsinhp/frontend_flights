import { defineStore } from "pinia";
import api from "../services/api";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
// }

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
      try {
        await api.post("/register", client);
        await this.fetchClients(); // Refresh the product list
      } catch (error) {
        console.error("Failed to add client", error);
      }
    },
    async reserveFlight(data: any) {
      try {
        const result = await api.post("/reserve", data);
        // console.log("STORE RESERVE", result)
        return result.data
        // await this.fetchClients();
      } catch (error) {
        console.error("Failed to add reserve", error);
      }
    },
    async payFlight(data: any) {
      try {
        const result = await api.post("/pay", data);
        // console.log("DATA PAY", data)
        await this.fetchSeats(data.flightId)
        // console.log("STORE RESERVE", result)
        return result.data
        // await this.fetchClients();
      } catch (error) {
        console.error("Failed to add pay", error);
      }
    },
    async cancelFlight(data: any) {
      try {
        const result = await api.post("/cancel", data);
        await this.fetchSeats(data.flightId)
        // console.log("STORE RESERVE", result)
        return result.data
        // await this.fetchClients();
      } catch (error) {
        console.error("Failed to add pay cancel", error);
      }
    },
  },
});
