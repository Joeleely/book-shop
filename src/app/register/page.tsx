"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card, Container, Input } from "@/src/components/ui";
import { useApp } from "@/src/lib/store";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Container>
      <Card className="p-6 max-w-xl">
        <div className="text-xl font-semibold">Register</div>
        <div className="mt-1 text-sm text-zinc-600">Create a mock account in localStorage.</div>

        <div className="mt-5 grid gap-3">
          <div>
            <div className="text-sm font-medium">Name</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
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
              const res = register(name, email, password);
              if (!res.ok) return setError(res.message ?? "Register failed.");
              router.push("/");
            }}
            type="button"
          >
            Create account
          </Button>

          <div className="text-sm text-zinc-600">
            Already have account?{" "}
            <button className="underline text-green-700" onClick={() => router.push("/login")} type="button">
              Login
            </button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
