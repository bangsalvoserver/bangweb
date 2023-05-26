export type UserValue = {
    id: number,
    name: string
}

export type LobbyUserProps = {
    user: UserValue
};

export default function LobbyUser({ user }: LobbyUserProps) {
  return (
    <div>{user.name}</div>
  );
}