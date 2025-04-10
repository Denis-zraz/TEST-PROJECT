import { memo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item } from '../interfaces/Interfaces';

function SinglePage(): JSX.Element {
    const { id } = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${process.env.API_URL}/items/${id}`)
            .then((res) => res.json())
            .then((data) => setItem(data))
            .catch((err) => {
                setError(true);
                console.error('Failed to fetch item', err);
            });
    }, [id]);

    return (
        <div className='detail'>
            {item ? (
                <>
                    <Link to={'/'} onClick={() => setError(false)}>Go Back</Link>
                    {
                        error ? (
                            <p>К сожалению, данные не доступны</p>
                        ) : (
                            <>
                                <h2>Item Details</h2>
                                <p>ID: {item.id}</p>
                                <p>Name: {item.name}</p>
                                <p>Description: {item.description}</p>
                            </>
                        )
                    }
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default memo(SinglePage);
