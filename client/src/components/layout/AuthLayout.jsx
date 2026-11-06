import { Outlet, Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <MessageCircle size={28} className="text-accent" />
          <span className="text-xl font-bold text-text-primary">PrivateTalk</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
