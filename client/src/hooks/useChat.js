import { useCallback } from 'react';
import useChatStore from '../store/chatStore';

export default function useChat(conversationId) {
  const {
    messages,
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    isTyping,
    setTyping,
  } = useChatStore();

  const conversationMessages = getMessages(conversationId);

  const send = useCallback((text) => {
    if (!text.trim()) return;
    sendMessage(conversationId, text);
  }, [conversationId, sendMessage]);

  const edit = useCallback((messageId, newText) => {
    editMessage(messageId, newText);
  }, [editMessage]);

  const remove = useCallback((messageId) => {
    deleteMessage(messageId);
  }, [deleteMessage]);

  const react = useCallback((messageId, emoji) => {
    addReaction(messageId, emoji);
  }, [addReaction]);

  return {
    messages: conversationMessages,
    send,
    edit,
    remove,
    react,
    isTyping,
    setTyping,
  };
}
