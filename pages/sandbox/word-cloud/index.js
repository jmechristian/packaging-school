import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const titles = useMemo(
    () => [
      'Account Executive',
      'Account Manager',
      'Account Manager',
      'Account Manager',
      'Application Manager',
      'Associate Director',
      'Associate Packaging Engineer',
      'Associate Packaging Engineer',
      'Associate Scientist - Packaging',
      'Beverage Applications Technologist 1',
      'Biologist / Quality / Food Auditor',
      'Blending Technican',
      'Business Development & Operations',
      'Business Development Leader',
      'Business Development Leader',
      'Business Operations Manager',
      'CEO-Founder',
      'Chief HR Officer',
      'Company Trainer',
      'Compliance Leader',
      'Construction Assistant',
      'Corporate Sustainability Manager',
      'CSR/Account Manager',
      'CSR/Account Manager',
      'CSR/Account Manager',
      'Customer Success Representative',
      'Director',
      'Director of Creative',
      'Director of Creative',
      'Director of Engineering',
      'Director of Purchasing',
      'Director of Quality',
      'Director, Packaging Experiences & Digital Technologies',
      'Diseñadora estructural',
      'Division Sales manager',
      'Especialista em Experiência do Cliente',
      'Food Scientist III',
      'Founder',
      'Front Desk Receptionist',
      'Front Desk Receptionist',
      'Front Desk Receptionist',
      'Front Desk Receptionist',
      'FSQA Information Systems Specialist',
      'General Manager',
      'Graphic Designer',
      'Graphics Packaging Project Manager',
      'HR/Executive Assistant',
      'Human Resources Coordinator',
      'Human Resources Coordinator',
      'Industrial Engineer',
      'Industrial Engineer',
      'Ingeniero de Empaques Experience Centre',
      'Innovation Manager',
      'Intern',
      'Junior Packaging Technologist',
      'Logistics Account Executive',
      'Logistics Account Executive',
      'Logistics Account Executive',
      'Logistics Account Executive',
      'Logistics Supervisor / Plant Packaging Principal',
      'Manager - Packaging Development',
      'Manager, Creative Structural Design',
      'Managing Director',
      'Managing Director',
      'Managing Director',
      'Managing Director',
      'Marketing Lead',
      'Marketing Specialist - Corporate Communications',
      'Mechanical Design Engineer',
      'NPD Technician',
      'Organizational Manager',
      'Outside Sales',
      'Outside Sales',
      'Outside Sales Representative',
      'Owner',
      'Packaging Chief',
      'Packaging Consultant',
      'Packaging Consultant',
      'Packaging Consultant',
      'Packaging Consultant',
      'Packaging Coordinator',
      'Packaging Design Manager',
      'Packaging Engineer',
      'Packaging Engineer',
      'Packaging Graphic Designer',
      'Packaging Manager',
      'Packaging Manager',
      'Plant Controller',
      'Plant Production Supervisor',
      'Plant Production Supervisor',
      'Plant Production Supervisor',
      'Plant Production Supervisor',
      'President & CEO',
      'Procurement and supply chain director',
      'Product Development & Design Engineer',
      'Product Development Coordinator',
      'Product Development Engineer',
      'Product Development Engineer',
      'Product Development Manager',
      'Product Development Manager',
      'Product Development Manager',
      'Product Development Manager',
      'Product Development Manager',
      'Product Development Scientist',
      'Product Manager',
      'Product Safety and Compliance Manager',
      'Production Engineer',
      'Project Leader - Digital Deposit Return System',
      'Purchasing',
      'Purchasing & Materials Coordinator',
      'Purchasing Specialist',
      'QA Manager',
      'Quality Assurance Quality Control',
      'Quality Control Laboratory Technician',
      'R&D',
      'R&D for New Products',
      'R&D Manager',
      'R&D Tech',
      'Regional VP of Sales',
      'Regulatory Affairs Specialist',
      'Sales',
      'Sales & Marketing Manager',
      'Sales And Marketing Specialist',
      'Sales Coordinator',
      'Sales Coordinator',
      'Sales Director',
      'Sales Director',
      'Sales Exceutive',
      'Sales Exceutive',
      'Sales Executive',
      'Sales Manager',
      'Sales Manager',
      'Sales Professional',
      'Sales Representative',
      'Sales Representative',
      'Sales Representative',
      'Sales Representative',
      'Sales Representative',
      'Sales Representatives - Label Technologies',
      'Senior Manager - Supplier Authorizations',
      'Senior Packaging Specialist',
      'Senior Product Care Engineer Team Leader',
      'Senior Product Care Engineer Team Leader',
      'Senior Product Design Engineer',
      'Senior Scientist, Packaging R&D',
      'Senior Sourcing Analyst',
      'Senior Sustainable Packaging Manager',
      'Sr. QA Manager',
      'Staff Accountant / Payroll Admin',
      'Strategic Lead',
      'Supply Chain & Procurement Director',
      'Sustainability Manager',
      'Technical Service & Sales Support Specialist',
      'Technical Service & Sales Support Specialist',
      'Technical Service & Sales Support Specialist',
      'Técnico Microcervecería',
      'Territory Account Manager',
      'Territory Business Manager',
      'Territory Manager',
      'Territory Manager',
      'Territory Manager',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Undergraturate Student',
      'Vice President Sales',
      'VP Business Development',
      'VP, Consumer Health & Ease of Use',
    ],
    []
  );

  const rows = useMemo(() => {
    const mulberry32 = (seed) => {
      let t = seed;
      return () => {
        t += 0x6d2b79f5;
        let x = t;
        x = Math.imul(x ^ (x >>> 15), x | 1);
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
      };
    };

    const rng = mulberry32(1337);
    const pick = (arr) => arr[Math.floor(rng() * arr.length)];
    const rand = (min, max) => min + rng() * (max - min);

    // Build a few "marquee" rows; keep them in evenly-spaced vertical lanes
    // so they fill the height and don't overlap even with large scales.
    const rowCount = 9;
    const wordsPerRow = 16;

    const out = [];
    for (let i = 0; i < rowCount; i++) {
      const direction = rng() > 0.5 ? 'ltr' : 'rtl';
      // ~75% slower than before (duration ~1.75x)
      const duration = rand(32, 60); // seconds

      const words = Array.from({ length: wordsPerRow }).map(() => {
        const text = pick(titles);
        // Bring back pronounced depth variation (while keeping layout-safe sizing).
        const scale = rand(0.6, 3.2);
        const opacity = rand(0.22, 0.95);
        return { text, scale, opacity };
      });

      out.push({ direction, duration, words });
    }
    return out;
  }, [titles]);

  return (
    <div className='w-full max-w-7xl mx-auto py-20'>
      <div className='aspect-[16/9] w-full bg-clemson relative overflow-hidden rounded-2xl'>
        {/* subtle depth vignette */}
        <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20' />

        <div className='absolute inset-0 grid grid-rows-9 gap-0'>
          {rows.map((row, rowIdx) => {
            const isLtr = row.direction === 'ltr';
            // Seamless marquee: duplicate the track and translate by 50% of its own width.
            const startX = isLtr ? '0%' : '-50%';
            const endX = isLtr ? '-50%' : '0%';

            return (
              <div key={`lane-${rowIdx}`} className='relative overflow-hidden'>
                <motion.div
                  className='absolute inset-y-0 left-0 flex items-center will-change-transform'
                  initial={{ x: startX }}
                  animate={{ x: endX }}
                  transition={{
                    duration: row.duration,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {/* Track: render the sequence twice for a seamless loop */}
                  <div className='flex items-center gap-10 whitespace-nowrap px-6'>
                    {[...row.words, ...row.words].map((w, i) => (
                      <span
                        key={`${rowIdx}-${i}-${w.text}`}
                        className='inline-block font-semibold tracking-tight text-white/95 select-none whitespace-nowrap text-3xl'
                        style={{
                          opacity: w.opacity,
                          // Layout-safe depth: use font-size so spacing is real.
                          // Em is relative to this span's base size.
                          fontSize: `${w.scale}em`,
                          lineHeight: 1,
                        }}
                      >
                        {w.text}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
