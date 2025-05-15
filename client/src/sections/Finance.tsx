import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Building, 
  CreditCard, 
  Calculator, 
  MapPin,
  Users,
  BanknoteIcon,
  Landmark
} from "lucide-react";
import LoanPredictor from "@/components/LoanPredictor";
import { useLanguage } from "@/context/LanguageContext";

const financeServices = [
  {
    icon: <Building className="h-10 w-10" />,
    title: "Bank Account Opening Guide",
    description: "Step-by-step guide on how to open a bank account, including necessary documents and procedures.",
    link: "https://www.paisabazaar.com/saving-schemes/how-to-open-a-bank-account/",
    linkText: "View Guide"
  },
  {
    icon: <CreditCard className="h-10 w-10" />,
    title: "Gold & Silver Prices",
    description: "Track current gold and silver prices to make informed decisions about investments and purchases.",
    link: "https://www.mcxindia.com/market-data/spot-market-price",
    linkText: "Check Prices"
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: "ATM & Bank Locator",
    description: "Find the nearest ATMs and bank branches along with their operational hours and available services.",
    link: "https://www.bankbazaar.com/ifsc-code.html",
    linkText: "Find Banks & ATMs"
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Self-Help Groups (SHGs)",
    description: "Information about local Self-Help Groups for microloans and collective financial support in your area.",
    link: "https://nrlm.gov.in/shgOuterReports.do?methodName=showShgreport",
    linkText: "Find SHGs"
  }
];

const Finance = () => {
  const { translate } = useLanguage();
  return (
    <section id="finance" className="py-16 px-4 finance-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 section-title">FINANCE</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {translate('finance.description')}
          </p>
        </div>
        
        {/* Loan Eligibility Predictor */}
        <div className="mb-12">
          <LoanPredictor className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {financeServices.map((service, index) => (
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
              href="https://financialservices.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Financial Services Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Finance;