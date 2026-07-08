import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        gym_name: "",
        owner_name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("register/", formData);

            alert("Registration Successful!");

            navigate("/");

        } catch (error) {

            console.log(error.response?.data);

            alert("Registration Failed!");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Register Gym
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="gym_name"
                        placeholder="Gym Name"
                        value={formData.gym_name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        name="owner_name"
                        placeholder="Owner Name"
                        value={formData.owner_name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-lime-400 hover:bg-lime-500 text-white py-3 rounded-xl"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-lime-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}