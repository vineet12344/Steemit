// Card.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  videoId: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, videoId, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm cursor-pointer" onClick={handleClick}>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 my-2">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;