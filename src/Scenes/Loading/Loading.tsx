import BangLogo from "../../Components/BangLogo";
import getLabel from "../../Locale/GetLabel";

export default function LoadingScene() {
    return <div className="flex flex-col items-center">
        <BangLogo />
        <h1 className="text-2xl font-bold">{getLabel('ui', 'LOADING')}</h1>
    </div>
}