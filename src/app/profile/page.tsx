"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/src/lib/store";
import { Button, Container } from "@/src/components/ui";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useApp();
  const [showReset, setShowReset] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

  if (!user) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-lg font-semibold">Please login</div>
          <Button className="mt-3" onClick={() => router.push("/login")} type="button">Go to login</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6 max-w-2xl">
        <div className="text-xl font-semibold">Profile</div>

        <div className="mt-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <div className="text-sm text-zinc-600">Name</div>
          <div className="font-semibold">{user.name}</div>
          <div className="mt-3 text-sm text-zinc-600">Email</div>
          <div className="font-semibold">{user.email}</div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowReset((v) => !v)}
              className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              Reset password
            </button>
            {showReset && (
              <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-semibold text-zinc-900">
                  Change password
                </div>

                <div className="mt-3 grid gap-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/20"
                  />

                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/20"
                  />

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600/20"
                  />

                  {pwError ? (
                    <div className="text-sm text-red-600">{pwError}</div>
                  ) : null}

                  {pwSuccess ? (
                    <div className="text-sm text-green-700">{pwSuccess}</div>
                  ) : null}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        setPwError(null);
                        setPwSuccess(null);

                        if (!currentPassword || !newPassword) {
                          return setPwError("Please fill all fields.");
                        }
                        if (newPassword !== confirmPassword) {
                          return setPwError("Password confirmation does not match.");
                        }
                        if (newPassword.length < 8) {
                          return setPwError("Password must be at least 8 characters.");
                        }

                        setPwSuccess("Password updated successfully.");
                        alert("Successful password change");
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setShowReset(false);
                      }}
                      className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
                    >
                      Update password
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowReset(false)}
                      className="rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/profile/orders" className="underline text-green-700 text-sm">My Orders</Link>
          <Link href="/" className="underline text-zinc-700 text-sm">Browse Books</Link>
        </div>
      </div>
    </Container>
  );
}
