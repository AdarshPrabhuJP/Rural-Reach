import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  BookOpen, 
  Video, 
  School, 
  GraduationCap, 
  BookA,
  BookmarkCheck
} from "lucide-react";
import NearbySchools from "@/components/NearbySchools";
import { useLanguage } from "@/context/LanguageContext";

const educationServices = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Free Educational Content",
    description: "Access free educational materials for classes 1st through 10th grade covering all major subjects.",
    link: "https://diksha.gov.in/",
    linkText: "Browse Materials"
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: "Video & Audio Lessons",
    description: "Watch video lessons and listen to audio content in regional languages to support learning.",
    link: "https://swayam.gov.in/",
    linkText: "Access Lessons"
  },
  {
    icon: <School className="h-10 w-10" />,
    title: "Schools & Study Centers",
    description: "Find information about schools and tuition centers in your vicinity along with contact details.",
    link: "https://www.education.gov.in/en/school-education",
    linkText: "Find Schools"
  },
  {
    icon: <GraduationCap className="h-10 w-10" />,
    title: "Scholarships & Exams",
    description: "Stay updated on scholarship opportunities and important examination dates for all educational levels.",
    link: "https://scholarships.gov.in/",
    linkText: "Check Scholarships"
  },
  {
    icon: <BookA className="h-10 w-10" />,
    title: "Adult Literacy",
    description: "Access adult literacy modules with audio and text formats to support continuous learning.",
    link: "https://www.nlm.gov.in/",
    linkText: "Literacy Programs"
  }
];

const Education = () => {
  const { translate } = useLanguage();
  return (
    <section id="education" className="py-16 px-4 education-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 section-title">EDUCATION</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {translate('education.description')}
          </p>
        </div>

        {/* Nearby Schools & Colleges Section */}
        <div className="mb-12">
          <NearbySchools className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationServices.map((service, index) => (
            <Card key={index} className="bg-background border border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-primary text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <a 
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  {service.linkText}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a 
              href="https://www.education.gov.in/en" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Education Ministry Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Education;