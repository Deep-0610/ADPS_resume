import React, { useState } from 'react';
import { DEEP_PROFILE } from '../data/deepResumeData.js';

export const ProfileAvatar = ({ className = '', imageClassName = '', label = 'Deep Chaudhari' }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`overflow-hidden bg-[#064E3B] text-white ${className}`}>
      {!imageFailed && (
        <img
          src={DEEP_PROFILE.photo}
          alt={label}
          className={`w-full h-full object-cover object-top ${imageClassName}`}
          onError={() => setImageFailed(true)}
        />
      )}
      {imageFailed && (
        <span className="w-full h-full flex items-center justify-center font-mono font-extrabold">
          DC
        </span>
      )}
    </div>
  );
};