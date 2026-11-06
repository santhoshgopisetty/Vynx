export const mockRooms = [
  {
    id: 'RM-DEMO',
    name: 'Design Review',
    code: 'RM-DEMO',
    password: null,
    ownerId: 'user-001',
    maxParticipants: 10,
    expiration: '2026-11-07T12:00:00Z',
    createdAt: '2026-11-06T10:00:00Z',
    participants: [
      { id: 'user-001', name: 'Santhosh', online: true, isOwner: true },
      { id: 'user-002', name: 'Rahul', online: true, isOwner: false },
      { id: 'guest-001', name: 'Alex', online: false, isOwner: false },
    ],
  },
];
