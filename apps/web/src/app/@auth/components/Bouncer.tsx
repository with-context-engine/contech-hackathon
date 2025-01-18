'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';

export function Bouncer() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Bouncer</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            In the unauthenticated state, you can only view the home page.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
