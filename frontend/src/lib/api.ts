/**
 * Axios instance pre-configured to talk to the FastAPI backend.
 *
 * Usage:
 *   import api from "@/lib/api";
 *   const { data } = await api.get("/posts");
 */

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token from localStorage on every request if present
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
