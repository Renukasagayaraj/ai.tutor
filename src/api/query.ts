import { cookie } from "@/hooks/auth";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const createSession = async () => {
  try {
    const response = await axios.post(baseUrl + "/createsession", {
      email: cookie.get("email") || null,
    });
    return response.data.id;
  } catch (e) {
    return e;
  }
};

export const createChat = async (question: string, sessionId: string) => {
  try {
    const response = await axios.post(baseUrl + "/question", {
      question: question,
      sessionId: sessionId,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const sessionHistory = async (sessionId: string) => {
  try {
    const response = await axios.get(baseUrl + "/user/session/" + sessionId);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const login_user = async (
  email: string,
  name: string,
  avatar: string
) => {
  try {
    const response = await axios.post(baseUrl + "/login", {
      email: email,
      name: name,
      avatar: avatar,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const get_user = async () => {
  try {
    const response = await axios.get(baseUrl + "/user/", {
      params: {
        email: cookie.get("email") || null,
      },
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const get_user_history = async () => {
  try {
    const response = await axios.get(baseUrl + "/user/history/", {
      params: {
        email: cookie.get("email") || null,
      },
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const clear_history = async () => {
  try {
    const response = await axios.post(baseUrl + "/user/history/clear", {
      email: cookie.get("email") || null,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};
