import { User } from '../types/User';

const UserItem: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="user-item">
      <p>ID: {user.id}</p>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserItem;
