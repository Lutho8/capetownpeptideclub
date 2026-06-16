import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function NotFound() {
  return (
      
    <div className="min-h-screen flex items-center justify-center">

      
      <SEO
      
        title="Page Not Found | Cape Town Peptide Club"
      
        description="The page you are looking for does not exist. Return to the Cape Town Peptide Club home or browse our research peptide shop."
      
        noindex
      
      />      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Page not found</p>
          <Button asChild className="w-full">
            <Link to="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
