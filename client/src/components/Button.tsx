import React, { memo, useCallback } from 'react';
import { ButtonProps } from '../interfaces/Interfaces';


const Button: React.FC<ButtonProps> = ({ onClick, id, disabled, children }) => {
	const handleClick = useCallback(() => {
		onClick(id);
	}, [id, onClick]);
	
	return (
		<button onClick={handleClick} disabled={disabled}>{children}</button>
	)
}

export default memo(Button);
