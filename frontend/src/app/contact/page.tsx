"use client";

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // In a real implementation setup, reCAPTCHA would inject a token here.
        const captchaToken = "mock_token";

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, captcha_token: captchaToken }),
            });
            if (res.ok) {
                setStatus("success");
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-xl">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                <h1 className="text-3xl font-extrabold mb-6">Contact Me</h1>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    Fill out the form below and I'll get back to you as soon as possible. (Note: submission may take a few minutes to send)
                </p>

                {status === "success" && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                        Thanks for reaching out! Your message has been sent.
                    </div>
                )}
                {status === "error" && (
                    <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm font-medium">
                        Oops! Still working out the kinks. Try again later.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text" required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            rows={4} required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>
                    <div className="text-sm text-neutral-500">
                        * CAPTCHA verification happens automatically before sending.
                    </div>
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                    >
                        {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}
