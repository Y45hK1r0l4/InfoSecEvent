"use client";

type User = {
    name: string;
    email: string;
};

type Props = {
    user: User;
};

export default function ProfileForm({ user }: Props) {
    return (
        <div className="max-w-xl rounded-xl border p-6">
            <h2 className="mb-6 text-2xl font-semibold">
                Profile Information
            </h2>

            <div className="mb-5">
                <label className="mb-2 block">
                    Name
                </label>

                <input
                    value={user.name}
                    readOnly
                    className="w-full rounded border p-3"
                />
            </div>

            <div>
                <label className="mb-2 block">
                    Email
                </label>

                <input
                    value={user.email}
                    readOnly
                    className="w-full rounded border p-3"
                />
            </div>
        </div>
    );
}