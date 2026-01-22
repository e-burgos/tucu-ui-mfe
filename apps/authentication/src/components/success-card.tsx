import { ReactNode } from 'react';

interface SuccessCardProps {
  children: ReactNode;
}

const SuccessCard = ({ children }: SuccessCardProps) => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-72px)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-light dark:bg-black rounded-xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
