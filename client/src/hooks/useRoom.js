import { useCallback } from 'react';
import useRoomStore from '../store/roomStore';

export default function useRoom(roomCode) {
  const {
    currentRoom,
    setCurrentRoom,
    getMessages,
    sendMessage,
    addReaction,
    isTyping,
    setTyping,
  } = useRoomStore();

  const roomMessages = getMessages(roomCode);

  const send = useCallback((text) => {
    if (!text.trim()) return;
    sendMessage(roomCode, text);
  }, [roomCode, sendMessage]);

  const react = useCallback((messageId, emoji) => {
    addReaction(messageId, emoji);
  }, [addReaction]);

  return {
    room: currentRoom,
    messages: roomMessages,
    send,
    react,
    isTyping,
    setTyping,
    setCurrentRoom,
  };
}
