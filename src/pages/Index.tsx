
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BarChart3, Shield, Zap, TrendingUp, Users } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import Analytics from "@/components/Analytics";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'manager' | 'rep'>('rep');
  const [currentView, setCurrentView] = useState<'chat' | 'analytics'>('chat');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'manager' | 'rep'>('rep');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication - in production, use proper Supabase auth
    if (email && password) {
      setUserRole(selectedRole);
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/sfw-logo.png" alt="SFW Technologies Logo" className="h-10 w-auto" />
              <div className="h-8 w-px bg-border mx-2"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Sales Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={currentView === 'chat' ? 'default' : 'outline'}
                onClick={() => setCurrentView('chat')}
                className="transition-all duration-300"
              >
                Chat
              </Button>
              <Button
                variant={currentView === 'analytics' ? 'default' : 'outline'}
                onClick={() => setCurrentView('analytics')}
                className="transition-all duration-300"
              >
                Analytics
              </Button>
              <div className="text-sm text-muted-foreground">
                Role: <span className="font-medium capitalize text-primary">{userRole}</span>
              </div>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {currentView === 'chat' ? (
            <ChatInterface userRole={userRole} />
          ) : (
            <Analytics userRole={userRole} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background/50 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-border/20">
                <img src="/sfw-logo.png" alt="SFW Technologies Logo" className="h-16 w-auto mx-auto" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary/90">
                Sales Analytics
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/90 leading-relaxed">
              Ask questions in natural language. Get instant insights from your sales data.
              <br />
              Transform your CRM data into actionable intelligence with SFW Technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
                <Zap className="h-5 w-5" />
                <span>Real-time Insights</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
                <Shield className="h-5 w-5" />
                <span>Role-based Access</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
                <BarChart3 className="h-5 w-5" />
                <span>Smart Visualizations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform your sales data into actionable insights
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Natural Language Queries</CardTitle>
                <CardDescription>
                  Ask questions like "Show me top 5 salespeople this month" and get instant answers
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Managers see comprehensive data while reps access relevant insights for their performance
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Visualizations</CardTitle>
                <CardDescription>
                  Automatic chart generation with tables, graphs, and downloadable reports
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 animate-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Access SalesBot AI</CardTitle>
                <CardDescription>
                  Sign in to start analyzing your sales data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sales@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={selectedRole} onValueChange={(value: 'manager' | 'rep') => setSelectedRole(value)}>
                      <SelectTrigger className="transition-all duration-300 focus:shadow-lg">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rep">Sales Representative</SelectItem>
                        <SelectItem value="manager">Sales Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-hero text-white border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
