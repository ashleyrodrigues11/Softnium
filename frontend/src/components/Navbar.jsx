export default function Navbar({ title }) {

    return (

        <div className="bg-white border-b border-gray-200 px-8 py-6">

            <h1 className="text-3xl font-bold text-gray-900">
                {title}
            </h1>

            <p className="text-gray-500 mt-1">
                Manage your gym efficiently with SoftNium.
            </p>

        </div>

    );

}