"use client";

import { useState } from "react";

const BASE_URL = "https://sandboxportalapi.abiapay.ng/api/v1/";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: Method;
  headers?: Record<string, string>;
  body?: any;
}

export function useApi() {
  const [loading, setLoading] = useState(false);

  async function request<T = any>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<{ data: T | null; error: string | null }> {
    setLoading(true);

    const { method = "GET", headers = {}, body } = options;

    try {
      const response = await fetch(BASE_URL + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data.message === "string"
            ? data.message
            : typeof data.message === "object"
            ? Object.values(data.message).join(", ")
            : "Request failed";

        return { data: null, error: errorMessage };
      }

      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: err.message || "Network error",
      };
    } finally {
      setLoading(false);
    }
  }

  return { request, loading };
}
