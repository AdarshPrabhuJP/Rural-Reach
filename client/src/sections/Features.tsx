import { 
  ClipboardList, 
  Clock, 
  Users, 
  FileText, 
  BookOpen, 
  PieChart 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <ClipboardList className="h-10 w-10" />,
    title: "Personalized Study Plans",
    description: "Create customized study schedules based on your classes, learning style, and goals to maximize your productivity.",
    link: "#",
    linkText: "Learn more"
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Scholarship Matching",
    description: "Get matched with scholarships based on your profile, interests, and academic achievements to fund your education.",
    link: "#scholarships",
    linkText: "Find scholarships"
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Study Groups",
    description: "Connect with fellow students in your courses to form study groups, share resources, and collaborate on projects.",
    link: "#",
    linkText: "Join a group"
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Resource Library",
    description: "Access a vast collection of study materials, practice tests, and educational resources for all your subjects.",
    link: "#resources",
    linkText: "Browse resources"
  },
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Academic Advising",
    description: "Get guidance from academic advisors to help you choose courses, plan your degree, and navigate your educational path.",
    link: "#",
    linkText: "Schedule advising"
  },
  {
    icon: <PieChart className="h-10 w-10" />,
    title: "Progress Tracking",
    description: "Monitor your academic progress with insightful analytics and reports to identify strengths and areas for improvement.",
    link: "#",
    linkText: "View analytics"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background border border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-primary text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <a href={feature.link} className="text-primary hover:underline inline-flex items-center">
                  {feature.linkText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
