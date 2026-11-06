export const mockConversations = [
  {
    id: 'conv-001',
    participants: ['user-001', 'user-002'],
    createdAt: '2026-10-01T09:00:00Z',
    lastMessage: {
      text: 'Hey, are you available for the meeting?',
      senderId: 'user-002',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    unreadCount: 2,
  },
  {
    id: 'conv-002',
    participants: ['user-001', 'user-002'],
    createdAt: '2026-10-15T14:30:00Z',
    lastMessage: {
      text: 'Sounds good, let me know!',
      senderId: 'user-001',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    unreadCount: 0,
  },
];
