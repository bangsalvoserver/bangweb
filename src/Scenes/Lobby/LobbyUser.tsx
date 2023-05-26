export type UserValue = {
    id: number,
    name: string
}

export type LobbyUserProps = {
    user: UserValue,
    isOwner: boolean
};

export default function LobbyUser({ user }: LobbyUserProps) {
  return (
    <div>{user.name}</div>
  );
}