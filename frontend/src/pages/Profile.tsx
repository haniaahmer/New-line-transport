import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Trigger hidden input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-primary" />
        Profile - Newline Transport
      </h1>

      {/* Profile Card */}
      <Card className="rounded-2xl shadow-lg max-w-4xl  border border-gray-200">
        <CardContent className="p-8 space-y-8">
          {/* Avatar + Basic Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-28 h-28 ring-2 ring-primary ring-offset-2">
              <AvatarImage src={profileImage} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">Arsal Zaheer</h2>
              <p className="text-gray-500 text-sm">Admin - Newline Transport</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={handleUploadClick}
              >
                Change Photo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Editable Profile Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue="Arsal Zaheer" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" defaultValue="arsal@example.com" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input type="tel" defaultValue="+92 300 1234567" />
            </div>
            <div>
              <Label>Role</Label>
              <Input defaultValue="Administrator" disabled />
            </div>
            <div>
              <Label>Address</Label>
              <Input defaultValue="123 Main Street" />
            </div>
            <div>
              <Label>City</Label>
              <Input defaultValue="Karachi" />
            </div>
            <div>
              <Label>State</Label>
              <Input defaultValue="Sindh" />
            </div>
            <div>
              <Label>Country</Label>
              <Input defaultValue="Pakistan" />
            </div>
            <div>
              <Label>Postal Code</Label>
              <Input defaultValue="74200" />
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <Label>About Me</Label>
            <textarea
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Write something about yourself..."
              defaultValue="I am managing operations and client handling for Newline Transport."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="destructive">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
