import React from 'react';
import { getSocket } from '../services/socket';

export function useSocket(event: string, handler: (payload: any) => void) {
  React.useEffect(() => {
    const socket = getSocket();
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}
