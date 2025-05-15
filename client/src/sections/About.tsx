import { Users, Building, DollarSign } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6">About StudyBud</h2>
            <p className="text-muted-foreground mb-6">
              StudyBud was founded with a simple mission: to help students achieve their academic goals by providing the tools, resources, and support they need to succeed. We believe that education should be accessible to everyone, regardless of their background or circumstances.
            </p>
            <p className="text-muted-foreground mb-6">
              Our team consists of educators, technologists, and former students who understand the challenges of navigating the educational landscape. We're committed to creating a platform that addresses these challenges and empowers students to reach their full potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">10,000+</h4>
                  <p className="text-sm text-muted-foreground">Students Helped</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">500+</h4>
                  <p className="text-sm text-muted-foreground">Partner Institutions</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">$5M+</h4>
                  <p className="text-sm text-muted-foreground">Scholarships Awarded</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="The StudyBud team working together" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
