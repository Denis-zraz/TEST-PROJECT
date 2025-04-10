import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { ListItemProps } from '../interfaces/Interfaces';


const ListItem: React.FC<ListItemProps> = ({ id, name, description, onClick, isactive }): JSX.Element => {
  return (
    <li className={isactive ? 'list-item active' : 'list-item'}>
        <Link to={`/${id}`}>
            <div className={'list-item-actions'}>
                <div>ID: <b>{id}</b></div>
                <Button onClick={onClick} id={id} disabled={isactive}>
                    {isactive ? 'Active' : 'Set Active'}
                </Button>
            </div>
            <div>{name}</div>
            <div className={'list-item__description'}>{description}</div>
        </Link>
    </li>
  );
};


export default ListItem;
