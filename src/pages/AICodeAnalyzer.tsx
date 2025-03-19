
import { useState } from 'react';
import { SidebarWrapper } from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  Code, 
  Play, 
  Bot, 
  LoaderCircle,
  MessageCircle,
  Zap,
  XCircle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const AICodeAnalyzer = () => {
  const [code, setCode] = useState(`def fibonacci(n):
  if n <= 0:
    return 0
  elif n == 1:
    return 1
  else:
    return fibonacci(n-1) + fibonacci(n-2)

# This will be very slow for large numbers
result = fibonacci(35)
print(result)`);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('analysis');
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };
  
  return (
    <SidebarWrapper>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Code Analyzer</h1>
          <p className="text-muted-foreground mt-1">
            Get real-time feedback and suggestions for your code
          </p>
        </div>
        
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              <div className="bg-secondary p-2 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Code Editor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    className="h-7"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <LoaderCircle className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-0 overflow-auto bg-background">
                <textarea
                  className="w-full h-full p-4 font-mono text-sm bg-background resize-none focus:outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="bg-secondary p-2 border-b">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger 
                      value="analysis" 
                      className="text-xs data-[state=active]:bg-background rounded-sm px-3 py-1.5"
                    >
                      Analysis
                    </TabsTrigger>
                    <TabsTrigger 
                      value="chat" 
                      className="text-xs data-[state=active]:bg-background rounded-sm px-3 py-1.5"
                    >
                      Chat
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="analysis" className="flex-1 p-0 m-0 overflow-auto">
                  {!showResults ? (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Code className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        Ready to analyze your code
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Click the "Analyze" button to get AI-powered insights, optimization suggestions, and potential issues in your code.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 space-y-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-secondary p-3 border-b">
                          <h3 className="font-medium">Summary</h3>
                        </div>
                        <div className="p-4">
                          <p className="text-sm">
                            Your code implements the Fibonacci sequence using a recursive approach. While the implementation is correct, it has significant performance issues for larger inputs due to redundant calculations. 
                          </p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-secondary p-3 border-b">
                          <h3 className="font-medium">Performance Issues</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start space-x-3">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Exponential Time Complexity</p>
                              <p className="text-xs text-muted-foreground">
                                The recursive implementation has O(2^n) time complexity, making it extremely inefficient for larger values.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Redundant Calculations</p>
                              <p className="text-xs text-muted-foreground">
                                The same Fibonacci values are calculated multiple times, resulting in unnecessary computation.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-secondary p-3 border-b">
                          <h3 className="font-medium">Suggested Improvements</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Use Dynamic Programming</p>
                              <p className="text-xs text-muted-foreground mb-2">
                                Implement memoization to store previously calculated results and avoid redundant calculations.
                              </p>
                              <pre className="bg-secondary/30 p-2 rounded text-xs font-mono overflow-x-auto">
{`def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
        return memo[n]

result = fibonacci_memo(35)
print(result)`}
                              </pre>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Use Iterative Approach</p>
                              <p className="text-xs text-muted-foreground mb-2">
                                An iterative solution is more efficient and avoids stack overflow for large inputs.
                              </p>
                              <pre className="bg-secondary/30 p-2 rounded text-xs font-mono overflow-x-auto">
{`def fibonacci_iterative(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

result = fibonacci_iterative(35)
print(result)`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-secondary p-3 border-b">
                          <h3 className="font-medium">Code Quality</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Clear Function Implementation</p>
                              <p className="text-xs text-muted-foreground">
                                The function is well-structured and easy to understand.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Missing Docstring</p>
                              <p className="text-xs text-muted-foreground">
                                Consider adding a docstring to explain the function's purpose, parameters, and return value.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="chat" className="flex-1 p-0 m-0 flex flex-col">
                  <div className="flex-1 overflow-auto p-4">
                    <div className="rounded-lg bg-secondary/30 p-3 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm">
                            Hi there! I'm your AI code assistant. I can help you understand, optimize, and debug your code. Ask me anything about your code, and I'll provide insights and suggestions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ask about your code..."
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button size="sm" className="h-9">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarWrapper>
  );
};

export default AICodeAnalyzer;
