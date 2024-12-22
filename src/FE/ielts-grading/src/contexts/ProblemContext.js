import { createContext, useContext, useState } from 'react';

const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
  const [currentProblem, setCurrentProblem] = useState(null);

  return (
    <ProblemContext.Provider value={{ currentProblem, setCurrentProblem }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblem = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblem must be used within a ProblemProvider');
  }
  return context;
};