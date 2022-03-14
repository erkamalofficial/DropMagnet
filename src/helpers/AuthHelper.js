import { auth } from "../firebase";


export function SignInWithCustomToken(token) {
    return auth.signInWithCustomToken(token);
}

export function LogoutCurrentUser() {
    return auth.signOut();
}