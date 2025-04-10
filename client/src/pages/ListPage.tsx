import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from '../components/';
import useData from '../hooks/useData';
import useSort from '../hooks/useSort';
import { IactiveItemText, Item, Items } from '../interfaces/Interfaces';

function ListPage(): JSX.Element {
    const items: Items[] = useData();
    const [sortedItems, sortBy, handleSortClick] = useSort(items);

    const [activeItemId, setActiveItemId] = useState<number | null>(null);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [query, setQuery] = useState<string>('');

    const activeItemText: IactiveItemText = useMemo(
        () => (activeItemId ? activeItemId : 'Empty'),
        [activeItemId]
    );

    const handleItemClick = (id: number): void => {
        setActiveItemId(id);
    };

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (sortedItems.length > 0) {
            setFilteredItems(sortedItems[0]);
        }
    }, [sortedItems]);

    useEffect(() => {
        if (!filteredItems.length) return;
        if (query.length > 0) {
            setFilteredItems(
                filteredItems.filter((item) =>
                    `${item.id}`.includes(
                        query
                            .toLowerCase()
                            .trimStart()
                            .trimEnd()
                            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                    )
                )
            );
        }
    }, [query, filteredItems]);

    return (
        <div className={'list-wrapper'}>
            <header className='list-header'>
                <h1 className={'list-title'}>Items List</h1>
                <h2 className={'list-subtitle'}>
                    Active Item ID: {activeItemText}
                </h2>
                <button onClick={handleSortClick}>
                    Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})
                </button>
                <input
                    type='text'
                    placeholder={'Filter by ID'}
                    value={query}
                    onChange={handleQueryChange}
                />
            </header>
            <div className='list-container'>
                <ul className='list'>
                    {!filteredItems.length && <span>Loading...</span>}
                    {filteredItems.map((item, index) => (
                        <ListItem
                            key={index}
                            isactive={activeItemId === item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            onClick={handleItemClick}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListPage;
