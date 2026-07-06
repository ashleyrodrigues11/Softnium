export default function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-500 text-sm">{title}</h3>

            <h1 className="text-3xl font-bold mt-2 text-gray-900">
                {value}
            </h1>
        </div>
    );
}