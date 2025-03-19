
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, User, Mic, Video, StopCircle } from 'lucide-react';

interface AITutorProps {
  courseId: string;
  lessonId: string;
}

const AITutor = ({ courseId, lessonId }: AITutorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  
  const handleToggleAI = () => {
    setIsActive(!isActive);
  };
  
  const handleToggleWhiteboard = () => {
    setShowWhiteboard(!showWhiteboard);
  };
  
  return (
    <div className="border border-border rounded-xl shadow-sm overflow-hidden bg-card">
      <Tabs defaultValue="ai" className="w-full">
        <div className="border-b border-border p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="human">
              <User className="h-4 w-4 mr-2" /> Human Tutor
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Bot className="h-4 w-4 mr-2" /> AI Tutor
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="human" className="p-4 min-h-[300px] space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium">Connect with a Human Tutor</h3>
            <p className="text-muted-foreground">
              Schedule a session with one of our expert tutors.
            </p>
            <Button className="mt-4">Book Session</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="min-h-[300px]">
          <div className={`transition-all duration-300 ${showWhiteboard ? 'h-96' : 'h-0'}`}>
            {showWhiteboard && (
              <div className="w-full h-full bg-gray-50 border-b border-border p-4 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <p className="mb-2">Interactive Whiteboard</p>
                  <p className="text-sm">AI will visualize concepts here</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-4">
              {isActive ? (
                <div className="bg-primary/10 rounded-lg p-4 animate-pulse flex items-center">
                  <Bot className="h-5 w-5 text-primary mr-2" />
                  <p>AI tutor is listening and will respond...</p>
                </div>
              ) : (
                <div className="bg-secondary rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Bot className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium">AI Tutor</p>
                      <p>
                        Hello! I'm your AI tutor for this lesson. Ask me anything about the current topic 
                        and I'll provide detailed explanations with interactive examples.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={showWhiteboard ? "secondary" : "outline"} 
                size="sm" 
                onClick={handleToggleWhiteboard}
              >
                {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
              </Button>
              
              <div className="flex-1" />
              
              <Button 
                variant={isActive ? "destructive" : "default"} 
                size="icon" 
                onClick={handleToggleAI}
                className="rounded-full h-12 w-12"
              >
                {isActive ? (
                  <StopCircle className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITutor;
