import { Ref, useState } from "react";
import "./Style/PasswordInput.css"

export interface PasswordInputProps {
    inputRef?: Ref<HTMLInputElement>;
    id: string;
    password: string | undefined;
    setPassword: (value: string) => void;
}

export default function PasswordInput({ inputRef, id, password, setPassword }: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(value => !value);

    return (
        <div className="password-input-wrapper">
            <input id={id} ref={inputRef}
                type={isPasswordVisible ? 'text' : 'password'}
                className='
                    border-2
                    border-gray-300
                    rounded-md
                    m-2
                    p-1
                    w-40
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                '
                value={password ?? ''} onChange={e => setPassword(e.target.value)} />
            <button type="button" onClick={togglePasswordVisibility} className="password-toggle-button">
                {isPasswordVisible
                    ? <svg fill="#505050" width="2em" height="1.5em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="64"/><path d="M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96c-42.52,0-84.33,12.15-124.27,36.11C90.66,156.54,53.76,192.23,21.71,238.18a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416c46.71,0,93.81-14.43,136.2-41.72,38.46-24.77,72.72-59.66,99.08-100.92A32.2,32.2,0,0,0,490.84,238.6ZM256,352a96,96,0,1,1,96-96A96.11,96.11,0,0,1,256,352Z"/></svg>
                    : <svg fill="#505050" width="2em" height="1.5em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M432,448a15.92,15.92,0,0,1-11.31-4.69l-352-352A16,16,0,0,1,91.31,68.69l352,352A16,16,0,0,1,432,448Z"/><path d="M248,315.85l-51.79-51.79a2,2,0,0,0-3.39,1.69,64.11,64.11,0,0,0,53.49,53.49A2,2,0,0,0,248,315.85Z"/><path d="M264,196.15,315.87,248a2,2,0,0,0,3.4-1.69,64.13,64.13,0,0,0-53.55-53.55A2,2,0,0,0,264,196.15Z"/><path d="M491,273.36a32.2,32.2,0,0,0-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.68,96a226.54,226.54,0,0,0-71.82,11.79,4,4,0,0,0-1.56,6.63l47.24,47.24a4,4,0,0,0,3.82,1.05,96,96,0,0,1,116,116,4,4,0,0,0,1.05,3.81l67.95,68a4,4,0,0,0,5.4.24A343.81,343.81,0,0,0,491,273.36Z"/><path d="M256,352a96,96,0,0,1-93.3-118.63,4,4,0,0,0-1.05-3.81L94.81,162.69a4,4,0,0,0-5.41-.23c-24.39,20.81-47,46.13-67.67,75.72a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.39,76.14,98.28,100.65C162.06,402,207.92,416,255.68,416a238.22,238.22,0,0,0,72.64-11.55,4,4,0,0,0,1.61-6.64l-47.47-47.46a4,4,0,0,0-3.81-1.05A96,96,0,0,1,256,352Z"/></svg>
                }
            </button>
        </div>
    );
}