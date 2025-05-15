import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Facebook, Twitter, Mic, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show toast notification
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "general",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Fill out the form below, call our helpline, or visit a local assistance center.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" className="gap-1 ml-auto">
                  <Mic className="h-4 w-4" />
                  <span>Voice Input</span>
                </Button>
              </div>
              
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input 
                  type="tel" 
                  id="mobile" 
                  name="mobile" 
                  placeholder="Your mobile number" 
                  required 
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="subject">Category</Label>
                <Select 
                  value={formData.subject} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="general">General Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  placeholder="Your question or concern" 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1">Send Message</Button>
                <Button type="button" variant="outline" className="gap-1">
                  <Volume2 className="h-4 w-4" />
                  <span>Listen</span>
                </Button>
              </div>
            </form>
          </div>
          
          <div className="md:w-1/2">
            <Card className="bg-background border border-gray-800 rounded-xl h-full">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Assistance Options</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Toll-Free Helpline</h4>
                      <p className="text-muted-foreground">1800-180-1551</p>
                      <p className="text-muted-foreground">Available 24x7 in multiple languages</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">help@graminseva.gov.in</p>
                      <p className="text-muted-foreground">support@graminseva.gov.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Local Assistance Centers</h4>
                      <p className="text-muted-foreground">Visit your nearest Gram Panchayat office</p>
                      <p className="text-muted-foreground">Common Service Centers (CSCs)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-foreground mb-4">Regional Offices</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start text-left" asChild>
                      <a href="#" className="flex items-center">
                        <span>North Region</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start text-left" asChild>
                      <a href="#" className="flex items-center">
                        <span>South Region</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start text-left" asChild>
                      <a href="#" className="flex items-center">
                        <span>East Region</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start text-left" asChild>
                      <a href="#" className="flex items-center">
                        <span>West Region</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
