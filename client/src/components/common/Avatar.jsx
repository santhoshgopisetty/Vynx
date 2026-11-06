const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const colorMap = [
  'bg-blue-600', 'bg-emerald-600', 'bg-violet-600',
  'bg-amber-600', 'bg-rose-600', 'bg-cyan-600',
  'bg-fuchsia-600', 'bg-lime-600',
];

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorMap[Math.abs(hash) % colorMap.length];
}

export default function Avatar({
  name = '',
  src,
  size = 'md',
  online,
  className = '',
}) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeMap[size]} rounded-full object-cover`}
          loading="lazy"
        />
      ) : (
        <div
          className={`
            ${sizeMap[size]} ${getColor(name)}
            rounded-full flex items-center justify-center
            font-semibold text-white
          `}
        >
          {initials || '?'}
        </div>
      )}
      {typeof online === 'boolean' && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full
            border-2 border-bg-main
            ${size === 'xs' || size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'}
            ${online ? 'bg-success' : 'bg-text-muted'}
          `}
        />
      )}
    </div>
  );
}
