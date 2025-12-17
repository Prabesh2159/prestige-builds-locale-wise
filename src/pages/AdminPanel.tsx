import { useState } from 'react';
import { Lock, User, LayoutDashboard, Bell, Image, LogOut, Mail, FileText, Plus, X, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showAddImageForm, setShowAddImageForm] = useState(false);
  const [newImage, setNewImage] = useState({ file: null as File | null, description: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle image upload logic here
    setShowAddImageForm(false);
    setNewImage({ file: null, description: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <Card variant="elevated" className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>The Rising English Secondary Boarding School</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="pl-10"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Admin Header - Matching website theme */}
      <header className="bg-primary shadow-xl">
        <div className="container-custom mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/90 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-primary-foreground">Admin Panel</h1>
              <p className="text-xs text-primary-foreground/80">The Rising English Secondary Boarding School</p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Admin Content */}
      <main className="container-custom mx-auto px-4 py-8">
        {/* Tabs for Notice, Gallery, Contact */}
        <Tabs defaultValue="notices" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger 
              value="notices" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Bell className="w-4 h-4" />
              Notices
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Image className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Mail className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Notice Management Tab */}
          <TabsContent value="notices">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notice Management
                </CardTitle>
                <CardDescription>Create and manage school notices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Annual Sports Day 2024</h4>
                        <p className="text-sm text-muted-foreground">Posted: Dec 10, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Winter Vacation Notice</h4>
                        <p className="text-sm text-muted-foreground">Posted: Dec 5, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Parent-Teacher Meeting</h4>
                        <p className="text-sm text-muted-foreground">Posted: Nov 28, 2024</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    Add New Notice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management Tab */}
          <TabsContent value="gallery">
            <div className="space-y-6">
              {/* Add Image Button */}
              <div className="flex justify-end">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setShowAddImageForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>

              {/* View Images Section */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-primary" />
                    View Gallery Images
                  </CardTitle>
                  <CardDescription>Manage existing gallery images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: 1, description: 'Annual Sports Day 2024' },
                      { id: 2, description: 'Science Exhibition' },
                      { id: 3, description: 'Cultural Program' },
                      { id: 4, description: 'Independence Day Celebration' },
                      { id: 5, description: 'Parent-Teacher Meeting' },
                      { id: 6, description: 'Art Competition' },
                    ].map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden group">
                        <div className="relative aspect-video bg-muted flex items-center justify-center">
                          <Image className="w-12 h-12 text-muted-foreground" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button variant="outline" size="sm" className="bg-white">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-card">
                          <p className="text-sm font-medium text-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Uploaded: Dec 10, 2024</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="contact">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Messages
                </CardTitle>
                <CardDescription>View and respond to contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg divide-y">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">John Doe</h4>
                        <span className="text-xs text-muted-foreground">Dec 15, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">john.doe@email.com</p>
                      <p className="text-sm">Inquiry about admission process for Grade 5...</p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="ghost" size="sm">Mark as Read</Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Jane Smith</h4>
                        <span className="text-xs text-muted-foreground">Dec 14, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">jane.smith@email.com</p>
                      <p className="text-sm">Question about school transport facilities...</p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="ghost" size="sm">Mark as Read</Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Robert Johnson</h4>
                        <span className="text-xs text-muted-foreground">Dec 12, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">robert.j@email.com</p>
                      <p className="text-sm">Feedback about the recent annual day event...</p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="ghost" size="sm">Mark as Read</Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Image Dialog */}
      <Dialog open={showAddImageForm} onOpenChange={setShowAddImageForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              Add New Image
            </DialogTitle>
            <DialogDescription>Upload an image and add a description</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Image className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              <Input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => setNewImage({ ...newImage, file: e.target.files?.[0] || null })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image Description
              </label>
              <Input 
                placeholder="Enter image description"
                value={newImage.description}
                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowAddImageForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;