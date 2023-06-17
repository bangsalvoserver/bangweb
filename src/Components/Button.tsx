import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    className?: string;
    color?: 'green' | 'blue' | 'red';
    type?: 'submit' | 'reset' | 'button';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export default function Button({ className, color, type, onClick, children }: ButtonProps) {
    const getColorClasses = () => {
        switch (color) {
        default:
        case 'blue':
            return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white';
        case 'green':
            return 'bg-green-600 hover:bg-green-700 focus:ring-green-600 text-white';
        case 'red':
            return 'bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white';
        }
    };

    return (
        <button type={type} onClick={onClick} className={`
            font-bold
            py-1
            px-4
            m-2
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            ${getColorClasses()}
            ${className ?? ''}`}
        >{children}</button>
    );
}