import BangLogo from "../../Components/BangLogo";
import { getLabel, useLanguage } from "../../Locale/Registry";

export interface LoadingProps {
    message: string;
}

export default function LoadingScene({ message }: LoadingProps) {
    const language = useLanguage();
    
    return <div className="flex flex-col items-center">
        <BangLogo />
        <h1 className="text-2xl font-bold">{getLabel(language, 'ui', message)}</h1>
    </div>
}