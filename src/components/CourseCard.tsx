
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, BookOpen } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  enrolled: number;
  lessons: number;
}

const CourseCard = ({
  id,
  title,
  description,
  image,
  category,
  level,
  duration,
  enrolled,
  lessons,
}: CourseCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-primary border-none">
          {category}
        </Badge>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {level}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {duration}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            {enrolled.toLocaleString()} students
          </div>
          <div className="flex items-center text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            {lessons} lessons
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/course/${id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </Link>
          <Link to={`/dashboard`} className="flex-1">
            <Button className="w-full">Enroll</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
