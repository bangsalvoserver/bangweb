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
            return 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-700 text-white';
        case 'green':
            return 'bg-green-800 hover:bg-green-900 focus:ring-green-800 text-white';
        case 'red':
            return 'bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white';
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
            ${getColorClasses()}
            ${className ?? ''}`}
        >{children}</button>
    );
}