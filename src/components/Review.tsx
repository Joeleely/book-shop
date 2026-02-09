import { reviews } from "@/src/data/reviews";
import { useMemo, useState } from "react";

export function Review({ bookId }: { bookId: string }) {
    const [filter, setFilter] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const bookReviews = reviews.filter((r) => r.bookId === bookId);
    const avgRating =
        bookReviews.length > 0
            ? (
                bookReviews.reduce((sum, r) => sum + r.rating, 0) /
                bookReviews.length
            ).toFixed(1)
            : "0.0";

    const filteredReviews = useMemo(() => {
        if (!filter) return bookReviews;
        return bookReviews.filter((r) => r.rating === filter);
    }, [bookReviews, filter]);

    return (
        <div className="mt-10 border-t border-zinc-200 pt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Customer Reviews</h2>
            </div>

            <div className="flex items-center gap-6 mb-6">
                <div className="text-4xl font-bold text-green-700">
                    {avgRating}
                </div>
                <div>
                    <div className="text-yellow-400 text-lg">
                        {"★".repeat(Math.round(Number(avgRating)))}
                        {"☆".repeat(5 - Math.round(Number(avgRating)))}
                    </div>
                    <div className="text-sm text-zinc-500">
                        {bookReviews.length} reviews
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="flex flex-wrap gap-2 mb-6">
                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        onClick={() => setFilter(star)}
                        className={`rounded-full border px-3 py-1 text-sm ${filter === star
                            ? "border-green-700 bg-green-700 text-white"
                            : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                            }`}
                    >
                        {"★".repeat(star)}
                    </button>
                ))}
                <button
                    onClick={() => setFilter(null)}
                    className={`rounded-full border px-3 py-1 text-sm ${filter === null
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                        }`}
                >
                    All
                </button>
            </div>
            <div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
                    Write a review
                </button>
            </div>
            </div>
            

            {showForm && (
                <div className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="mb-2 text-sm font-semibold">
                        Your rating
                    </div>

                    <div className="flex gap-1 text-2xl mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <button
                                key={s}
                                onClick={() => setRating(s)}
                                className={s <= rating ? "text-yellow-400" : "text-zinc-300"}
                                type="button"
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review here..."
                        rows={3}
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-green-600/20"
                    />

                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={() => {
                                alert("Review submitted (mock)");
                                setComment("");
                                setRating(5);
                                setShowForm(false);
                            }}
                            className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {filteredReviews.length === 0 ? (
                <div className="text-sm text-zinc-500">
                    No reviews found.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredReviews.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-2xl border border-zinc-200 bg-white p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">{r.userName}</div>
                                <div className="text-sm text-zinc-400">
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="mt-1 text-yellow-400">
                                {"★".repeat(r.rating)}
                                {"☆".repeat(5 - r.rating)}
                            </div>

                            <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                                {r.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
