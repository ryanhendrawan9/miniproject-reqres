import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-medium">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
