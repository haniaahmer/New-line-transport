import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

const Setting = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-primary" />
        Settings
      </h1>

      {/* 2 Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="example@email.com" />
            </div>
            <Button className="mt-4 w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div>
              <Label>Username</Label>
              <Input placeholder="Enter username" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="+92 300 1234567" />
            </div>
            <Button className="mt-4 w-full">Update Account</Button>
          </CardContent>
        </Card>
        {/* Preferences */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Language</Label>
              <select className="border rounded-lg px-3 py-2">
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
              </select>
            </div>
            <Button className="mt-4 w-full">Save Preferences</Button>
          </CardContent>
        </Card>
        {/* Notifications */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>SMS Notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Security</h2>
            <div>
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••" />
            </div>
            <div>
              <Label>New Password</Label>
              <Input type="password" placeholder="••••••" />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="••••••" />
            </div>
            <Button className="mt-4 w-full">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
