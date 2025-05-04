"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Lock, Eye, Database, Globe, LogIn } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <ParticleBackground />

      <header className="relative z-10 w-full py-6 px-4 md:px-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Shield className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold gradient-text">MySpy</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link href="/login">
            <Button variant="outline" className="border-red-500 hover:bg-red-500/10">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        </motion.div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 md:px-8 py-12">
        {/* Hero Section */}
        <motion.div ref={heroRef} style={{ y, opacity }} className="max-w-7xl mx-auto w-full mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-red">
                Advanced Technology for <span className="gradient-text">Digital Investigation</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                MySpy offers high-level solutions for professionals who need precise and reliable tools for their
                investigative activities in the digital world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg animated-gradient-border cta-button w-full sm:w-auto"
                    >
                      Access Platform
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-500 hover:bg-red-500/10 px-8 py-6 text-lg w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <div className="hero-image parallax-effect float-animation">
                <div className="image-overlay">
                  <Image
                    src="/images/cyber-specialist.jpeg"
                    alt="Cybersecurity specialist using the MySpy platform"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-sm text-red-300 font-medium">ADVANCED TECHNOLOGY</p>
                    <h3 className="text-white text-lg font-bold">MySpy GROUP Photoviewer Location</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto w-full mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Exclusive Features</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our platform offers cutting-edge tools for professionals who need precision and efficiency in their
              investigations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-red-500" />}
              title="High Performance"
              description="Optimized technology for fast and accurate results in your investigations."
              image="/images/digital-security.jpeg"
              alt="High performance interface of the MySpy platform"
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-red-500" />}
              title="Advanced Security"
              description="State-of-the-art security protocols to protect your data."
              image="/images/data-analysis.jpeg"
              alt="Advanced security system of the MySpy platform"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-red-500" />}
              title="Reliability"
              description="Tools developed by experts for professional use."
              image="/images/cyber-protection.jpeg"
              alt="Demonstration of reliability of the MySpy platform"
            />
          </div>
        </motion.div>

        {/* Capabilities Section */}
        <div className="section-divider" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto w-full mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Technical Capabilities</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The MySpy platform uses cutting-edge technologies to provide accurate and reliable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CapabilityCard
              icon={<Eye />}
              title="Advanced Tracking"
              description="Monitor digital activities with precision and detail."
            />
            <CapabilityCard
              icon={<Database />}
              title="Data Analysis"
              description="Processing and analysis of large volumes of information."
            />
            <CapabilityCard
              icon={<Globe />}
              title="Global Reach"
              description="Tracking capability in any geographic location."
            />
            <CapabilityCard
              icon={<Shield />}
              title="Identity Protection"
              description="Keep your investigations protected and anonymous."
            />
            <CapabilityCard
              icon={<Zap />}
              title="Real-Time Results"
              description="View updated information instantly."
            />
            <CapabilityCard
              icon={<Lock />}
              title="Secure Access"
              description="Security protocols to protect your data."
            />
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto w-full mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Premium Plan</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Complete access to all MySpy platform features at an affordable price.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.5)" }}
              className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-red-500/30 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">Premium Access</h3>
                    <p className="text-gray-300">All features unlocked</p>
                  </div>
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-red-400" />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$49.99</span>
                    <span className="text-gray-400 ml-2">lifetime</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">One-time payment - Lifetime access</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {[
                    "Access to all tracking links",
                    "Real-time results",
                    "Priority support",
                    "Free updates",
                    "Unlimited usage",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="mr-2 text-red-500">✓</div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="https://buy.stripe.com/9AQ4gr1UAguA6ZydQT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-lg animated-gradient-border">
                      Buy Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Ready to start?</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Get access to the MySpy platform now and take your digital investigations to a new level of efficiency
                  and precision.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg animated-gradient-border cta-button"
                    >
                      Access Platform
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <div className="relative">
                <div className="hero-image parallax-effect">
                  <Image
                    src="/images/cyber-specialist.jpeg"
                    alt="Cybersecurity specialist using the MySpy platform"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 w-full py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 MySpy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  image,
  alt,
}: {
  icon: React.ReactNode
  title: string
  description: string
  image: string
  alt: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.3)" }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
    >
      <div className="feature-image h-48 relative">
        <Image src={image || "/placeholder.svg"} alt={alt} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

function CapabilityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.3)" }}
      className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
    >
      <div className="bg-red-500/20 p-3 rounded-full w-fit mb-4">
        <div className="text-red-400">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}
