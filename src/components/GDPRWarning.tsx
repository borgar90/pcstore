import React, { useState, useEffect } from 'react';

const GDPRWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('gdprAccepted');
    if (!hasAccepted) {
      setShowWarning(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprAccepted', 'true');
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          Vi bruker informasjonskapsler og lagrer personlig informasjon for å forbedre din opplevelse på nettstedet vårt. 
          Ved å fortsette å bruke dette nettstedet godtar du vår bruk av informasjonskapsler og vår personvernpolicy. 
          All brukerinformasjon er kryptert og lagret sikkert. Vi lagrer aldri kredittkortinformasjon.
        </p>
        <button 
          onClick={handleAccept}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Aksepter
        </button>
      </div>
    </div>
  );
};

export default GDPRWarning;