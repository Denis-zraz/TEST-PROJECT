import { useMemo, useState } from 'react';
import { Items } from '../interfaces/Interfaces';

function useSort(items: Items[]): [Items[], string, () => void] {
    const [sortBy, setSortBy] = useState('ASC');

    const sortedItems = useMemo(() => {
        if (sortBy === 'DESC') {
            return items;
        }

        if (sortBy === 'ASC') {
            return items.map((itemArray) =>
                itemArray.sort((a, b) => b.id - a.id)
            );
        }

        return items;
    }, [items, sortBy]);

    const handleSortClick = () => {
        if (sortBy === 'ASC') {
            setSortBy('DESC');
        } else if (sortBy === 'DESC') {
            setSortBy('ASC');
        } else {
            setSortBy('');
        }
    };

    return [sortedItems, sortBy, handleSortClick];
}

export default useSort;
