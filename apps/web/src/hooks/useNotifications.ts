import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '@/lib/api/socket';
import { showToastAlert } from '@/utils/toast';

type NotificationPayload = {
  userId: string;
  type: string;
  message: string;
  metadata?: {
    title: string;
  };
};

export function useNotifications(userId: string | null) {
  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket(userId);

    socket.on('notification', (payload: NotificationPayload) => {
      showToastAlert(payload.message, payload.metadata?.title! || '')
    });

    return () => {
      socket.off('notification');
      disconnectSocket();
    };
  }, [userId]);
}
