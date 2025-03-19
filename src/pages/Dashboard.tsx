
import { useEffect, useState } from 'react';
import { SidebarWrapper } from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from '@/components/CourseCard';
import { BookOpen, GraduationCap, Timer, TrendingUp } from 'lucide-react';

// Placeholder data
const enrolledCourses = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    description: "Learn the fundamentals of Python programming language.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=337",
    category: "Programming",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 2430,
    lessons: 24,
    progress: 65,
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    description: "Master the essential computer science concepts for technical interviews.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=337",
    category: "Computer Science",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 1897,
    lessons: 36,
    progress: 25,
  },
];

// Recommended courses data
const recommendedCourses = [
  {
    id: "3",
    title: "Web Development with React",
    description: "Build modern frontend applications with React and related technologies.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=337",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 weeks",
    enrolled: 3540,
    lessons: 32,
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts of machine learning and implement basic algorithms.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=337",
    category: "Data Science",
    level: "Advanced",
    duration: "14 weeks",
    enrolled: 2830,
    lessons: 42,
  },
];

const Dashboard = () => {
  const [progress, setProgress] = useState(25);
  
  // Simulate progress change
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SidebarWrapper>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>
          <div className="flex items-center p-2 pl-3 bg-secondary rounded-lg">
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">Weekly streak: 4 days</span>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-slide-up" style={{animationDelay: "100ms"}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">66%</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                  <span>+5% this week</span>
                </div>
              </div>
              <Progress value={progress} className="h-2 mt-4" />
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up" style={{animationDelay: "200ms"}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Courses Enrolled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">5</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>2 active</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up" style={{animationDelay: "300ms"}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Study Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">24h</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Timer className="h-4 w-4 mr-1" />
                  <span>This month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Courses section */}
        <Tabs defaultValue="enrolled" className="mt-8">
          <TabsList>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course, i) => (
                <div 
                  key={course.id} 
                  className="animate-slide-up" 
                  style={{animationDelay: `${i * 100 + 100}ms`}}
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <span className="text-white text-sm font-medium bg-primary/90 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <span className="text-white text-sm font-medium">
                          {course.progress}% Complete
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      
                      <div className="mt-4 mb-3">
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {course.level}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {course.lessons} lessons
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* AI Recommendations */}
        <Card className="mt-8 animate-slide-up">
          <CardHeader>
            <CardTitle>AI Learning Recommendations</CardTitle>
            <CardDescription>Based on your learning patterns and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-secondary/50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Learning Pace Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're progressing 20% faster in algorithm problems compared to the course average. Consider exploring more advanced data structure concepts.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-secondary/50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Suggested Focus Areas</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your quiz results, we recommend spending more time on Python functions and recursion concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarWrapper>
  );
};

export default Dashboard;
