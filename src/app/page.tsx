"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Users, DollarSign, CheckCircle, ArrowRight, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-teal-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-teal-300" />
              <span className="text-sm font-medium text-teal-100">Official Federal Program</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              IRS Federal
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                Grant Program
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-100/80 sm:text-xl">
              Providing financial assistance to eligible senior citizens and disabled individuals
              across the United States. Check your eligibility today.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="xl" className="bg-teal-500 hover:bg-teal-400 text-white shadow-xl shadow-teal-500/25 rounded-full">
                <Link href="/check">
                  Check Your Eligibility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full bg-transparent">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { icon: Users, label: "Beneficiaries Served", value: "50,000+" },
              { icon: DollarSign, label: "Total Distributed", value: "$2.5B+" },
              { icon: Star, label: "Approval Rate", value: "94%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20">
                  <stat.icon className="h-6 w-6 text-teal-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Simple Process
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Our streamlined process makes it easy for you to check your eligibility and claim your grant.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: CheckCircle,
                title: "Check Eligibility",
                description: "Enter your personal details to verify if you have been selected as a grant recipient.",
              },
              {
                step: "02",
                icon: Heart,
                title: "View Your Grant",
                description: "If eligible, you will see your approved grant amount and program details instantly.",
              },
              {
                step: "03",
                icon: DollarSign,
                title: "Claim Your Grant",
                description: "Fill out the claim form with your details to receive your grant funds securely.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="group relative h-full overflow-hidden border-2 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  <div className="absolute right-4 top-4 text-6xl font-extrabold text-muted/30 select-none">
                    {item.step}
                  </div>
                  <CardContent className="relative p-8 pt-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm group-hover:from-primary/20 transition-all">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600">
              Eligibility
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Who Qualifies?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              The program is designed to help those who need it most.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Senior Citizens", desc: "U.S. citizens aged 62 and older who meet income requirements.", icon: "👴" },
              { title: "Disabled Individuals", desc: "Individuals with qualifying disabilities as defined by the SSA.", icon: "♿" },
              { title: "Low-Income Households", desc: "Households with total annual income below the federal threshold.", icon: "🏠" },
              { title: "Veterans", desc: "Former military service members with honorable discharge status.", icon: "🎖️" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-teal-500/20">
                  <CardContent className="flex items-start gap-5 p-6">
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                      <p className="text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-10 text-center text-white shadow-2xl sm:p-16"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-teal-400 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-400 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Ready to Check Your Eligibility?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-lg text-blue-100/80">
                It takes less than 2 minutes. Enter your details and find out if you qualify for a federal grant.
              </p>
              <Button asChild size="xl" className="bg-teal-500 hover:bg-teal-400 text-white shadow-xl shadow-teal-500/25 rounded-full">
                <Link href="/check">
                  Check Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
