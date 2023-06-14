import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    className?: string;
    color?: 'green' | 'blue' | 'red';
    type?: 'submit' | 'reset' | 'button';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export default function Button({ className, color, type, onClick, children }: ButtonProps) {
    switch (color) {
    default:
    case 'blue':
        return (
            <button type={type} onClick={onClick} className={`
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    font-bold
                    py-1
                    px-4
                    m-2
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    ${className ?? ''}`}
                >{children}</button>
        );
    case 'green':
        return (
            <button type={type} onClick={onClick} className={`
                bg-green-600
                hover:bg-green-700
                text-white
                font-bold
                py-1
                px-4
                m-2
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                ${className ?? ''}`}
            >{children}</button>
        );
    case 'red':
        return (
            <button type={type} onClick={onClick} className={`
                bg-red-500
                hover:bg-red-600
                text-white
                font-bold
                py-1
                px-4
                m-2
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                ${className ?? ''}`}
            >{children}</button>
        );
    }
}