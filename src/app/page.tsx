import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Check,
  Gauge,
  Home,
  LineChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Calculator = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  href: string;
};

const calculators: Calculator[] = [
  {
    id: "mortgage",
    name: "Mortgage Repayment Calculator",
    tagline: "Know your monthly payment before you commit.",
    description:
      "Enter a loan amount, interest rate, and term to see what your mortgage really costs — from the monthly payment to the total interest paid over the life of the loan.",
    features: [
      "Monthly principal & interest breakdown",
      "Total interest and total cost of the loan",
      "Adjustable loan amount, rate, and term",
    ],
    icon: Home,
    href: "/mortgage",
  },
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    tagline: "Watch your money grow, year after year.",
    description:
      "See how savings or investments grow over time as interest compounds, with optional recurring contributions and different compounding frequencies.",
    features: [
      "Future value projections over any timeframe",
      "Optional regular contributions",
      "Monthly, quarterly, and annual compounding",
    ],
    icon: TrendingUp,
    href: "/compound-interest",
  },
];

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Gauge,
    title: "Instant results",
    description:
      "Every input recalculates on the spot, so you can compare scenarios without waiting.",
  },
  {
    icon: LineChart,
    title: "Transparent math",
    description:
      "We show the full breakdown — principal, interest, and totals — never a black-box number.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "No accounts, no tracking. Your numbers stay in your browser.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
        <Badge variant="secondary">Free &middot; no sign-up required</Badge>
        <h1 className="mt-6 max-w-3xl font-heading text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Financial calculators that make the numbers make sense.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          FinCalc gives you two focused tools to plan smarter — estimate your
          monthly mortgage repayments, and see how your money grows with
          compound interest. Built to be fast, clear, and easy to trust.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full"
            nativeButton={false}
            render={<a href="#calculators" />}
          >
            Explore the calculators
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            nativeButton={false}
            render={<a href="#why-fincalc" />}
          >
            Why FinCalc
          </Button>
        </div>
      </section>

      <section
        id="calculators"
        className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 pb-20"
      >
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Two calculators, one goal
          </h2>
          <p className="text-muted-foreground">
            Pick the tool that matches the decision in front of you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {calculators.map((calc) => (
            <Card key={calc.id} className="h-full">
              <CardHeader>
                <calc.icon className="size-8 text-muted-foreground" />
                <CardTitle>{calc.name}</CardTitle>
                <CardDescription>{calc.tagline}</CardDescription>
                <CardAction>
                  <Badge variant="outline">Available</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-5">
                <p className="text-muted-foreground">{calc.description}</p>
                <ul className="flex flex-col gap-2">
                  {calc.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  nativeButton={false}
                  render={<Link href={calc.href} />}
                >
                  Open calculator
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="why-fincalc"
        className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 pb-24"
      >
        <Card className="gap-0 py-0">
          <CardContent className="flex flex-col gap-8 py-10">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Built for clarity, not complexity
              </h2>
              <p className="text-muted-foreground">
                The same principles sit behind both calculators.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col gap-2">
                  <benefit.icon className="size-5 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}