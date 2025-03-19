
import { useState } from 'react';
import { SidebarWrapper } from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  FileQuestion, 
  Send, 
  Bot, 
  Image as ImageIcon, 
  Paperclip,
  MessageSquare,
  Loader2,
  History,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

// Sample history data
const historyData = [
  { 
    id: "1", 
    question: "How do I implement a binary search tree in Python?", 
    timestamp: "2 days ago",
    solved: true
  },
  { 
    id: "2", 
    question: "Explain the difference between merge sort and quick sort", 
    timestamp: "1 week ago",
    solved: true
  },
  { 
    id: "3", 
    question: "What is the time complexity of the Dijkstra algorithm?", 
    timestamp: "2 weeks ago",
    solved: true
  },
];

const AIDoubtSolver = () => {
  const [question, setQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentChat, setCurrentChat] = useState<Array<{type: string, content: string}>>([
    {
      type: "bot",
      content: "Hello! I'm your AI Doubt Solver. Ask me any computer science question, and I'll help you understand the concept."
    }
  ]);
  
  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user message to chat
    setCurrentChat([...currentChat, { type: "user", content: question }]);
    
    // Simulate AI processing
    setIsProcessing(true);
    
    setTimeout(() => {
      if (question.toLowerCase().includes("binary search")) {
        setCurrentChat(prev => [...prev, { 
          type: "bot", 
          content: "A binary search tree (BST) is a data structure where each node has at most two children (left and right). For each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater.\n\nHere's a simple implementation in Python:\n\n```python\nclass Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BinarySearchTree:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, value):\n        if not self.root:\n            self.root = Node(value)\n            return\n        \n        self._insert_recursive(self.root, value)\n    \n    def _insert_recursive(self, node, value):\n        if value < node.value:\n            if node.left is None:\n                node.left = Node(value)\n            else:\n                self._insert_recursive(node.left, value)\n        else:\n            if node.right is None:\n                node.right = Node(value)\n            else:\n                self._insert_recursive(node.right, value)\n```\n\nWould you like me to explain how to implement other operations like search or deletion?" 
        }]);
      } else {
        setCurrentChat(prev => [...prev, { 
          type: "bot", 
          content: "I'd be happy to help with your question about \"" + question + "\". Could you provide a bit more context about what specifically you're trying to understand? This will help me give you the most relevant and helpful explanation." 
        }]);
      }
      
      setIsProcessing(false);
      setQuestion("");
    }, 1500);
  };
  
  return (
    <SidebarWrapper>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Doubt Solver</h1>
          <p className="text-muted-foreground mt-1">
            Get instant solutions to your computer science questions
          </p>
        </div>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4 animate-fade-in">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="border rounded-lg bg-secondary/30 overflow-hidden">
                  <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                    {currentChat.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground ml-auto' 
                              : 'bg-card border border-border shadow-sm'
                          }`}
                        >
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-xs font-medium">AI Tutor</span>
                            </div>
                          )}
                          <div className="whitespace-pre-line">
                            {message.content}
                          </div>
                          
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-secondary">
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-secondary">
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isProcessing && (
                      <div className="flex justify-start animate-pulse">
                        <div className="rounded-lg p-3 bg-secondary border border-border">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="p-3">
                    <div className="flex items-end gap-2">
                      <Textarea 
                        placeholder="Type your question here..." 
                        className="min-h-[60px] resize-none"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendQuestion();
                          }
                        }}
                      />
                      <Button 
                        className="rounded-full h-10 w-10 flex-shrink-0"
                        onClick={handleSendQuestion}
                        disabled={!question.trim() || isProcessing}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-secondary/30 p-4 rounded-lg border">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <FileQuestion className="h-4 w-4 mr-2" />
                Sample Questions
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto py-2 text-left"
                  onClick={() => {
                    setQuestion("How do I implement a binary search tree in Python?");
                  }}
                >
                  How do I implement a binary search tree in Python?
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto py-2 text-left"
                  onClick={() => {
                    setQuestion("Explain the difference between merge sort and quick sort");
                  }}
                >
                  Explain the difference between merge sort and quick sort
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto py-2 text-left"
                  onClick={() => {
                    setQuestion("What is the time complexity of the Dijkstra algorithm?");
                  }}
                >
                  What is the time complexity of the Dijkstra algorithm?
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recent Questions</h3>
              {historyData.map((item) => (
                <div 
                  key={item.id} 
                  className="border rounded-lg p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{item.question}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {item.timestamp}
                      </div>
                    </div>
                    {item.solved && (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        Solved
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarWrapper>
  );
};

const Badge = ({ children, className = "", variant = "default" }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default AIDoubtSolver;
