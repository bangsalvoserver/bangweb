import "./CardView.css";
import { PlayerRole } from "../../../Messages/CardEnums";

export interface RoleProps {
    role: PlayerRole;
}

export default function RoleView({ role }: RoleProps) {
    let imageSrc = '/cards/';
    if (role == 'unknown') {
        imageSrc += 'backface/role';
    } else {
        imageSrc += 'role/' + role;
    }
    imageSrc += '.png';

    return (
        <div className="card-view">
            <img className="card-view-img" src={imageSrc} />
        </div>
    );
}