import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] px-6">
      <Card className="w-full max-w-sm bg-[#18181B] border border-[#3F3F46]">
        <CardHeader className="text-center">
          <CardTitle>Client Login</CardTitle>
        </CardHeader>
        <CardContent>
<<<<<<< HEAD
          <p className="mb-6 text-sm text-[#A1A1AA]">
            This version is a UI-only demo. Authentication is not connected to a backend.
          </p>
          <Button className="w-full" size="lg" disabled>
            Login unavailable
=======
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            Sign in
>>>>>>> f3bac888a34aac6d76b24fa930afa5da6bf7923d
          </Button>
          <div className="mt-6 text-center text-sm text-[#A1A1AA]">
            Want to get in touch? <Link to="/contact" className="text-[#C9A87C] hover:text-white">
              Contact us
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
