import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  // Dynamic state for all fields
  const [profileData, setProfileData] = useState({
    fullName: "Arsal Zaheer",
    email: "arsal@example.com",
    phone: "+92 300 1234567",
    role: "Administrator",
    address: "123 Main Street",
    city: "Karachi",
    state: "Sindh",
    country: "Pakistan",
    postalCode: "74200",
    about: "I am managing operations and client handling for Newline Transport.",
  });

  // Handle input change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success("Profile photo updated!");
    }
  };

  // Trigger hidden input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Save changes
  const handleSave = () => {
    toast.success("Profile updated successfully!");
    console.log(profileData);
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-primary" />
        Profile - Newline Transport
      </h1>

      {/* Profile Card */}
      <Card className="rounded-2xl shadow-lg max-w-4xl border border-gray-200">
        <CardContent className="p-8 space-y-8">
          {/* Avatar + Basic Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-28 h-28 ring-2 ring-primary ring-offset-2">
              <AvatarImage src={profileImage} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
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
              <Input
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                name="role"
                value={profileData.role}
                disabled
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                name="city"
                value={profileData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                name="state"
                value={profileData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                name="country"
                value={profileData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Postal Code</Label>
              <Input
                name="postalCode"
                value={profileData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <Label>About Me</Label>
            <textarea
              name="about"
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-primary"
              rows={4}
              value={profileData.about}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="destructive">Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
