export interface Item {
	id: number;
	name: string;
	description: string;
}

export type Items = Item[];

export interface Sort {
	sortBy: string;
	sortOrder: string;
}

export type IactiveItemText = 'Empty' | number;

export interface IhandleItemClick {
	handleItemClick: (id: number) => void;
}

export interface ListItemProps extends Item {
    isactive: boolean;
    onClick: (id: number) => void;
}

export interface ButtonProps {
    onClick: (id: number) => void;
    id: number;
    disabled: boolean;
    children: React.ReactNode;
}

