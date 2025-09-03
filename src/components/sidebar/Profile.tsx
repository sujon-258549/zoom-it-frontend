import { useGetMeQuery } from "@/redux/fetures/auth/authApi";
import LoadingPage from "../common/loding/LoadingPage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Pencil, Save, X, Camera, Shield, Key, Mail, Phone, User, Calendar, RefreshCw } from "lucide-react";

const Profile = () => {
  const { data: profile, isLoading, refetch } = useGetMeQuery('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50 p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-cyan-800 mb-4">Profile Not Available</h2>
          <p className="text-cyan-600 mb-6">Failed to load profile data. Please try again.</p>
          <Button onClick={() => refetch()} className="bg-cyan-600 hover:bg-cyan-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Initialize edited profile when data is available
  if (!editedProfile.name && profile) {
    setEditedProfile({
      name: profile.name,
      email: profile.email,
      phoneNumber: profile.phoneNumber
    });
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setEditedProfile({
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phoneNumber
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
    // Add your update logic here
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-800 mb-3">User Profile</h1>
          <p className="text-cyan-600 text-lg">Manage your account settings and personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border-2 border-cyan-100 shadow-lg">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-20"></div>
              <CardHeader className="pt-0 pb-6">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative">
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-2 right-2 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition-colors shadow-md">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <CardTitle className="text-xl text-cyan-900">{profile.name}</CardTitle>
                  <div className="inline-block mt-2 px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium capitalize">
                    {profile.role}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3">
                      <Calendar className="w-5 h-5 text-cyan-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-cyan-600">Member Since</h3>
                      <p className="text-cyan-900">{formatDate(profile.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3">
                      <Shield className="w-5 h-5 text-cyan-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-cyan-600">Status</h3>
                      <p className={profile.isBlocked ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                        {profile.isBlocked ? "Blocked" : "Active"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3">
                      <RefreshCw className="w-5 h-5 text-cyan-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-cyan-600">Last Updated</h3>
                      <p className="text-cyan-900">{formatDate(profile.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions Card */}
            <Card className="mt-6 border-2 border-cyan-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-800 text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-cyan-700 border-cyan-200 hover:bg-cyan-50">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-cyan-700 border-cyan-200 hover:bg-cyan-50">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-cyan-700 border-cyan-200 hover:bg-cyan-50">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Preferences
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-cyan-100 shadow-lg">
              <CardHeader className="border-b border-cyan-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-cyan-800">Personal Information</CardTitle>
                    <CardDescription className="text-cyan-600">
                      Update your personal information and contact details
                    </CardDescription>
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleSave}
                          className="text-white cursor-pointer"
                          size="sm"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={handleEditToggle}
                          variant="outline"
                          size="sm"
                          className="text-cyan-800 border-cyan-700 cursor-pointer"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={handleEditToggle} 
                        size="sm"
                        className="text-white cursor-pointer"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-cyan-700">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editedProfile.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="pl-10 border-cyan-200 focus:border-cyan-500"
                          />
                        ) : (
                          <p className="text-cyan-900 py-2 px-3 pl-10 rounded-md border border-cyan-100 bg-cyan-50">
                            {profile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-cyan-700">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-10 border-cyan-200 focus:border-cyan-500"
                          />
                        ) : (
                          <p className="text-cyan-900 py-2 px-3 pl-10 rounded-md border border-cyan-100 bg-cyan-50">
                            {profile.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cyan-700">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedProfile.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className="pl-10 border-cyan-200 focus:border-cyan-500"
                        />
                      ) : (
                        <p className="text-cyan-900 py-2 px-3 pl-10 rounded-md border border-cyan-100 bg-cyan-50">
                          {profile.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-cyan-700">Account Role</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
                      <p className="text-cyan-900 py-2 px-3 pl-10 rounded-md border border-cyan-100 bg-cyan-50 capitalize">
                        {profile.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-cyan-700">User ID</Label>
                    <p className="text-cyan-600 text-sm py-2 px-3 rounded-md border border-cyan-100 bg-cyan-50">
                      {profile._id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="mt-6 border-2 border-cyan-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-cyan-800">Security Settings</CardTitle>
                <CardDescription className="text-cyan-600">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-cyan-100">
                    <div className="flex items-center">
                      <div className="bg-cyan-100 p-2 rounded-full mr-4">
                        <Key className="w-5 h-5 text-cyan-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-cyan-800">Password</h3>
                        <p className="text-sm text-cyan-600">Last changed 2 weeks ago</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="bg-cyan-100 p-2 rounded-full mr-4">
                        <Shield className="w-5 h-5 text-cyan-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-cyan-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-cyan-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;