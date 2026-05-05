import { getLabel, useLanguage } from "../Locale/Registry";
import './Style/BangLogo.css';

export default function BangLogo() {
    const language = useLanguage();
    return <img className='bang-logo' src='salvoserver.png' alt={getLabel(language, 'ui', 'APP_TITLE')} />
}