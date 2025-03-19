
import { useState } from 'react';
import { SidebarWrapper } from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  TestTube, 
  Check,
  X,
  Clock,
  FileText,
  AlertCircle,
  BarChart,
  Loader2
} from 'lucide-react';

const AITest = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [testGenerated, setTestGenerated] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Sample questions for demo
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the time complexity of the binary search algorithm?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(n²)"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which of the following is not a principle of object-oriented programming?",
      options: [
        "Inheritance",
        "Encapsulation",
        "Polymorphism",
        "Fragmentation"
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      question: "What does the acronym SQL stand for?",
      options: [
        "Structured Query Language",
        "Standard Query Language",
        "System Query Language",
        "Sequential Query Language"
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "In Python, which of the following is an immutable data type?",
      options: [
        "List",
        "Dictionary",
        "Set",
        "Tuple"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "Which sorting algorithm has the best average-case time complexity?",
      options: [
        "Bubble Sort",
        "Insertion Sort",
        "Quick Sort",
        "Selection Sort"
      ],
      correctAnswer: 2
    }
  ]);
  
  const handleGenerateTest = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate test generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      setTestGenerated(true);
      setRemainingTime(timeLimit * 60);
    }, 2000);
  };
  
  const handleStartTest = () => {
    setTestStarted(true);
    
    // Start the timer
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleSelectAnswer = (questionIdx: number, optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIdx]: optionIdx
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleCompleteTest = () => {
    setTestCompleted(true);
  };
  
  const calculateScore = () => {
    let correct = 0;
    
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <SidebarWrapper>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">AI Test Generator</h1>
          <p className="text-muted-foreground mt-1">
            Create custom tests to assess your knowledge on any topic
          </p>
        </div>
        
        {!testGenerated ? (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                Create a New Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Input 
                  placeholder="e.g., Data Structures and Algorithms" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the specific topic you want to be tested on
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <div className="flex space-x-2">
                    {["easy", "medium", "hard"].map((level) => (
                      <Button 
                        key={level}
                        type="button"
                        variant={difficulty === level ? "default" : "outline"}
                        className="flex-1 capitalize"
                        onClick={() => setDifficulty(level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Limit (minutes)</label>
                  <Input 
                    type="number" 
                    min="5" 
                    max="60"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value) || 15)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Instructions (Optional)</label>
                <Textarea 
                  placeholder="Enter any specific instructions or focus areas for the test..."
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={handleGenerateTest}
                disabled={!topic.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Test...
                  </>
                ) : (
                  "Generate Test"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : !testStarted ? (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Test Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 bg-secondary/30">
                <h3 className="font-medium mb-2">Test Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Topic</p>
                    <p className="font-medium">{topic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium capitalize">{difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <p className="font-medium">{questions.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Limit</p>
                    <p className="font-medium">{timeLimit} minutes</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>Once you start the test, the timer will begin and cannot be paused.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>You can navigate between questions using the previous and next buttons.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                    <span>Submit your test when you're finished or when the time runs out.</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full" onClick={handleStartTest}>
                Start Test
              </Button>
            </CardContent>
          </Card>
        ) : !testCompleted ? (
          <div className="animate-fade-in">
            <div className="bg-card rounded-lg border shadow-sm p-4 mb-6 flex justify-between items-center">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-3">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className={`font-mono ${remainingTime < 60 ? 'text-red-500' : ''}`}>
                  {formatTime(remainingTime)}
                </span>
              </div>
            </div>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-3 rounded-lg border ${
                        selectedAnswers[currentQuestion] === index 
                          ? 'bg-primary/10 border-primary' 
                          : 'bg-card hover:bg-secondary/50'
                      } transition-colors`}
                      onClick={() => handleSelectAnswer(currentQuestion, index)}
                    >
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full ${
                          selectedAnswers[currentQuestion] === index 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        } flex items-center justify-center mr-3 flex-shrink-0`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button onClick={handleCompleteTest}>
                  Submit Test
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-scale-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">{calculateScore().percentage}%</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">
                    {calculateScore().correct} out of {calculateScore().total} correct
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {calculateScore().percentage >= 80 ? 'Excellent work!' : 
                     calculateScore().percentage >= 60 ? 'Good job!' : 
                     'Keep practicing!'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-1">Time Taken</p>
                      <p className="font-semibold">{formatTime(timeLimit * 60 - remainingTime)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-1">Difficulty</p>
                      <p className="font-semibold capitalize">{difficulty}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="font-semibold mb-4">Review Questions</h3>
                
                <div className="space-y-6">
                  {questions.map((q, qIndex) => (
                    <div key={q.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-secondary/30 p-3 flex items-center justify-between">
                        <span className="font-medium">Question {qIndex + 1}</span>
                        {selectedAnswers[qIndex] === q.correctAnswer ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Check className="h-3.5 w-3.5 mr-1" /> Correct
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <X className="h-3.5 w-3.5 mr-1" /> Incorrect
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <p className="mb-4">{q.question}</p>
                        
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-2 rounded-md ${
                                q.correctAnswer === oIndex 
                                  ? 'bg-green-100 border border-green-200' 
                                  : selectedAnswers[qIndex] === oIndex 
                                    ? 'bg-red-100 border border-red-200' 
                                    : 'bg-secondary/30'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full ${
                                  q.correctAnswer === oIndex 
                                    ? 'bg-green-500 text-white' 
                                    : selectedAnswers[qIndex] === oIndex 
                                      ? 'bg-red-500 text-white' 
                                      : 'bg-secondary text-foreground'
                                } flex items-center justify-center mr-2 text-xs`}>
                                  {String.fromCharCode(65 + oIndex)}
                                </div>
                                <span>{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {selectedAnswers[qIndex] !== q.correctAnswer && (
                          <div className="mt-4 p-3 bg-secondary/30 rounded-md">
                            <p className="text-sm font-medium">Explanation:</p>
                            <p className="text-sm mt-1">
                              {q.correctAnswer === 1 && qIndex === 0 && "The binary search algorithm has a time complexity of O(log n) because it repeatedly divides the search interval in half."}
                              {q.correctAnswer === 3 && qIndex === 1 && "The four principles of OOP are Inheritance, Encapsulation, Polymorphism, and Abstraction. Fragmentation is not a principle of OOP."}
                              {q.correctAnswer === 0 && qIndex === 2 && "SQL stands for Structured Query Language, which is a standard language for storing, manipulating, and retrieving data in relational databases."}
                              {q.correctAnswer === 3 && qIndex === 3 && "In Python, lists, dictionaries, and sets are mutable, while tuples are immutable (cannot be changed after creation)."}
                              {q.correctAnswer === 2 && qIndex === 4 && "Quick Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort, Insertion Sort, and Selection Sort, which all have O(n²) average-case time complexity."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTestGenerated(false);
                      setTestStarted(false);
                      setTestCompleted(false);
                      setTopic("");
                      setSelectedAnswers({});
                    }}
                  >
                    Create New Test
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setTestStarted(false);
                      setTestCompleted(false);
                      setSelectedAnswers({});
                    }}
                  >
                    Retake Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SidebarWrapper>
  );
};

export default AITest;
