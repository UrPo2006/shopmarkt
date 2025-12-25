"use client";




import { Card, CardContent } from "@/components/ui/card";
import Address from "@/components/ui/Address/Address";
import Profile from "@/components/ui/User/profile";

export default function ProfileSettings() {


  return (
    <Card className="w-full max-w-5xl mx-auto p-6 mt-25">
      <CardContent className="space-y-8">
        {/* Header */}
        <Profile/>

        {/* address Section */}
       <Address/>
      </CardContent>
    </Card>
  );
}
