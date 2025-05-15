import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    title: "Online Courses",
    description: "Free courses across various subjects from top universities and educational platforms.",
    link: "https://www.khanacademy.org",
    tags: [
      { text: "Khan Academy", color: "bg-blue-900/30 text-blue-400" },
      { text: "Coursera", color: "bg-blue-900/30 text-blue-400" },
      { text: "edX", color: "bg-blue-900/30 text-blue-400" }
    ]
  },
  {
    title: "Research Databases",
    description: "Access to academic journals, research papers, and scholarly articles for your studies.",
    link: "https://www.jstor.org",
    tags: [
      { text: "JSTOR", color: "bg-purple-900/30 text-purple-400" },
      { text: "Google Scholar", color: "bg-purple-900/30 text-purple-400" },
      { text: "ProQuest", color: "bg-purple-900/30 text-purple-400" }
    ]
  },
  {
    title: "Study Tools",
    description: "Interactive study tools to help you learn and memorize information more effectively.",
    link: "https://quizlet.com",
    tags: [
      { text: "Quizlet", color: "bg-green-900/30 text-green-400" },
      { text: "Anki", color: "bg-green-900/30 text-green-400" },
      { text: "Notion", color: "bg-green-900/30 text-green-400" }
    ]
  },
  {
    title: "Writing Resources",
    description: "Guides on academic writing, citation styles, and tools to improve your writing skills.",
    link: "https://owl.purdue.edu/owl/purdue_owl.html",
    tags: [
      { text: "Purdue OWL", color: "bg-amber-900/30 text-amber-400" },
      { text: "Grammarly", color: "bg-amber-900/30 text-amber-400" },
      { text: "Hemingway", color: "bg-amber-900/30 text-amber-400" }
    ]
  },
  {
    title: "Math & Science Tools",
    description: "Computational tools and resources for mathematics, physics, chemistry, and more.",
    link: "https://www.wolframalpha.com",
    tags: [
      { text: "Wolfram Alpha", color: "bg-red-900/30 text-red-400" },
      { text: "Desmos", color: "bg-red-900/30 text-red-400" },
      { text: "GeoGebra", color: "bg-red-900/30 text-red-400" }
    ]
  },
  {
    title: "Reference Management",
    description: "Tools to organize research papers, create bibliographies, and manage citations.",
    link: "https://www.mendeley.com",
    tags: [
      { text: "Zotero", color: "bg-teal-900/30 text-teal-400" },
      { text: "Mendeley", color: "bg-teal-900/30 text-teal-400" },
      { text: "EndNote", color: "bg-teal-900/30 text-teal-400" }
    ]
  }
];

const Resources = () => {
  return (
    <section id="resources" className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Educational Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access a comprehensive collection of resources to support your learning journey. From study guides to research tools, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <a 
              key={index}
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="bg-background border border-gray-800 rounded-xl shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {resource.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline"
                        className={`${tag.color} border-0 rounded`}
                      >
                        {tag.text}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
