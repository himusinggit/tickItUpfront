import { useForm } from "react-hook-form";
import Input from "../components/Input";
import ImageInput from "../components/ImageInput";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    AuthService.signup(data)
      .then((resp) => {
        console.log(resp);
        navigate("../");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Registration failed: " + err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create an account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Fill in the details below to get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Username"
            name="userName"
            placeholder="john_doe"
            required
            error={errors.userName}
            {...register("userName", {
              required: "Username is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            })}
          />

          <Input
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            required
            error={errors.fullName}
            {...register("fullName", {
              required: "Full name is required",
            })}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            required
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
            })}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            required
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === watch("password") || "Passwords do not match",
            })}
          />
          <ImageInput
            {...register("avatar")}
            height="13vh"
            width="13vh"
            imgPrev="rounded-full object-cover object-center"
          />

          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-2 relative">
          <p className="text-sm text-center text-gray-400 mt-6"></p>
          Already have an account?{" "}
          <p
            onClick={() => {
              navigate("../auth/login");
            }}
            className="text-gray-900 cursor-pointer font-medium hover:underline"
          >
            Sign in
          </p>
        </div>
      </div>
    </div>
  );
}
