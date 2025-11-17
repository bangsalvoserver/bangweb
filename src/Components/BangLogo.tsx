import './Style/BangLogo.css';
import getLabel from "../Locale/GetLabel";
import { useLanguage } from '../Locale/Registry';

export default function BangLogo() {
    const language = useLanguage();
    return <img className='bang-logo' src='logo192.png' alt={getLabel(language, 'ui', 'APP_TITLE')} />
}