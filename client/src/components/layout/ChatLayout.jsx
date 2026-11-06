import { Outlet } from 'react-router-dom';

export default function ChatLayout() {
  return (
    <div className="h-screen bg-bg-main flex flex-col overflow-hidden">
      <Outlet />
    </div>
  );
}
