
import { useState } from "react";
import { SidebarWrapper } from '@/components/Sidebar';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CourseCard from '@/components/CourseCard';
import { Search, Filter } from "lucide-react";

// Course data
const coursesData = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    description: "Learn the fundamentals of Python programming language with hands-on exercises and projects.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=337",
    category: "Programming",
    level: "Beginner",
    duration: "8 weeks",
    enrolled: 2430,
    lessons: 24,
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    description: "Master the essential computer science concepts for technical interviews and everyday programming.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=337",
    category: "Computer Science",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 1897,
    lessons: 36,
  },
  {
    id: "3",
    title: "Web Development with React",
    description: "Build modern frontend applications with React and related technologies in the ecosystem.",
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
    description: "Understand the core concepts of machine learning and implement basic algorithms from scratch.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=337",
    category: "Data Science",
    level: "Advanced",
    duration: "14 weeks",
    enrolled: 2830,
    lessons: 42,
  },
  {
    id: "5",
    title: "Full-Stack JavaScript Development",
    description: "Master both frontend and backend development with JavaScript, Node.js, and modern frameworks.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=337",
    category: "Web Development",
    level: "Intermediate",
    duration: "16 weeks",
    enrolled: 4215,
    lessons: 48,
  },
  {
    id: "6",
    title: "Advanced Algorithms and Optimization",
    description: "Dive deep into complex algorithms and optimization techniques for performance-critical applications.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=337",
    category: "Computer Science",
    level: "Advanced",
    duration: "10 weeks",
    enrolled: 1245,
    lessons: 30,
  },
];

const categories = ["All Categories", "Programming", "Computer Science", "Web Development", "Data Science"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search and filters
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "All Categories" || course.category === category;
    const matchesLevel = level === "All Levels" || course.level === level;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <SidebarWrapper>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Explore Courses</h1>
          <p className="text-muted-foreground mt-1">
            Discover our comprehensive library of computer science courses
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-secondary" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button>Search</Button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg border border-border animate-slide-down">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Level</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {(category !== "All Categories" || level !== "All Levels") && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {category !== "All Categories" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {category}
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => setCategory("All Categories")}
                >
                  ×
                </button>
              </Badge>
            )}
            {level !== "All Levels" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {level}
                <button 
                  className="ml-1 hover:text-destructive" 
                  onClick={() => setLevel("All Levels")}
                >
                  ×
                </button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={() => {
                setCategory("All Categories");
                setLevel("All Levels");
              }}
            >
              Clear all
            </Button>
          </div>
        )}
        
        <Separator />
        
        {/* Course listings */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredCourses.length} {filteredCourses.length === 1 ? "Course" : "Courses"} Available
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <div 
                key={course.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Courses;
