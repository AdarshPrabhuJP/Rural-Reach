import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { 
  Calculator, 
  CreditCard, 
  IndianRupee, 
  Coins, 
  Home, 
  Tractor, 
  GraduationCap, 
  Landmark
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface LoanPredictorProps {
  className?: string;
}

type LoanType = "agriculture" | "education" | "home" | "personal";

interface LoanEligibility {
  eligible: boolean;
  amount: number;
  interest: number;
  term: number;
  emi: number;
  recommendation?: string;
}

const LoanPredictor = ({ className = "" }: LoanPredictorProps) => {
  const { translate } = useLanguage();
  const [loanType, setLoanType] = useState<LoanType>("agriculture");
  const [income, setIncome] = useState<number>(20000);
  const [age, setAge] = useState<string>("30");
  const [existingLoans, setExistingLoans] = useState<string>("0");
  const [creditScore, setCreditScore] = useState<string>("700");
  const [landSize, setLandSize] = useState<string>("");
  const [eligibility, setEligibility] = useState<LoanEligibility | null>(null);
  const [showForm, setShowForm] = useState(true);

  const loanTypeOptions = [
    { value: "agriculture", label: "Agriculture Loan", icon: <Tractor className="h-4 w-4" /> },
    { value: "education", label: "Education Loan", icon: <GraduationCap className="h-4 w-4" /> },
    { value: "home", label: "Home Loan", icon: <Home className="h-4 w-4" /> },
    { value: "personal", label: "Personal Loan", icon: <CreditCard className="h-4 w-4" /> }
  ];

  // Format currency to Indian Rupees format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateEMI = (principal: number, ratePerMonth: number, timeInMonths: number) => {
    const rate = ratePerMonth / 100;
    return (principal * rate * Math.pow(1 + rate, timeInMonths)) / (Math.pow(1 + rate, timeInMonths) - 1);
  };

  const checkEligibility = () => {
    let eligible = true;
    let maxAmount = 0;
    let interestRate = 0;
    let termInMonths = 0;
    let recommendation = "";

    const ageNum = parseInt(age);
    const creditScoreNum = parseInt(creditScore);
    const existingLoansNum = parseInt(existingLoans);

    // Basic eligibility checks
    if (ageNum < 21 || ageNum > 65) {
      eligible = false;
      recommendation = "Age should be between 21 and 65 years for loan eligibility.";
    } else if (creditScoreNum < 650) {
      eligible = false;
      recommendation = "Credit score below 650 affects loan eligibility. Consider improving your credit score.";
    } else if (income < 10000) {
      eligible = false;
      recommendation = "Minimum income requirement not met. Consider income enhancement opportunities.";
    } else if (existingLoansNum > 2) {
      eligible = false;
      recommendation = "Multiple existing loans detected. Consider consolidating loans before applying.";
    }

    // Calculate based on loan type if eligible
    if (eligible) {
      const incomeFactor = income / 10000;

      switch (loanType) {
        case "agriculture":
          const landSizeNum = parseFloat(landSize || "0");
          if (landSizeNum < 1) {
            eligible = false;
            recommendation = "Minimum 1 acre land required for agriculture loan.";
          } else {
            maxAmount = Math.min(landSizeNum * 100000, incomeFactor * 200000);
            interestRate = 7;
            termInMonths = 60;
            recommendation = "Consider Kisan Credit Card for seasonal crop loans with lower interest rates.";
          }
          break;

        case "education":
          maxAmount = Math.min(incomeFactor * 300000, 1000000);
          interestRate = 8.5;
          termInMonths = 84;
          recommendation = "Look for central government education loan subsidies for reduced interest burden.";
          break;

        case "home":
          maxAmount = Math.min(incomeFactor * 500000, 3000000);
          interestRate = 8.75;
          termInMonths = 240;
          recommendation = "Check PM Awas Yojana for subsidy benefits on home loans.";
          break;
          
        case "personal":
          maxAmount = Math.min(incomeFactor * 150000, 500000);
          interestRate = 12;
          termInMonths = 36;
          recommendation = "Consider secured loan options for lower interest rates.";
          break;
      }
    }

    const monthlyRate = interestRate / 12;
    const emi = eligible ? calculateEMI(maxAmount, monthlyRate, termInMonths) : 0;

    setEligibility({
      eligible,
      amount: maxAmount,
      interest: interestRate,
      term: termInMonths / 12,
      emi,
      recommendation
    });

    setShowForm(false);
  };

  const resetForm = () => {
    setShowForm(true);
    setEligibility(null);
  };

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Loan Eligibility Predictor
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showForm ? (
          <div className="space-y-4">
            {/* Loan Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Type</label>
              <Select value={loanType} onValueChange={(value) => setLoanType(value as LoanType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  {loanTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.icon}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Monthly Income</label>
                <span className="text-primary font-medium text-sm">
                  {formatCurrency(income)}
                </span>
              </div>
              <Slider
                defaultValue={[20000]}
                min={5000}
                max={100000}
                step={1000}
                onValueChange={(value) => setIncome(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹5,000</span>
                <span>₹100,000</span>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                max="70"
              />
            </div>

            {/* Credit Score */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Credit Score (CIBIL)</label>
              <Input
                type="number"
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                min="300"
                max="900"
              />
            </div>

            {/* Existing Loans */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Existing Loans</label>
              <Input
                type="number"
                value={existingLoans}
                onChange={(e) => setExistingLoans(e.target.value)}
                min="0"
                max="5"
              />
            </div>

            {/* Conditional Field for Agriculture Loan */}
            {loanType === "agriculture" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Land Size (in acres)</label>
                <Input
                  type="number"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  min="0"
                  step="0.5"
                />
              </div>
            )}

            <Button className="w-full" onClick={checkEligibility}>
              Check Eligibility
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              {eligibility?.eligible ? (
                <div className="rounded-full w-20 h-20 bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-4">
                  <Coins className="h-10 w-10" />
                </div>
              ) : (
                <div className="rounded-full w-20 h-20 bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
                  <Landmark className="h-10 w-10" />
                </div>
              )}
              
              <h3 className="text-xl font-bold">
                {eligibility?.eligible 
                  ? "You're Eligible!" 
                  : "Not Eligible At This Time"}
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                {eligibility?.recommendation}
              </p>
            </div>
            
            {eligibility?.eligible && (
              <div className="border border-gray-800 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(eligibility.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-xl font-bold">{eligibility.interest}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Term</p>
                    <p className="text-xl font-bold">{eligibility.term} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(eligibility.emi)}</p>
                  </div>
                </div>
                
                {/* EMI Breakdown Chart */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">EMI Breakdown</p>
                  <div className="h-8 w-full bg-gray-800 rounded-full overflow-hidden">
                    {/* Interest Amount */}
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center"
                      style={{ 
                        width: `${Math.min(90, (eligibility.interest / (eligibility.interest + 5)) * 100)}%`,
                      }}
                    >
                      <span className="text-xs font-semibold text-white px-2">Interest</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Principal: {formatCurrency(eligibility.amount / (eligibility.term * 12))}/month</span>
                    <span>Interest: {formatCurrency(eligibility.emi - (eligibility.amount / (eligibility.term * 12)))}/month</span>
                  </div>
                </div>
                
                {/* Loan Term Timeline */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">Repayment Timeline</p>
                  <div className="relative h-2 bg-gray-800 rounded-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1.5 h-3 bg-primary rounded-full top-1/2 -translate-y-1/2"
                        style={{ left: `${(i / 4) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Start</span>
                    <span className="text-center">{Math.round(eligibility.term / 2)} years</span>
                    <span>{eligibility.term} years</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={resetForm}>
                Check Another Loan
              </Button>
              {eligibility?.eligible && (
                <Button>
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanPredictor;