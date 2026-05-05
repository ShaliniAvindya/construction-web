import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] px-6">
      <Card className="w-full max-w-sm bg-[#18181B] border border-[#3F3F46]">
        <CardHeader className="text-center">
          <CardTitle>Client Login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-[#A1A1AA]">
            This version is a UI-only demo. Authentication is not connected to a backend.
          </p>
          <Button className="w-full" size="lg" disabled>
            Login unavailable
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
