import React from 'react';
import { MoreVertical } from 'lucide-react';

// Define props interface
interface CardProps {
  title: string;
  description: string;
  avatarUrls: string[];
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  onMenuClick?: () => void;
}

export default function Card({
  title,
  description,
  avatarUrls,
  backgroundColor = 'bg-white',
  size = 'medium',
  onMenuClick
}: CardProps) {
  // Size mapping for responsive styling
  const sizeClasses = {
    small: 'p-2 text-sm',
    medium: 'p-4 text-base',
    large: 'p-6 text-lg'
  };

  // Maximum avatars to display before showing +X
  const MAX_AVATARS = 3;

  return (
    <div className={`${backgroundColor} rounded-xl shadow-md ${sizeClasses[size]} flex flex-col gap-3`}>
      <div className="flex justify-between items-start">
        <h2 className="font-semibold truncate">{title}</h2>
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreVertical size={16} />
          </button>
        )}
      </div>

      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {avatarUrls.slice(0, MAX_AVATARS).map((url, idx) => (
            <div 
              key={idx} 
              className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-medium"
            >
              {url ? (
                <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <span>U{idx + 1}</span>
              )}
            </div>
          ))}
          
          {avatarUrls.length > MAX_AVATARS && (
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-gray-100 text-xs font-medium">
              +{avatarUrls.length - MAX_AVATARS}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}