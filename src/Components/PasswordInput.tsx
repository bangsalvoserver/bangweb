import { Ref, useState } from "react";
import { PASSWORD_HIDDEN_ICON, PASSWORD_VISIBLE_ICON } from "./Icons/PasswordIcon";
import "./Style/PasswordInput.css";

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
                autoComplete="off"
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
                { isPasswordVisible ? PASSWORD_VISIBLE_ICON : PASSWORD_HIDDEN_ICON }
            </button>
        </div>
    );
}