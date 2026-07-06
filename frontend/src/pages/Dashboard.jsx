import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await api.get("dashboard/");

                setDashboard(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchDashboard();

    }, []);

    if (!dashboard)
        return <p className="p-10">Loading...</p>;

    return (

        <div className="flex bg-[#F8F9FA]">

            <Sidebar />

            <div className="flex-1">

                <Navbar title="Dashboard" />

                <div className="p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <StatCard
                            title="Total Clients"
                            value={dashboard.total_clients}
                        />

                        <StatCard
                            title="Active Clients"
                            value={dashboard.active_clients}
                        />

                        <StatCard
                            title="Revenue"
                            value={`₹${dashboard.total_revenue}`}
                        />

                        <StatCard
                            title="Today's Collection"
                            value={`₹${dashboard.today_collection}`}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}