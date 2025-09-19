import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Setting = () => {
  // Dynamic State
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [account, setAccount] = useState({
    username: "",
    phone: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handlePreferencesChange = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleNotificationsChange = (name, value) => {
    setNotifications({ ...notifications, [name]: value });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({ ...security, [name]: value });
  };

  const handleSave = (section) => {
    toast.success(`${section} saved successfully!`);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6 text-primary" />
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <div>
              <Label>Full Name</Label>
              <Input
                name="fullName"
                placeholder="Enter your name"
                value={profile.fullName}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <Button className="mt-4 w-full" onClick={() => handleSave("Profile")}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div>
              <Label>Username</Label>
              <Input
                name="username"
                placeholder="Enter username"
                value={account.username}
                onChange={handleAccountChange}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                placeholder="+92 300 1234567"
                value={account.phone}
                onChange={handleAccountChange}
              />
            </div>
            <Button className="mt-4 w-full" onClick={() => handleSave("Account")}>
              Update Account
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(val) => handlePreferencesChange("darkMode", val)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Language</Label>
              <select
                className="border rounded-lg px-3 py-2"
                value={preferences.language}
                onChange={(e) =>
                  handlePreferencesChange("language", e.target.value)
                }
              >
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
              </select>
            </div>
            <Button className="mt-4 w-full" onClick={() => handleSave("Preferences")}>
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-xl font-semibold">Notification Settings</h2>
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch
                checked={notifications.email}
                onCheckedChange={(val) => handleNotificationsChange("email", val)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>SMS Notifications</Label>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(val) => handleNotificationsChange("sms", val)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch
                checked={notifications.push}
                onCheckedChange={(val) => handleNotificationsChange("push", val)}
              />
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => handleSave("Notifications")}
            >
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">Security</h2>
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                name="currentPassword"
                value={security.currentPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={security.newPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={security.confirmPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <Button className="mt-4 w-full" onClick={() => handleSave("Security")}>
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
