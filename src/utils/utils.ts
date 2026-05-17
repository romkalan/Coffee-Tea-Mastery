function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function formatDate(date: string) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString('ru-RU', {month: 'long'});
    const year = d.getFullYear();

    return `${day} ${month} ${year}`
}

function formatDateWithoutYear(date: Date) {
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', {month: 'long'});

    return `${day} ${month}`
}

function sortByDate<T extends { date: string }>(array: T[]) {
    return [...array].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function findElementById<T extends { id: string }>(collection: T[], id: string) {
    return collection.find(element => element.id === id);
}

export {generateUUID, formatDate, sortByDate, formatDateWithoutYear, findElementById};
