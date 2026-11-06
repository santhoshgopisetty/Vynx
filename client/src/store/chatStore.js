import { create } from 'zustand';
import { mockConversations } from '../mock/conversations';
import { mockIndividualMessages } from '../mock/messages';

const useChatStore = create((set, get) => ({
  conversations: mockConversations,
  currentConversation: null,
  messages: mockIndividualMessages,
  isTyping: false,
  isSending: false,

  setCurrentConversation: (conversationId) => {
    const conv = get().conversations.find(c => c.id === conversationId);
    set({ currentConversation: conv || null });
  },

  getMessages: (conversationId) => {
    return get().messages.filter(m => m.conversationId === conversationId);
  },

  sendMessage: (conversationId, text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: 'user-001',
      text,
      timestamp: new Date().toISOString(),
      status: 'sent',
      reactions: [],
      replyTo: null,
      edited: false,
    };
    set((state) => ({
      messages: [...state.messages, newMsg],
      isSending: false,
    }));
    return newMsg;
  },

  editMessage: (messageId, newText) => {
    set((state) => ({
      messages: state.messages.map(m =>
        m.id === messageId ? { ...m, text: newText, edited: true } : m
      ),
    }));
  },

  deleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter(m => m.id !== messageId),
    }));
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

export default useChatStore;
