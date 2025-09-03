function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`
}

function sortByDate <T extends { date: Date }>(array: T[]) {
  return [...array].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export {generateUUID, formatDate, sortByDate};
