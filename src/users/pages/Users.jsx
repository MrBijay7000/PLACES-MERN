import UserList from "../components/UserList";

const USERS = [
  {
    id: "u1",
    name: "BIJAY SHRESTHA",
    image:
      "https://i.pinimg.com/736x/e6/6b/b9/e66bb9d1a6faf02585dae19abe8a8547.jpg",
    places: 3,
  },
];

export default function UsersPage() {
  return <UserList items={USERS} />;
}
