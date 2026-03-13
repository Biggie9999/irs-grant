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
      <section className="bg-white text-[#1b1b1b] border-b border-[#dfe1e2] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-center">
            
            {/* Left Column: Main Headline and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#1b1b1b] leading-[1.1]">
                Do more with a Federal Grant
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-[#1b1b1b]">
                Access financial assistance securely with an Individual or Business application.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 font-bold text-[#1b1b1b]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b1b] text-white text-xs">✓</span>
                  Easy application
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b1b] text-white text-xs">✓</span>
                  Secure records
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b1b] text-white text-xs">✓</span>
                  Fast processing
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b1b1b] text-white text-xs">✓</span>
                  Notifications
                </div>
              </div>

              <Button asChild size="lg" className="bg-[#005086] hover:bg-[#003d6b] text-white px-8 py-6 text-base rounded-sm shadow-md font-bold">
                <Link href="/check">
                  Apply for a Grant
                </Link>
              </Button>
            </motion.div>

            {/* Right Column: Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-[#dfe1e2] rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-[#1b1b1b] mb-2">Where's my grant?</h2>
                <p className="text-[#1b1b1b] mb-6">Check your eligibility status instantly.</p>
                
                <h3 className="font-bold text-[#1b1b1b] mb-1">Grant tracker</h3>
                <p className="text-sm text-[#5c5c5c] mb-4">
                  Enter your SSN and Date of Birth to find out if you qualify. No sign in required.
                </p>
                <Button asChild variant="outline" className="w-full border-2 border-[#005086] text-[#005086] hover:bg-[#005086] hover:text-white font-bold rounded-sm mb-6">
                  <Link href="/check">
                    Use grant tracker
                  </Link>
                </Button>

                <Link href="#faq" className="text-sm text-[#005086] underline hover:no-underline">
                  Grant tracker help
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative background illustration (similar to the plant/lady in the screenshot) */}
        <div className="absolute bottom-0 left-[45%] opacity-20 pointer-events-none hidden lg:block w-[500px] h-[500px]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#005086" d="M39.9,-65.4C54.4,-61.2,70.8,-55.8,77.3,-44.3C83.9,-32.8,80.7,-15.1,76,-0.3C71.3,14.6,65.1,26.5,58.8,40.1C52.5,53.8,45.9,69.1,33.7,77.5C21.5,85.8,3.6,87.1,-12,83C-27.6,78.8,-41,69.1,-52.1,57C-63.3,44.9,-72.1,30.3,-75.4,14.4C-78.7,-1.5,-76.3,-18.7,-68.8,-32.8C-61.2,-46.8,-48.5,-57.8,-34.5,-62.4C-20.5,-67.1,-5.2,-65.5,8.8,-69.1C22.7,-72.7,35.3,-71.4,39.9,-65.4Z" transform="translate(100 100)" />
          </svg>
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
                <stat.icon className="h-5 w-5 text-[#005086] shrink-0" />
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
                <item.icon className="mb-3 h-6 w-6 text-[#005086]" />
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#005086]/10">
                    <item.icon className="h-5 w-5 text-[#005086]" />
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
                  <strong className="text-[#005086]">A:</strong> {faq.a}
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
