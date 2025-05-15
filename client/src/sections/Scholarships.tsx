import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const scholarships = [
  {
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "Merit scholarship award",
    badge: { text: "Merit-Based", color: "bg-blue-900/30 text-blue-400" },
    title: "Academic Excellence Scholarship",
    description: "For students with outstanding academic achievements and leadership potential.",
    award: "$5,000-$15,000",
    link: "https://www.fastweb.com/college-scholarships/articles/the-top-10-most-prestigious-scholarships-in-america"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "Diversity scholarship program",
    badge: { text: "Diversity", color: "bg-purple-900/30 text-purple-400" },
    title: "Future Leaders Diversity Scholarship",
    description: "Supporting underrepresented students pursuing higher education in all fields.",
    award: "$2,500-$10,000",
    link: "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/student-characteristics/minority"
  },
  {
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "STEM scholarship program",
    badge: { text: "STEM", color: "bg-green-900/30 text-green-400" },
    title: "Innovation in STEM Scholarship",
    description: "For students pursuing degrees in science, technology, engineering, and mathematics.",
    award: "$3,000-$12,000",
    link: "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/engineering"
  },
  {
    image: "https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "Community service scholarship",
    badge: { text: "Service", color: "bg-amber-900/30 text-amber-400" },
    title: "Community Impact Scholarship",
    description: "Recognizing students who have made significant contributions to their communities.",
    award: "$1,000-$5,000",
    link: "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/special-attributes/community-service"
  },
  {
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "Creative arts scholarship",
    badge: { text: "Arts", color: "bg-red-900/30 text-red-400" },
    title: "Creative Expression Scholarship",
    description: "Supporting students pursuing degrees in visual arts, performing arts, and creative writing.",
    award: "$1,500-$7,500",
    link: "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/art"
  },
  {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    altText: "Need-based financial aid",
    badge: { text: "Need-Based", color: "bg-teal-900/30 text-teal-400" },
    title: "Educational Opportunity Grant",
    description: "Financial assistance for students demonstrating significant financial need to pursue higher education.",
    award: "$500-$10,000",
    link: "https://studentaid.gov/understand-aid/types/grants/fseog"
  }
];

const Scholarships = () => {
  return (
    <section id="scholarships" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Scholarships</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover scholarships tailored to your academic profile, interests, and career goals. We've partnered with leading organizations to help fund your education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship, index) => (
            <Card key={index} className="bg-background border border-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <img 
                src={scholarship.image} 
                alt={scholarship.altText} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge variant="outline" className={`${scholarship.badge.color} border-0 rounded-full mb-3`}>
                  {scholarship.badge.text}
                </Badge>
                <h3 className="text-xl font-bold mb-3">{scholarship.title}</h3>
                <p className="text-muted-foreground mb-4">{scholarship.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Award: {scholarship.award}</span>
                  <a 
                    href={scholarship.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Apply now
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <a 
              href="https://www.scholarships.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              Explore All Scholarships
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;
