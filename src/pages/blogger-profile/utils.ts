export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    return `${formattedDate} ${formattedTime}`;
};

export const getGridColumnSpan = (index: number, notesLength: number): string =>
    index < Math.floor(notesLength / 3) * 3 ? 'span 2' : 'span 3';
