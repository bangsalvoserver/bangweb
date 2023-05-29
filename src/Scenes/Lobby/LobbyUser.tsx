export interface UserValue {
    id: number;
    name: string;
    propic: string | null;
}

export interface LobbyUserProps {
    user?: UserValue;
    isOwner?: boolean;
}

export default function LobbyUser({ user }: LobbyUserProps) {
  return (
    <div>
    {user && user.propic ? <img src={user.propic} /> : null}
    {user?.name || 'Disconnected'}
    </div>
  );
}