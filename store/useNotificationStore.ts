import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { getToken } from "@/app/lib/utils";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  created_at: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  socket: Socket | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  socket: null,

  fetchNotifications: async () => {
    try {
      const token = getToken("accessToken");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/unread`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      set({ notifications: data, unreadCount: data.length });
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  },

  markAsRead: async (id: number) => {
    try {
      const token = getToken("accessToken");
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      set((state) => {
        const newNotifications = state.notifications.filter(n => n.id !== id);
        return { notifications: newNotifications, unreadCount: newNotifications.length };
      });
    } catch (error) {
      console.error("Error marking as read", error);
    }
  },

  connectSocket: () => {
    const currentSocket = get().socket;
    if (currentSocket) return;

    const socketUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Assuming backend is on port 3000
    const newSocket = io(socketUrl);

    newSocket.on("connect", () => {
      console.log("WebSocket connected for notifications");
    });

    newSocket.on("newNotification", (notification: Notification) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
