import { redirect } from "@sveltejs/kit";

export function POST({ cookies}){
    cookies.delete("token",  {
        path: "/"
    });
    redirect(303, "/");
}