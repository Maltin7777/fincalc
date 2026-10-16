"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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

export default function MortgagePage() {
  const [loanAmount, setLoanAmount] = useState("350000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");

  const principal = parseFloat(loanAmount);
  const rate = parseFloat(interestRate);
  const term = parseFloat(termYears);

  const principalValid = Number.isFinite(principal) && principal > 0;
  const rateValid = Number.isFinite(rate) && rate >= 0 && rate <= 100;
  const termValid = Number.isFinite(term) && term > 0 && term <= 50;

  const { monthly, totalPaid, totalInterest, payments } = useMemo(() => {
    const empty = {
      monthly: 0,
      totalPaid: 0,
      totalInterest: 0,
      payments: 0,
    };
    if (!principalValid || !rateValid || !termValid) return empty;

    const count = Math.round(term * 12);
    const monthlyRate = rate / 100 / 12;
    const payment =
      monthlyRate === 0
        ? principal / count
        : (principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, count)) /
          (Math.pow(1 + monthlyRate, count) - 1);
    const paid = payment * count;
    return {
      monthly: payment,
      totalPaid: paid,
      totalInterest: paid - principal,
      payments: count,
    };
  }, [principal, rate, term, principalValid, rateValid, termValid]);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-12 pb-20">
      <div className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          <Home data-icon="inline-start" />
          Mortgage
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Mortgage Repayment Calculator
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Adjust the loan amount, rate, and term to see your monthly repayment
          and what the loan really costs over its full life.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan details</CardTitle>
            <CardDescription>
              Change any value — the result updates instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <NumberField
                id="loan-amount"
                label="Loan amount"
                description="The total amount you are borrowing."
                error="Enter a loan amount greater than 0."
                value={loanAmount}
                isValid={principalValid}
                min={1}
                step={1000}
                onValueChange={setLoanAmount}
              />
              <NumberField
                id="interest-rate"
                label="Annual interest rate (%)"
                description="The yearly interest rate of the loan."
                error="Enter a rate between 0 and 100."
                value={interestRate}
                isValid={rateValid}
                min={0}
                max={100}
                step={0.1}
                onValueChange={setInterestRate}
              />
              <NumberField
                id="loan-term"
                label="Loan term (years)"
                description="How many years you have to repay the loan."
                error="Enter a term between 1 and 50 years."
                value={termYears}
                isValid={termValid}
                min={1}
                max={50}
                step={1}
                onValueChange={setTermYears}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <Home className="size-8 text-muted-foreground" />
            <CardTitle>Your estimated repayment</CardTitle>
            <CardDescription>Principal &amp; interest only.</CardDescription>
            <CardAction>
              <Badge variant="outline">Per month</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Monthly repayment
              </span>
              <span className="font-heading text-4xl font-semibold tabular-nums">
                {principalValid && rateValid && termValid
                  ? money(monthly)
                  : "—"}
              </span>
            </div>
            <Separator />
            <dl className="flex flex-col gap-3">
              <ResultRow
                label="Total interest"
                value={
                  principalValid && rateValid && termValid
                    ? money(totalInterest)
                    : "—"
                }
              />
              <ResultRow
                label="Total amount repaid"
                value={
                  principalValid && rateValid && termValid
                    ? money(totalPaid)
                    : "—"
                }
              />
              <ResultRow
                label="Number of payments"
                value={payments > 0 ? payments.toString() : "—"}
              />
            </dl>
            <p className="text-sm text-muted-foreground">
              Estimate excludes taxes, insurance, and fees.
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