import BangLogo from "../../Components/BangLogo";
import getLabel from "../../Locale/GetLabel";

export interface LoadingProps {
    message: string;
}

export default function LoadingScene({ message }: LoadingProps) {
    return <div className="flex flex-col items-center">
        <BangLogo />
        <h1 className="text-2xl font-bold">{getLabel('ui', message)}</h1>
    </div>
}