'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';

export function Bouncer() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Logged Out</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            You are not logged in. To login, click get started to start
            exploring.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
