import FloatingBubbles from '../components/landing/FloatingBubbles';
import Hero from '../components/landing/Hero';
import RoomEntry from '../components/landing/RoomEntry';
import IndividualEntry from '../components/landing/IndividualEntry';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg-main flex items-center justify-center overflow-hidden">
      {/* Background */}
      <FloatingBubbles />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Hero */}
          <Hero />

          {/* Right - Entry Options */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <RoomEntry />
            <IndividualEntry />
          </div>
        </div>
      </div>
    </div>
  );
}
