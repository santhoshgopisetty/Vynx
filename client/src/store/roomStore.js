import { create } from 'zustand';
import { mockRooms } from '../mock/rooms';
import { mockRoomMessages } from '../mock/messages';

const useRoomStore = create((set, get) => ({
  currentRoom: null,
  rooms: mockRooms,
  messages: mockRoomMessages,
  guestName: 'Anonymous Guest',
  isTyping: false,

  setGuestName: (name) => set({ guestName: name }),

  createRoom: ({ name, password, expiration, expirationLabel, maxParticipants }) => {
    const code = `RM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newRoom = {
      id: code,
      name,
      code,
      password: password || null,
      ownerId: 'user-001',
      maxParticipants: parseInt(maxParticipants, 10) || 10,
      expirationLabel: expirationLabel || '1 hour',
      expiration: new Date(Date.now() + parseInt(expiration, 10) * 60000).toISOString(),
      createdAt: new Date().toISOString(),
      participants: [
        { id: 'user-001', name: 'Santhosh (You)', online: true, isOwner: true }
      ],
    };

    set((state) => ({
      rooms: [newRoom, ...state.rooms],
      currentRoom: newRoom,
    }));

    return newRoom;
  },

  setCurrentRoom: (roomCode) => {
    const room = get().rooms.find(r => r.code.toUpperCase() === roomCode.toUpperCase());
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
          ? {
              ...m,
              reactions: m.reactions.includes(emoji)
                ? m.reactions.filter(r => r !== emoji)
                : [...m.reactions, emoji],
            }
          : m
      ),
    }));
  },

  setTyping: (isTyping) => set({ isTyping }),
}));

export default useRoomStore;
