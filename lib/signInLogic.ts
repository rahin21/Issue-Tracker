'use server';

import { redirect } from "next/navigation";

export const googleSignIn = async (formData: FormData): Promise<void> => {
	
	const action = formData.get("action");
	// await signIn(action, { callbackUrl: "/" });
	// redirect("/");
}