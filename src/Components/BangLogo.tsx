import './Style/BangLogo.css';
import getLabel from "../Locale/GetLabel";

export default function BangLogo() {
    return <img className='bang-logo' src='logo192.png' alt={getLabel('ui', 'APP_TITLE')} />
}