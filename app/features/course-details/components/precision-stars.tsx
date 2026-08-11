import { Star } from 'lucide-react';

export function PrecisionStars({ rating, stars }: { rating: number, stars: number }) {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(stars)].map((_, index) => {        
        
        const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
        
        const gradientId = `star-grad-${index}`;

        return (
          <div key={index} className="relative w-4 h-4">
            <svg className="absolute w-full h-full" viewBox="0 0 24 24">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
                  <stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
            </svg>
            <Star 
              className="w-4 h-4 text-yellow-500" 
              style={{ fill: `url(#${gradientId})` }} 
            />
          </div>
        );
      })}
      <span className="text-gray-500 text-xs ml-1">({rating})</span>
    </div>
  );
}
