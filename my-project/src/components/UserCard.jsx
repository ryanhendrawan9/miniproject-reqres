import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`}>
      <div className="flex items-center mt-5 p-4 space-x-4 transition duration-200 bg-blue-500 rounded-md text-white hover:bg-blue-600 shadow-blue-500 border-2 border-blue-400 transition-all shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#33CCCC,0_0_15px_#33CCCC,0_0_30px_#33CCCC]">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-medium">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-300">{user.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
