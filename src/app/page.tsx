"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Users, DollarSign, CheckCircle, ArrowRight, Award, FileCheck, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#1a1a5e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 sm:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Federal Grant Program
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
                Providing financial assistance to eligible senior citizens and disabled individuals
                across the United States. Check your eligibility today.
              </p>
              <Button asChild size="lg" className="bg-[#005ea2] hover:bg-[#1a4480] text-white border-0">
                <Link href="/check">
                  Check Your Eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden sm:block h-[400px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1573165231977-3f0e27806045?q=80&w=2000&auto=format&fit=crop" 
                alt="Elderly couple reviewing documents" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b bg-[#f0f0f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { icon: Users, label: "Beneficiaries Served", value: "50,000+" },
              { icon: DollarSign, label: "Total Distributed", value: "$2.5B+" },
              { icon: Award, label: "Approval Rate", value: "94%" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-5">
                <stat.icon className="h-5 w-5 text-[#1a1a5e] shrink-0" />
                <div>
                  <div className="text-xl font-bold text-[#1b1b1b]">{stat.value}</div>
                  <div className="text-xs text-[#5c5c5c]">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-2 text-2xl font-bold text-[#1b1b1b] sm:text-3xl">
              How It Works
            </h2>
            <p className="text-base text-[#5c5c5c]">
              Our streamlined process makes it easy for you to check your eligibility and claim your grant.
            </p>
          </motion.div>

          <div className="grid gap-px bg-[#dfe1e2] sm:grid-cols-3 border border-[#dfe1e2]">
            {[
              {
                step: "Step 1",
                icon: CheckCircle,
                title: "Check Eligibility",
                description: "Enter your personal details to verify if you have been selected as a grant recipient.",
              },
              {
                step: "Step 2",
                icon: FileCheck,
                title: "View Your Grant",
                description: "If eligible, you will see your approved grant amount and program details.",
              },
              {
                step: "Step 3",
                icon: DollarSign,
                title: "Claim Your Grant",
                description: "Complete the claim form with your details to receive your grant funds securely.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white p-8">
                <div className="mb-4 text-xs font-bold uppercase tracking-widest text-[#005ea2]">
                  {item.step}
                </div>
                <item.icon className="mb-3 h-6 w-6 text-[#1a1a5e]" />
                <h3 className="mb-2 text-lg font-bold text-[#1b1b1b]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#5c5c5c]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="bg-[#f7f7f7] py-16 sm:py-20 border-t border-[#dfe1e2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-2 text-2xl font-bold text-[#1b1b1b] sm:text-3xl">
            Who Qualifies?
          </h2>
          <p className="mb-10 text-base text-[#5c5c5c]">
            The program is designed to help those who need it most.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Senior Citizens", desc: "U.S. citizens aged 62 and older who meet income requirements.", icon: Users },
              { title: "Disabled Individuals", desc: "Individuals with qualifying disabilities as defined by the SSA.", icon: UserCheck },
              { title: "Low-Income Households", desc: "Households with total annual income below the federal threshold.", icon: Shield },
              { title: "Veterans", desc: "Former military service members with honorable discharge status.", icon: Award },
            ].map((item) => (
              <Card key={item.title} className="border border-[#dfe1e2] shadow-none rounded-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#1a1a5e]/10">
                    <item.icon className="h-5 w-5 text-[#1a1a5e]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-[#1b1b1b]">{item.title}</h3>
                    <p className="text-sm text-[#5c5c5c]">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 sm:py-20 border-t border-[#dfe1e2]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-[#1b1b1b] sm:text-3xl text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the Federal Grant Program?",
                a: "It is a government initiative designed to provide direct financial assistance to qualifying senior citizens and disabled individuals to help with living expenses, medical bills, and other essential needs.",
              },
              {
                q: "How do I know if I qualify?",
                a: "You can check your eligibility instantly using our secure online form. You will need to provide your full name, date of birth, and Social Security Number for verification.",
              },
              {
                q: "Is this a loan? Do I have to pay it back?",
                a: "No. This is a federal grant, not a loan. Grants do not need to be repaid as long as all eligibility requirements were accurately met.",
              },
              {
                q: "How will I receive the funds?",
                a: "If approved, you can choose to receive your grant either via a mailed Cashier's Check or a direct Electronic Deposit to your bank account.",
              },
              {
                q: "Is my personal information secure?",
                a: "Yes. Our systems use enterprise-grade encryption and secure protocols to ensure that all submitted information is protected in accordance with federal privacy standards.",
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border border-[#dfe1e2] bg-[#f7f7f7] p-5">
                <h3 className="mb-2 text-lg font-bold text-[#1b1b1b] flex gap-2">
                  <span className="text-[#005ea2]">Q:</span> {faq.q}
                </h3>
                <p className="text-[#5c5c5c] leading-relaxed">
                  <strong className="text-[#1a1a5e]">A:</strong> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-[#dfe1e2]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-bold text-[#1b1b1b] sm:text-3xl">
            Ready to Check Your Eligibility?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base text-[#5c5c5c]">
            It takes less than 2 minutes. Enter your details and find out if you qualify for a federal grant.
          </p>
          <Button asChild size="lg" className="bg-[#005ea2] hover:bg-[#1a4480] text-white">
            <Link href="/check">
              Check Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
