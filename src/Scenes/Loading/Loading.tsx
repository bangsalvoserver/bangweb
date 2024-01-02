import getLabel from "../../Locale/GetLabel";

export default function LoadingScene() {
    return <div className="flex flex-col items-center">
        <img src='logo192.png' alt={getLabel('ui', 'APP_TITLE')} />
        <h1 className="text-2xl font-bold">{getLabel('ui', 'LOADING')}</h1>
    </div>
}