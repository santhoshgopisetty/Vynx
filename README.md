# PrivateTalk

A modern, premium-looking real-time private messaging application.

## Overview

PrivateTalk supports two distinct private communication modes:
1. **Temporary Room Chat**: Disposable, anonymous rooms with unique codes/links and optional password protection.
2. **Individual Private Chat**: Direct 1-on-1 private conversations between registered users via secret codes.

Zero social feeds, zero followers, zero distractions. Pure private communication.

## Tech Stack (Frontend)

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (custom dark design system tokens)
- **React Router DOM v7**
- **Zustand v5** (state management)
- **Framer Motion** (subtle animations)
- **Lucide React** (icons)
- **React Hot Toast** (notifications)

## Design Identity

- **Main background**: `#0B0B0D`
- **Secondary background**: `#111114`
- **Card background**: `#17171B`
- **Input background**: `#202024`
- **Primary accent**: `#8CCFFF`
- **Primary text**: `#F5F5F5`
- **Secondary text**: `#A1A1AA`
- **Border**: `#38383F`

## Getting Started

```bash
cd client
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure

```
client/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/       # 16 reusable UI design system components
│   │   ├── layout/       # MainLayout, AuthLayout, ChatLayout
│   │   ├── landing/      # Hero, FloatingBubbles, RoomEntry, IndividualEntry
│   │   ├── chat/         # Chat UI components (Phase 5)
│   │   └── room/         # Room UI components (Phase 6)
│   ├── pages/            # All application route pages
│   ├── store/            # Zustand stores (auth, chat, room)
│   ├── mock/             # Mock users, conversations, messages, rooms
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Date formatting, message helpers, validation
```
