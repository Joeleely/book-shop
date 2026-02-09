"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card, Container, Input } from "@/src/components/ui";
import { useApp } from "@/src/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Container>
      <Card className="p-6 max-w-xl">
        <div className="text-xl font-semibold">Login</div>
        <div className="mt-1 text-sm text-zinc-600">Mock login (frontend only).</div>

        <div className="mt-5 grid gap-3">
          <div>
            <div className="text-sm font-medium">Email</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <div className="text-sm font-medium">Password</div>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <Button
            onClick={() => {
              const res = login(email, password);
              if (!res.ok) return setError(res.message ?? "Login failed.");
              router.push("/");
            }}
            type="button"
          >
            Login
          </Button>

          <div className="text-sm text-zinc-600">
            New user?{" "}
            <button className="underline text-green-700" onClick={() => router.push("/register")} type="button">
              Register
            </button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
