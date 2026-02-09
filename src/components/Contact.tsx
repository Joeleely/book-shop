import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

export function Contact() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-10 border-t border-zinc-200 bg-zinc-300">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <div className="text-sm font-semibold text-zinc-900">Book Shop</div>
                        <div>
                            <p className="mt-2 text-sm text-zinc-600">
                                Online bookstore with mock data
                            </p>
                            <p className="text-sm text-zinc-600">
                                (frontend only project)
                            </p>
                        </div>


                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                className="rounded-full border border-zinc-500 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-200"
                                href="mailto:hello@joevry.com"
                            >
                                Varanyu50015@gmail.com
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-zinc-900">Quick links</div>
                        <div className="mt-3 grid grid-cols-6 gap-2 text-sm text-zinc-600">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700 cursor-pointer">
                                <a target="_blank" href="https://www.facebook.com/varanyu.leelasopin/"><FaFacebookF className="text-white w-4 h-4" /></a>
                            </div>
                            <div className="col-span-5 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700 cursor-pointer">
                                <a target="_blank" href="https://www.instagram.com/joe.vry/"><FaInstagram className="text-white w-4.5 h-4.5" /></a>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700 cursor-pointer">
                                <a target="_blank" href="https://github.com/Joeleely"><FaGithub className="text-white w-4.5 h-4.5" /></a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-zinc-900">Contact</div>
                        <div className="mt-3 space-y-2 text-sm text-zinc-600">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-zinc-500">
                                    Address
                                </div>
                                <div className="mt-1">
                                    Bangkok, Thailand
                                </div>
                            </div>

                            <div>
                                <div className="text-xs uppercase tracking-wide text-zinc-500">
                                    Portfolio
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <a
                                        className="rounded-full border border-zinc-500 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-200"
                                        href="https://joevry.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Joevry
                                    </a>
                                </div>
                            </div>

                            <div className="pt-2 text-xs text-zinc-500">
                                Support hours: 10:00–18:00 (GMT+7)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-100">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
                    <div>© {year} Book Shop. All rights reserved.</div>
                    <div className="flex gap-4">
                        <Link className="hover:underline" href="/privacy">
                            Privacy
                        </Link>
                        <Link className="hover:underline" href="/terms">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
