
export const checkFreeTrialStatus = (registrationDate: string): { isActive: boolean; daysLeft: number } => {
  const regDate = new Date(registrationDate);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - regDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const daysLeft = Math.max(0, 7 - diffDays);
  const isActive = daysLeft > 0;
  
  return {
    isActive,
    daysLeft
  };
};

export const formatTrialRemainingTime = (daysLeft: number): string => {
  if (daysLeft === 0) return "Hari terakhir";
  if (daysLeft === 1) return "1 hari tersisa";
  return `${daysLeft} hari tersisa`;
};
