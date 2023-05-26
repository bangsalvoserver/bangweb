export type UserValue = {
    id: number,
    name: string,
    propic: string | null
}

export type LobbyUserProps = {
    user: UserValue,
    isOwner: boolean
};

export default function LobbyUser({ user }: LobbyUserProps) {
  return (
    <div>
    {user.propic ? <img src={user.propic} /> : null}
    {user.name}
    </div>
  );
}