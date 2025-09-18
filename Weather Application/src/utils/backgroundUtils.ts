export const getBackgroundClass = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return 'bg-sunny';
  }
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return 'bg-rainy';
  }
  if (lowerCondition.includes('snow')) {
    return 'bg-snowy';
  }
  if (lowerCondition.includes('cloud')) {
    return 'bg-cloudy';
  }
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) {
    return 'bg-stormy';
  }
  
  return 'bg-default';
};