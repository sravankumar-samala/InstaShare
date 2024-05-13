import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken) return <Navigate to="/" />;

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    setError(null);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify({ username: userName, password }),
    };

    try {
      const response = await fetch("https://apis.ccbp.in/login", options);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error_msg);

      Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[100vh] grid items-center grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img
          src="https://res.cloudinary.com/dug9vpon2/image/upload/v1700468751/a2u0kvyqnttgndn7uzdu.png"
          alt="website login"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="login justify-self-center grid gap-6 w-[100%] max-w-[360px]"
      >
        <div className="grid gap-3 place-content-center justify-items-center">
          <img
            src="https://res.cloudinary.com/dug9vpon2/image/upload/v1698733302/Insta_share_logo_vlehyi.png"
            alt="website logo"
          />
          <h1 className="font-medium text-2xl">Insta Share</h1>
        </div>
        <div className="grid gap-1">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={onChangeUserName}
            placeholder="Enter Your Name"
            className="rounded-md"
            required
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="password">PASSWORD</label>
          <span className="flex">
            <input
              className="flex-1 rounded-tl-md rounded-bl-md"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Enter Your Password"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="text-xl bg-gray-200 grid place-items-center px-2 rounded-tr-md rounded-br-md"
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </button>
          </span>

          {error && <p className="text-red-600 text-md sm:text-lg">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 text-xl text-white rounded-md font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}
