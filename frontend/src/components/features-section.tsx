"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const features = [
    {
      icon: "🔍",
      title: "Search Across 20+ Indices",
      description: "Instantly search CPUs, GPUs, RAM, motherboards, and more. Our multi-index Algolia search brings all PC components to your fingertips in milliseconds."
    },
    {
      icon: "🧠",
      title: "AI Compatibility Checking",
      description: "No more manual research. Our AI automatically validates CPU sockets, RAM types, PSU wattage, case clearances, and form factors in real-time."
    },
    {
      icon: "💡",
      title: "Smart Recommendations",
      description: "Based on your selections, we suggest the best compatible components ranked by popularity, price, and performance—powered by knowledge base patterns."
    },
    {
      icon: "🔧",
      title: "One-Click Fixes",
      description: "Found a compatibility issue? Click 'Fix Build' and we'll automatically swap incompatible parts with perfect alternatives."
    },
    {
      icon: "📊",
      title: "Real-Time Wattage Tracking",
      description: "See total system power consumption live. We calculate TDP and recommend PSUs with the right wattage and headroom for your build."
    },
    {
      icon: "🎨",
      title: "3D Visualization",
      description: "Watch your build come to life! See components appear in a 3D PC case as you add them—making the building process more engaging and intuitive."
    },
  ];

  return (
    <section id="features-section" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            ✨ Powered by Algolia & AI
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Why Build With Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've eliminated the complexity of PC building. No spreadsheets, no forum posts, no guesswork—just intelligent automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* How it works timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">How It Works</h3>
          
          <div className="space-y-8">
            {[
              { step: "1", title: "Search & Select", desc: "Use Cmd+K to search 20+ component indices. Pick your CPU, GPU, or any part." },
              { step: "2", title: "AI Validates", desc: "Our hooks instantly check compatibility—sockets, TDP, form factors, everything." },
              { step: "3", title: "Get Recommendations", desc: "See smart suggestions for compatible parts based on your current build." },
              { step: "4", title: "Auto-Fix Issues", desc: "If there's a conflict, we'll suggest the fix. One click and you're good." },
              { step: "5", title: "Visualize in 3D", desc: "Watch your components snap into a 3D PC case. Make it real before you buy." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
