
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BarChart3, Table, AlertCircle, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { processQuery, getPredefinedQueries, type ChatMessage } from '@/services/aiService';
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  userRole: 'manager' | 'rep';
}

const ChatInterface = ({ userRole }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI sales assistant. I can help you analyze your sales data and provide insights. ${userRole === 'manager' ? 'As a manager, you have access to all performance metrics including individual cashier data.' : 'As a sales representative, I can help you with general sales insights and performance data.'}\n\nI'm connected to your live sales database and can answer questions about revenue, products, stores, and trends. Try asking me something!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const predefinedQueries = getPredefinedQueries(userRole);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending query:', input, 'with role:', userRole);
      const response = await processQuery(input, userRole);
      console.log('Received response:', response);
      setMessages(prev => [...prev, response]);
      
      toast({
        title: "Query Processed",
        description: "AI response generated using live database data",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please check that your database connection is working and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to process query. Check database connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuery = (query: string) => {
    setInput(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img src="/hot-sale.png" alt="Sales Assistant" className="h-6 w-auto" />
              <div className="h-6 w-px bg-border mx-1"></div>
              <span>AI Sales Assistant</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              userRole === 'manager' 
                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                : 'bg-green-100 text-green-800 border border-green-200'
            }`}>
              {userRole === 'manager' ? 'Manager' : 'Sales Rep'}
            </span>
            <div className="ml-auto flex items-center text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live Database Connected
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Role Access Info */}
          <div className="bg-muted/50 p-3 rounded-lg text-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Access Level:</span>
            </div>
            <p className="text-muted-foreground mt-1">
              {userRole === 'manager' 
                ? 'You have full access to all sales data, individual cashier performance, and management reports.' 
                : 'You can access general sales data, product performance, and store analytics. Individual cashier data is restricted.'}
            </p>
          </div>

          {/* Predefined Queries */}
          <div className="flex flex-wrap gap-2">
            {predefinedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedQuery(query)}
                className="text-xs"
                disabled={isLoading}
              >
                {query}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center overflow-hidden">
                        <img src="/hot-sale.png" alt="AI Assistant" className="h-5 w-auto opacity-90" />
                      </div>
                    )}
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Charts */}
                  {message.charts && message.charts.length > 0 && (
                    <div className="space-y-4">
                      {message.charts.map((chart, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <BarChart3 className="h-5 w-5" />
                            <h4 className="font-medium">{chart.title}</h4>
                          </div>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chart.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                              <Bar dataKey="value" fill="hsl(var(--primary))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Tables */}
                  {message.tables && message.tables.length > 0 && (
                    <div className="space-y-4">
                      {message.tables.map((table, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Table className="h-5 w-5" />
                            <h4 className="font-medium">Data Table</h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  {table.headers.map((header: string, i: number) => (
                                    <th key={i} className="text-left p-2 font-medium">{header}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.rows.map((row: string[], i: number) => (
                                  <tr key={i} className="border-b">
                                    {row.map((cell, j) => (
                                      <td key={j} className="p-2">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1 items-center">
                      <RefreshCw className="h-3 w-3 animate-spin mr-2" />
                      <span className="text-sm">Analyzing database data...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your sales data..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
