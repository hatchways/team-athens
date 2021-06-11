import { useSocket } from '../../context/useSocketContext';
import { useState } from 'react';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function InWebNotification(): JSX.Element {
  const { socket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();
  const [notification, setNotification] =
    useState<{ message: any; title: string; date: Date } | null | undefined>(null);

  socket?.on('notification', (_notification_) => {
    console.log(socket.id);
    setNotification(_notification_);
    updateSnackBarMessage(_notification_?.message);
  });
  return <div></div>;
}
