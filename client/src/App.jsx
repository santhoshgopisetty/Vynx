import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './components/common/Loader';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import ChatLayout from './components/layout/ChatLayout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CreateRoom = lazy(() => import('./pages/CreateRoom'));
const JoinRoom = lazy(() => import('./pages/JoinRoom'));
const IndividualAccess = lazy(() => import('./pages/IndividualAccess'));
const IndividualChat = lazy(() => import('./pages/IndividualChat'));
const RoomChat = lazy(() => import('./pages/RoomChat'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Individual chat routes */}
        <Route element={<MainLayout />}>
          <Route path="/individual" element={<IndividualAccess />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route path="/individual/chat/:conversationId" element={<IndividualChat />} />
        </Route>

        {/* Room chat routes */}
        <Route element={<ChatLayout />}>
          <Route path="/room/:roomCode" element={<RoomChat />} />
        </Route>

        {/* User routes */}
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
