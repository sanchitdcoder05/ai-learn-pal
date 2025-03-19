
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarWrapper } from '@/components/Sidebar';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import AITutor from '@/components/AITutor';
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Users, 
  FileCheck, 
  ArrowLeft,
  CheckCircle2,
  Play,
  BookMarked
} from 'lucide-react';

// Course data (would come from API in real app)
const courseData = {
  id: "1",
  title: "Introduction to Python Programming",
  description: "Learn the fundamentals of Python programming language with hands-on exercises and projects. This comprehensive course will take you from a beginner to an intermediate Python developer through practical examples.",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=500",
  category: "Programming",
  level: "Beginner",
  duration: "8 weeks",
  enrolled: 2430,
  lessons: 24,
  progress: 65,
  instructor: {
    name: "Dr. Alex Morgan",
    role: "Senior Python Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80",
  },
  overview: "This course provides a comprehensive introduction to Python programming. You'll learn Python syntax, data types, control structures, functions, modules, file handling, exception handling, and object-oriented programming concepts. By the end of this course, you'll be able to develop practical Python applications and have the foundation needed for more advanced Python topics.",
  requirements: [
    "No prior programming experience required",
    "Basic computer skills",
    "Computer with internet access",
    "Enthusiasm to learn"
  ],
  syllabus: [
    {
      id: "module-1",
      title: "Getting Started with Python",
      lessons: [
        { id: "lesson-1-1", title: "Introduction to Python and Setting Up Environment", duration: "20 min", completed: true },
        { id: "lesson-1-2", title: "Your First Python Program", duration: "25 min", completed: true },
        { id: "lesson-1-3", title: "Python Syntax and Structure", duration: "30 min", completed: true },
      ]
    },
    {
      id: "module-2",
      title: "Python Data Types",
      lessons: [
        { id: "lesson-2-1", title: "Numbers and Operators", duration: "35 min", completed: true },
        { id: "lesson-2-2", title: "Strings and String Methods", duration: "40 min", completed: true },
        { id: "lesson-2-3", title: "Lists and Tuples", duration: "45 min", completed: false },
        { id: "lesson-2-4", title: "Dictionaries and Sets", duration: "50 min", completed: false },
      ]
    },
    {
      id: "module-3",
      title: "Control Flow",
      lessons: [
        { id: "lesson-3-1", title: "Conditional Statements", duration: "30 min", completed: false },
        { id: "lesson-3-2", title: "Loops in Python", duration: "45 min", completed: false },
        { id: "lesson-3-3", title: "Loop Control Statements", duration: "35 min", completed: false },
      ]
    },
    {
      id: "module-4",
      title: "Functions and Modules",
      lessons: [
        { id: "lesson-4-1", title: "Defining and Calling Functions", duration: "40 min", completed: false },
        { id: "lesson-4-2", title: "Function Parameters and Return Values", duration: "45 min", completed: false },
        { id: "lesson-4-3", title: "Lambda Functions", duration: "30 min", completed: false },
        { id: "lesson-4-4", title: "Importing and Creating Modules", duration: "50 min", completed: false },
      ]
    },
  ],
  reviews: [
    {
      id: "review-1",
      user: "Sarah Thompson",
      avatar: "S",
      rating: 5,
      date: "2 months ago",
      comment: "Excellent course for beginners! The explanations are clear and the exercises help reinforce the concepts."
    },
    {
      id: "review-2",
      user: "Michael Chen",
      avatar: "M",
      rating: 4,
      date: "3 months ago",
      comment: "Very good introduction to Python. I would have liked more advanced projects towards the end, but overall highly recommended."
    },
  ]
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState(courseData);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Simulate fetching course data
  useEffect(() => {
    window.scrollTo(0, 0);
    // In a real app, you would fetch course data based on ID
    setCourse(courseData);
  }, [id]);
  
  // Count completed lessons
  const completedLessons = course.syllabus.flatMap(module => module.lessons)
    .filter(lesson => lesson.completed).length;
  
  const totalLessons = course.syllabus.flatMap(module => module.lessons).length;
  
  return (
    <SidebarWrapper>
      <div className="space-y-8 animate-fade-in">
        {/* Back button */}
        <Link to="/courses">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Button>
        </Link>
        
        {/* Course header */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          </div>
          
          <div className="relative p-6 md:p-8 text-white">
            <div className="max-w-3xl">
              <Badge className="bg-primary/90 border-primary mb-4">
                {course.category}
              </Badge>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              
              <p className="text-white/90 mb-6 max-w-2xl">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm mb-8">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {course.level}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrolled.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.lessons} lessons
                </div>
                <div className="flex items-center">
                  <FileCheck className="h-4 w-4 mr-1" />
                  Certificate
                </div>
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-white/80">{course.instructor.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course progress */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm animate-slide-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Course Progress</h3>
              <p className="text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed ({Math.round((completedLessons / totalLessons) * 100)}%)
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <BookMarked className="h-4 w-4 mr-2" />
                View Notes
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </div>
          
          <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
        </div>
        
        {/* Course content */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-6"
        >
          <TabsList className="w-full md:w-auto justify-start border-b rounded-none px-0 h-auto flex flex-wrap gap-2 bg-transparent">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none h-auto bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="curriculum" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none h-auto bg-transparent"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger 
              value="ai-tutor" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none h-auto bg-transparent"
            >
              AI Tutor
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none h-auto bg-transparent"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-semibold mb-3">About This Course</h3>
              <p className="text-foreground/80 whitespace-pre-line">{course.overview}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Python syntax and structure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Working with Python data types</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Control flow and loops</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Functions and modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>File handling and exception handling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Object-oriented programming</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Working with APIs and libraries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Building practical applications</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="curriculum" className="animate-fade-in">
            <div>
              <h3 className="text-xl font-semibold mb-6">Course Curriculum</h3>
              
              <Accordion type="single" collapsible className="space-y-4">
                {course.syllabus.map((module) => (
                  <AccordionItem 
                    key={module.id}
                    value={module.id}
                    className="border rounded-lg px-4 py-0 overflow-hidden"
                  >
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="text-left">
                          <div className="font-semibold">{module.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {module.lessons.length} lessons • {
                              module.lessons.filter(l => l.completed).length
                            } completed
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-4">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="bg-secondary/40 rounded-lg">
                            <Link 
                              to={`/course/${course.id}/lesson/${lesson.id}`}
                              className="flex items-center justify-between p-3 hover:bg-secondary transition-colors"
                            >
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                                  lesson.completed 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {lesson.completed ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-3 w-3" />
                                  )}
                                </div>
                                <span className={lesson.completed ? 'line-through text-muted-foreground' : ''}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-tutor" className="animate-fade-in">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Tutoring</h3>
                <p className="text-foreground/80 mb-6">
                  Ask questions about any topic in the course and get instant help from our AI tutor. 
                  The AI tutor can explain concepts, provide examples, and help you debug code.
                </p>
              </div>
              
              <AITutor courseId={course.id} lessonId="current" />
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="animate-fade-in">
            <div>
              <h3 className="text-xl font-semibold mb-6">Student Reviews</h3>
              
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${review.avatar}.png`} />
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <div className="font-medium mr-2">{review.user}</div>
                          <div className="text-xs text-muted-foreground">{review.date}</div>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        
                        <p className="text-foreground/80">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarWrapper>
  );
};

export default CourseDetail;
