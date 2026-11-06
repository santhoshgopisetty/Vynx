import { create } from 'zustand';
import { mockRooms } from '../mock/rooms';
import { mockRoomMessages } from '../mock/messages';

const useRoomStore = create((set, get) => ({
  currentRoom: null,
  rooms: mockRooms,
  messages: mockRoomMessages,
  isTyping: false,

  setCurrentRoom: (roomCode) => {
    const room = get().rooms.find(r => r.code === roomCode);
    set({ currentRoom: room || null });
  },

  getMessages: (roomId) => {
    return get().messages.filter(m => m.roomId === roomId);
  },

  sendMessage: (roomId, text, senderName = 'Santhosh') => {
    const newMsg = {
      id: `rmsg-${Date.now()}`,
      roomId,
      senderId: 'user-001',
      senderName,
      text,
      timestamp: new Date().toISOString(),
      type: 'message',
      reactions: [],
    };
    set((state) => ({
      messages: [...state.messages, newMsg],
    }));
    return newMsg;
  },

  addReaction: (messageId, emoji) => {
    set((state) => ({
      messages: state.messages.map(m =>
        m.id === messageId
          ? { ...m, reactions: m.reactions.includes(emoji) ? m.reactions.filter(r => r !== emoji) : [...m.reactions, emoji] }
          : m
      ),
    }));
  },

  setTyping: (isTyping) => set({ isTyping }),
}));

export default useRoomStore;
