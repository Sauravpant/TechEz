import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">How TechEz works</h1>
        <p className="text-muted-foreground mt-2">
          A simple flow designed for speed, clarity, and real-time coordination between users and technicians.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>1) Browse</CardTitle>
            <CardDescription>Search technicians by category and location.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Technician listings and profiles are optimized and cached for fast browsing.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>2) Book</CardTitle>
            <CardDescription>Create a manual booking request.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You can negotiate pricing. The booking status updates as both sides take action.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>3) Stay synced</CardTitle>
            <CardDescription>Realtime updates via Socket.IO.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Price changes, acceptance, completion, and cancellations can appear instantly without refreshing.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

