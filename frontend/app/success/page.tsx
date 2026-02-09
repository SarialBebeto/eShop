import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="text-center py-24">
            <h1 className="text-xl font-bold mb-4">
                🎉 Order placed successfully!
            </h1>

            <p className="text-gray-700 mb-8">
                Thank you for your purchase!
            </p>

            <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
           >
                Continue Shopping
            </Link>
        </div>
    );
}