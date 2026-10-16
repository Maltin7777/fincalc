"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Frequency = "monthly" | "quarterly" | "annually";

const frequencies: { value: Frequency; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

function NumberField({
  id,
  label,
  description,
  error,
  value,
  isValid,
  min,
  max,
  step,
  onValueChange,
}: {
  id: string;
  label: string;
  description: string;
  error: string;
  value: string;
  isValid: boolean;
  min: number;
  max?: number;
  step: number;
  onValueChange: (value: string) => void;
}) {
  return (
    <Field data-invalid={isValid ? undefined : true}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-invalid={isValid ? undefined : true}
        onChange={(event) => onValueChange(event.target.value)}
      />
      {isValid ? (
        <FieldDescription>{description}</FieldDescription>
      ) : (
        <FieldError>{error}</FieldError>
      )}
    </Field>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

export default function CompoundInterestPage() {
  const [initial, setInitial] = useState("10000");
  const [interestRate, setInterestRate] = useState("7");
  const [years, setYears] = useState("20");
  const [monthlyContribution, setMonthlyContribution] = useState("250");
  const [frequency, setFrequency] = useState<Frequency>("monthly");

  const principal = parseFloat(initial);
  const rate = parseFloat(interestRate);
  const term = parseFloat(years);

  const contributionInput = monthlyContribution.trim();
  const contribution =
    contributionInput === "" ? 0 : parseFloat(contributionInput);

  const principalValid = Number.isFinite(principal) && principal >= 0;
  const rateValid = Number.isFinite(rate) && rate >= 0 && rate <= 100;
  const termValid = Number.isFinite(term) && term > 0 && term <= 100;
  const contributionValid =
    contributionInput === "" ||
    (Number.isFinite(contribution) && contribution >= 0);
  const allValid =
    principalValid && rateValid && termValid && contributionValid;

  const { futureValue, contributed, interestEarned } = useMemo(() => {
    const empty = { futureValue: 0, contributed: 0, interestEarned: 0 };
    if (!allValid) return empty;

    const periodsPerYear =
      frequency === "monthly" ? 12 : frequency === "quarterly" ? 4 : 1;
    const monthsPerPeriod = 12 / periodsPerYear;
    const ratePerPeriod = rate / 100 / periodsPerYear;
    const months = Math.round(term * 12);

    let balance = principal;
    let totalContributed = principal;

    for (let month = 1; month <= months; month += 1) {
      balance += contribution;
      totalContributed += contribution;
      if (month % monthsPerPeriod === 0) {
        balance *= 1 + ratePerPeriod;
      }
    }

    return {
      futureValue: balance,
      contributed: totalContributed,
      interestEarned: balance - totalContributed,
    };
  }, [allValid, frequency, rate, term, principal, contribution]);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-12 pb-20">
      <div className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          <TrendingUp data-icon="inline-start" />
          Compound interest
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Compound Interest Calculator
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Set an initial amount, a rate, and a timeframe to see how your money
          grows as interest compounds — with optional monthly contributions.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment details</CardTitle>
            <CardDescription>
              Change any value — the projection updates instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <NumberField
                id="initial-principal"
                label="Initial amount"
                description="The starting balance you deposit today."
                error="Enter an amount of 0 or more."
                value={initial}
                isValid={principalValid}
                min={0}
                step={500}
                onValueChange={setInitial}
              />
              <NumberField
                id="interest-rate"
                label="Annual interest rate (%)"
                description="The yearly return you expect to earn."
                error="Enter a rate between 0 and 100."
                value={interestRate}
                isValid={rateValid}
                min={0}
                max={100}
                step={0.1}
                onValueChange={setInterestRate}
              />
              <NumberField
                id="years"
                label="Time period (years)"
                description="How long you plan to leave the money invested."
                error="Enter a period between 1 and 100 years."
                value={years}
                isValid={termValid}
                min={1}
                max={100}
                step={1}
                onValueChange={setYears}
              />
              <NumberField
                id="monthly-contribution"
                label="Monthly contribution (optional)"
                description="Leave empty if you are not adding money regularly."
                error="Enter 0 or more, or leave it empty."
                value={monthlyContribution}
                isValid={contributionValid}
                min={0}
                step={50}
                onValueChange={setMonthlyContribution}
              />
              <Field orientation="horizontal">
                <FieldTitle id="compounding-label">Compounding</FieldTitle>
                <ToggleGroup
                  aria-labelledby="compounding-label"
                  value={[frequency]}
                  onValueChange={(value) =>
                    setFrequency((value[0] ?? "monthly") as Frequency)
                  }
                  spacing={2}
                >
                  {frequencies.map((item) => (
                    <ToggleGroupItem key={item.value} value={item.value}>
                      {item.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <TrendingUp className="size-8 text-muted-foreground" />
            <CardTitle>Your projected growth</CardTitle>
            <CardDescription>
              Interest compounds {frequency}.
            </CardDescription>
            <CardAction>
              <Badge variant="outline">Future value</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Balance at the end
              </span>
              <span className="font-heading text-4xl font-semibold tabular-nums">
                {allValid ? money(futureValue) : "—"}
              </span>
            </div>
            <Separator />
            <dl className="flex flex-col gap-3">
              <ResultRow
                label="Total contributions"
                value={allValid ? money(contributed) : "—"}
              />
              <ResultRow
                label="Interest earned"
                value={allValid ? money(interestEarned) : "—"}
              />
            </dl>
            <p className="text-sm text-muted-foreground">
              Contributions are added monthly. Projections are illustrative and
              ignore taxes, fees, and changing rates.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/" />}
            >
              Back to home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}