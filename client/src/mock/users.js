export const mockUsers = [
  {
    id: 'user-001',
    username: 'Santhosh',
    email: 'santhosh@example.com',
    secretCode: 'SAN-82X9-KL',
    avatar: null,
    online: true,
    lastSeen: new Date().toISOString(),
    createdAt: '2026-01-15T10:30:00Z',
  },
  {
    id: 'user-002',
    username: 'Rahul',
    email: 'rahul@example.com',
    secretCode: 'RAH-91PQ-MN',
    avatar: null,
    online: false,
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    createdAt: '2026-02-20T14:00:00Z',
  },
];

export const currentUser = mockUsers[0];
