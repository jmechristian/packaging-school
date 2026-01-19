import React from 'react';
import Meta from '../../../components/shared/Meta';
import { buildCertificationJsonLd } from '../../../libs/seo/certificationJsonLd';

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const cspCert = {
    title: 'Certificate of Sustainable Packaging (CSP)',
    description:
      '40-hour workshop to redesign packaging for sustainability through terminology, UN targets, system design, carbon footprinting, offsets, and LCA tools.',
    seoImage: 'https://packschool.s3.amazonaws.com/csp-seoImage-1-sm.png',
    link: `${siteUrl}/certifications/csp/syllabus`,
  };
  const cspJsonLd = buildCertificationJsonLd(cspCert, siteUrl);
  return (
    <>
      <Meta
        title={'Certificate of Sustainable Packaging (CSP) Syllabus'}
        description={
          '40-hour workshop to redesign a package for sustainability, covering terminology, UN targets, system design, carbon footprinting, offsets, and LCA tools.'
        }
        image={'https://packschool.s3.amazonaws.com/csp-seoImage-1-sm.png'}
        structuredData={[cspJsonLd?.breadcrumb, cspJsonLd?.credential].filter(
          Boolean
        )}
      />
      <div className='w-full max-w-5xl mx-auto md:border-2 border-neutral-900 md:my-12 rounded-xl pb-6'>
      <div className='flex flex-col'>
        <div className='md:px-10 px-6 md:pb-8 pb-4 pt-10 md:pt-16'>
          <div className='flex flex-col-reverse gap-3 md:flex-row justify-between'>
            <div className='w-full font-bold text-4xl md:text-5xl tracking-tighter'>
              Certificate of Sustainable Packaging
            </div>
            <div className='text-sm h-full border w-fit rounded-2xl border-neutral-400 px-2 py-0.5 text-neutral-500'>
              Syllabus
            </div>
          </div>
        </div>
        <div className='bg-brand-green py-6 px-6 my-5 flex flex-col md:flex-row mg: gap-6'>
          <div className='font-bold '>Instructors</div>
          <div>
            <span className='font-bold'>Dr. Julie Suggs</span>
            <br />{' '}
            <span className='text-neutral-900'>julie@packagingschool.com</span>
          </div>
          <div>
            <span className='font-bold'>Dr. Andrew Hurley</span>
            <br />{' '}
            <span className='text-neutral-900'>me@drandrewhurley.com</span>
          </div>
        </div>
        <div className='md:p-10 p-6 flex flex-col gap-6 md:gap-10'>
          <div className='w-full rounded-xl md:bg-neutral-200 md:border md:border-neutral-900 md:p-9'>
            <p>
              <strong>Program Description:</strong>&nbsp;
            </p>
            <p>
              Students in this <strong>40-hour </strong>workshop delivered over
              10 weeks will redesign a package for sustainability through
              applying a four-phase process:
            </p>
            <ul className='flex flex-col gap-5 list-disc'>
              <li className='ml-6'>
                Define the key terminology a learner needs to speak the language
                of sustainability with colleagues and customers
              </li>
              <li className='ml-6'>
                Construct UN-based sustainability targets and goals
              </li>
              <li className='ml-6'>
                Develop sustainable system designs (on the material level)
              </li>
              <li className='ml-6'>
                Measure the carbon footprint of their packaging
              </li>
              <li className='ml-6'>
                Select relevant offset programs to achieve carbon neutrality at
                a per product/package
              </li>
              <li className='ml-6'>
                Assess your environmental performance criteria through a license
                to cutting-edge sustainability tools (ISO 14040 compliant life
                cycle analysis software) into your concept development and
                material selection steps of packaging design
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-1'>
            <p>
              <strong>Office Hours:</strong>{' '}
            </p>
            <p>
              Optional office hours available for all students to be scheduled
              with an instructor via Zoom. Email Dr. Suggs to set up an
              appointment.
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p>
              <strong>Contact:&nbsp;</strong>
            </p>
            <p>
              <a
                href='mailto:info@packagingschool.com'
                rel='noopener noreferrer'
                target='_blank'
              >
                info@packagingschool.com
              </a>{' '}
              for general inquiries and learning management system issues,{' '}
              <a
                href='mailto:julie@packagingschool.com'
                rel='noopener noreferrer'
                target='_blank'
              >
                julie@packagingschool.com
              </a>{' '}
              for content related questions.&nbsp;
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Program Modality:&nbsp;</strong>
            </p>
            <p>
              Asynchronous learning will be deployed, meaning that the
              instructor and the students in the course all engage with the
              course content at different times (and from different locations).
              As each assignment is completed, the instructors will guide the
              students, provide them with feedback, and make assessments as
              needed on assignments and activities.&nbsp;
            </p>
          </div>

          <p>
            <strong>Contact Hours: </strong>40 hours&nbsp;
          </p>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Method of Instruction:</strong>&nbsp;
            </p>
            <p>
              Instruction will consist of online pre-recorded lectures,
              presentations, downloadable PDFs,
            </p>
            <p>
              practical exercises/assignments, knowledge checks, discussion, and
              surveys. While everything is online, housed within a learning
              management system, online office hours will be provided upon
              request.&nbsp;
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Required Materials:</strong>&nbsp;
            </p>
            <ul className='flex flex-col gap-3 list-disc'>
              <li className='ml-6'>Package to be improved</li>
              <li className='ml-6'>
                General office materials such as tape, scissors, paper,
                cardstock, printer, computer
              </li>
              <li className='ml-6'>Internet access</li>
            </ul>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Recommend Materials:</strong>&nbsp;
            </p>

            <ul>
              <li>
                Review of{' '}
                <a
                  href='https://sdgs.un.org/goals'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  https://sdgs.un.org/goals
                </a>
              </li>
              <li>Access to printing and prototyping equipment</li>
            </ul>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Program Requirements:&nbsp;</strong>
            </p>
            <p>All students are expected to:</p>
            <ol className='flex flex-col gap-3 list-decimal'>
              <li className='ml-6'>
                Maintain regular attendance (e.g., login to courses and complete
                them within the 12- month assess time)&nbsp;
              </li>
              <li className='ml-6'>Complete assigned work&nbsp;&nbsp;</li>
              <li className='ml-6'>
                Take part in class discussions as applicable
              </li>
              <li className='ml-6'>
                Take all tests and exams given (see grading policy below)&nbsp;
              </li>
            </ol>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xl'>
              <strong>Topics within the Program:</strong>
            </p>
            <ol className='flex flex-col gap-3'>
              <li>
                <strong>Program Introduction</strong>
              </li>
              <li class='ql-indent-1'>
                Disclaimer (PDF): Summarize the educational aspects of this
                program
              </li>
              <li class='ql-indent-1'>
                Welcome! (Video): Discuss the learning objectives and
                overarching goals of this program
              </li>
              <li>
                <strong>Sustainability Module 1&nbsp;</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Navigation Tutorial </strong>(Video): Identify how to
                use the learning management system (LMS)
              </li>
              <li class='ql-indent-1'>
                <strong>Sustainable Packaging Workbook</strong> (PDF):
                Downloadable note-taking document to use while completing this
                course
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Sustainability </strong>(Video): Brief
                explanation of sustainability and an overview of the following
                course
              </li>
              <li class='ql-indent-1'>
                <strong>Defining Sustainable Packaging</strong> (Video):
                Explanation of how to define and measure sustainability
              </li>
              <li class='ql-indent-1'>
                <strong>Sustainability Definition Starter Kit </strong>
                (PDF):&nbsp; Classify key&nbsp; terminology in the
                sustainability space&nbsp;&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Packaging and the Waste Stream</strong> (Infographic):
                The entire life cycle of the garbage we produce - from disposal
                or recycling to the next stages - landfilling, energy production
                or repurposing
              </li>
              <li class='ql-indent-1'>
                <strong>Perceptions and Realities of Sustainability </strong>
                (Video): Differentiating via packaging waste, recycling, and
                packaging realities
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Sustainability Orientation - Let&apos;s Get to Know Each
                  Other!
                </strong>{' '}
                (Discussion): Students introduce themselves and what they are
                hoping to get from the course
              </li>
              <li>
                <strong>Sustainability Module 2</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Frameworks</strong> (Video): Overview of
                the terms linear model, circular module, and cradle to grave
              </li>
              <li class='ql-indent-1'>
                <strong>Cradles and Graves</strong> (Presentation): The cradle
                to grave model defines the beginning and the end of the
                packaging system
              </li>
              <li class='ql-indent-1'>
                <strong>Green Engineering </strong>(Video): In depth discussion
                of the 12 principles of green engineering
              </li>
              <li class='ql-indent-1'>
                <strong>The Circular Economy </strong>(Video): Elements, design,
                and flow of the circular economy
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check: Frameworks</strong> (Quiz, 5
                questions): Helps retain learnings from Frameworks
              </li>
              <li>
                <strong>Sustainability Module 3</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Materials </strong>(Video): Overview of
                the materials lesson
              </li>
              <li class='ql-indent-1'>
                <strong>Paperboard</strong> (Video): Explanation of the
                sustainable forestry cycle
              </li>
              <li class='ql-indent-1'>
                <strong>Glass</strong> (Video): Aspects of glass recycling
                including cullet, benefits, challenges, and lightweighting
              </li>
              <li class='ql-indent-1'>
                <strong>Metal</strong> (Video): Factors include cradle to
                cradle, shrinking carbon footprints, increased shelf life,
                easily recycled, sustainable steel, and sustainable aluminum
              </li>
              <li class='ql-indent-1'>
                <strong>Plastics</strong> (Presentation): The impact of plastics
                on the environment can be minimized with proper management
              </li>
              <li class='ql-indent-1'>
                <strong>Printing and Inks</strong> (Presentation): There are
                many ways to make sustainable design decisions including using
                less ink and choosing ink without harmful chemicals
              </li>
              <li class='ql-indent-1'>
                <strong>Alternative Materials</strong> (Video): Sustainable
                materials include bioplastics; cellophane; bamboo, mushroom, and
                sugarcane packaging; and palm and reed fiber
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Packaging School&apos;s Guide to Edible Packaging{' '}
                </strong>
                (Presentation): Overview of the current state of the industry of
                edible packaging
              </li>
              <li class='ql-indent-1'>
                <strong>Material Trade-offs with Dr. Hurley </strong>(Video):
                discuss the collaboration between various stakeholders when
                working toward sustainable packaging solutions and assess the
                trade-offs that exist in the sustainable packaging sector
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Knowledge Check: Materials (Quiz, 3 questions): Helps retain
                  learnings from materials
                </strong>
              </li>
              <li>
                <strong>Sustainability Module 4</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Analysis &amp; Reporting</strong>{' '}
                (Video): Overview of the following lesson
              </li>
              <li class='ql-indent-1'>
                <strong>Environmental Footprint</strong> (Video): Policies and
                standards push companies to reduce environmental impact and
                create a sustainable footprint
              </li>
              <li class='ql-indent-1'>
                <strong>Analysis Software</strong> (Text): Analysis software
                tools step in to help companies see how their system affects the
                environment
              </li>
              <li class='ql-indent-1'>
                <strong>Life Cycle Analysis</strong> (Presentation): Measurement
                of the sustainability of a product or system through
                quantitative and objective methodologies regulated by the ISO
                14040
              </li>
              <li class='ql-indent-1'>
                <strong>ISO 14000 Explained</strong> (Presentation):&nbsp;
                Discusses this standard that supports innovation and provides
                solutions to global challenges.&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Corporate Goals and Reporting</strong> (Text): A look at
                three real companies that are trying to reduce their
                environmental impact
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check: Analysis &amp; Reporting </strong>
                (Quiz, 5 questions): Helps retain learnings from analysis and
                reporting
              </li>
              <li>
                <strong>Sustainability Module 5&nbsp;</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Design Guidelines</strong> (Video):
                Overview of the following lesson
              </li>
              <li class='ql-indent-1'>
                <strong>FTC Green Guides</strong> (Presentation): FTC labeling
                guides have set specified rules and regulations for companies to
                meet in order to market their product as green
              </li>
              <li class='ql-indent-1'>
                <strong>FTC Green Guides with Dr. Hurley </strong>(Video):
                Describe the mission of FTC and the goal of the green guides,
                summarize the green guide review process, and utilize the green
                guide online&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Labeling Principles</strong> (Presentation):
                Certifications such as ISO 14020 are necessary so companies do
                not mislead the consumer
              </li>
              <li class='ql-indent-1'>
                <strong>APR Design Guide for Plastics Recyclability </strong>
                (Presentation): Includes resin codes, APR recyclability
                categories, and test method categories
              </li>
              <li class='ql-indent-1'>
                <strong>Sustainable Design Checklist</strong> (Assignment): A
                cooperative tool to help determine the environmental profile of
                your package
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check: Design Guidelines</strong> (Quiz, 4
                questions): Helps retain learnings from design guidelines
              </li>
              <li>
                <strong>Sustainability Module 6</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Introduction to Case Studies </strong>(Video): Overview
                of specific company case studies we will look at
              </li>
              <li class='ql-indent-1'>
                <strong>Value Engineering</strong> (Video)): Timeline of
                Nike&apos;s shoe box design changes
              </li>
              <li class='ql-indent-1'>
                <strong>Biomimicry </strong>(Video): Vitalis water bottles mimic
                nature so as to be both visually appealing and consume less
                energy in production
              </li>
              <li class='ql-indent-1'>
                <strong>eCommerce</strong> (Video)): Amazon is committed to
                frustration free packaging that uses less packaging material and
                The Honest Company has developed a lightweight, reusable
                solution to their household cleaning product packaging
              </li>
              <li class='ql-indent-1'>
                <strong>Designing for Reuse</strong> (Video): Heineken has
                developed a reusable bottle and there is a doll package that
                repurposes the packaging into a toy boat
              </li>
              <li class='ql-indent-1'>
                <strong>A Sustainable Labeling Approach</strong> (Video): Onsite
                interview with UPM Raflatac to discuss their sustainable
                approach
              </li>
              <li>
                <strong>Sustainability Module 7</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDGs Introduction: </strong>(Video): Overview of the
                module ahead
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 1 - No Poverty</strong> (Video): Discuss UN SDG
                with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 2 - Zero Hunger</strong> (Video): Discuss UN SDG
                with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 3 - Good Health and Well-Being </strong>(Video):
                Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 4 - Quality Education</strong> (Video): Discuss
                UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 5 - Gender Equality </strong>(Video): Discuss UN
                SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 6 - Clean Water and Sanitation </strong>(Video):
                Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 7 - Affordable and Clean Energy</strong> (Video):
                Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 8 - Decent Work and Economic Growth</strong>{' '}
                (Video): Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>
                  UN SDG 9 - Industry, Innovation and Infrastructure
                </strong>{' '}
                (Video): Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 10 - Reduced Inequalities </strong>(Video):
                Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 11 - Sustainable Cities and Communities </strong>
                (Video): Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>
                  UN SDG 12 - Responsible Consumption and Production
                </strong>{' '}
                (Video): Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 13 - Climate Action</strong> (Video): Discuss UN
                SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 14 - Life Below Water </strong>(Video): Discuss
                UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 15 - Life on Land</strong> (Video): Discuss UN
                SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>
                  UN SDG 16 - Peace, Justice, and Strong Institutions
                </strong>{' '}
                (Video): Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDG 17 - Partnerships for the Goals</strong> (Video):
                Discuss UN SDG with examples and applications&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>UN SDGs Conclusion</strong> (Video): Summarize the 17
                goals and how they can apply to your organization at large&nbsp;
              </li>
              <li>
                <strong>Sustainability Module 8</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>How to Upcycle and Reuse Your Packaging</strong>&nbsp;
                (Video): Discuss fun ways you can reuse your packaging&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Brand Sustainability Guidelines Webinar</strong>{' '}
                (Video): Discuss the following companies&nbsp; sustainability
                goals:&nbsp; Silgan Containers, Berry Plastics, Owens-Illinois,
                Clorox, Target, Costco, Coca-Cola, P&amp;G, Nestle, Kraft Heinz,
                and Mondelez
              </li>
              <li class='ql-indent-1'>
                <strong>EPR for Packaging Webinar</strong> (Video): Objectively
                present elements of EPR for educational purposes only—what we
                discuss should not be interpreted as legal advice&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>German Recycling Machines </strong>(Video): Highlight a
                recycling machine in Germany&nbsp;
              </li>
              <li>
                <strong>Sustainability Module 9</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Apply What You Learned</strong> (Forum): Apply what you
                have learned by grabbing something within your immediate
                surroundings and answer the following questions using four of
                the concepts that you have learned within the sustainability
                course
              </li>
              <li class='ql-indent-1'>
                <strong>Experiential Learning: Redesign Explanation</strong>{' '}
                (Assignment): Based on your learnings from the course and
                experience within your role at your company, choose a packaging
                system (e.g., dunnage, tape, corrugated box, etc.) that you want
                to improve and write a 200 word explanation on why this package
                needs to be redesigned.&nbsp;
              </li>
              <li>
                <strong>Goal Setting Module 1</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Innovation and Product Lifecycle</strong> (Video):
                Examine the innovation life cycle&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Let&apos;s Collaborate</strong> (Discussion): Discuss
                and respond to your peers about an example of authentic
                innovation in the packaging space
              </li>
              <li>
                <strong>Goal Setting Module 2&nbsp;</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Four Types of Packaging Innovation</strong> (Video):
                Compare and contrast the four types of packaging innovation
                using examples in the industry
              </li>
              <li class='ql-indent-1'>
                <strong>Packaging Examples</strong> (Assignment): Choose
                packaging examples to fit each type of innovation method
              </li>
              <li>
                <strong>Goal Setting Module 3&nbsp;</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>The Seven-Step Innovation Process </strong>(Video):
                Analyze our seven-step process that you can use as a foundation
                for your own innovation process within your organization
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check</strong> (Quiz, 5 questions): Helps
                retain learnings from this innovation process
              </li>
              <li>
                <strong>Goal Setting Module 4&nbsp;</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Authentic Sustainable innovation and Greenwashing{' '}
                </strong>
                (Video): Differentiate between authentic sustainable innovation
                and greenwashing
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check</strong> (Quiz, 5 questions): Helps
                retain learnings from these topics
              </li>
              <li>
                <strong>Goal Setting Module 5</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Your Internal Strategy</strong> (Video): Examine
                examples of how to bring our seven-step process to life
              </li>
              <li class='ql-indent-1'>
                <strong>SCAMPER Process</strong> (Video): Discuss this
                brainstorming using packaging examples&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Idea Box </strong>(Video): Discuss this brainstorming
                using packaging examples&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Force Think</strong> (Video): Discuss this brainstorming
                using packaging examples&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Brain Writing</strong> (Video): Discuss this
                brainstorming using packaging examples&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>SCAMPER Exercise</strong> (Assignment): Use the SCAMPER
                brainstorming method to generate ideas for your improved
                packaged product&nbsp;
              </li>
              <li>
                <strong>Goal Setting Module 5</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Umbrella Stand Example </strong>(Video): Examine one
                last example of an overpackaged umbrella stand
              </li>
              <li class='ql-indent-1'>
                <strong>Sustainable Innovation Template</strong> (Assignment):
                Use the sustainable innovation worksheet template to expand on
                your package redesign idea&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>&nbsp;Protype Your Work</strong> (Assignment): Create
                your new and improved design using resources available to you
                (if these are not available to you, a sketch or series of images
                works).
              </li>
              <li>
                <strong>Carbon Workshop Module 1</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Definition and Crediting </strong>(Video): Discuss the
                basics of carbon neutrality: carbon credits, carbon offsets,
                carbon trading, and examples in the industry
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check</strong> (Quiz, 5 questions): Helps
                retain learnings from these topics
              </li>
              <li>
                <strong>Carbon Workshop Module 2</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Measurement and Application</strong> (Video): Identify
                tools to measure and assess your carbon footprint
              </li>
              <li class='ql-indent-1'>
                <strong>Knowledge Check</strong> (Quiz, 4 questions): Helps
                retain learnings from these topics
              </li>
              <li>
                <strong>Carbon Workshop Module 3</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Packaging Carbon Dioxide Equivalents and Offset Strategies
                </strong>{' '}
                (Video): Examine carbon dioxide equivalents in packaging,
                industry calculators, and offset strategies
              </li>
              <li class='ql-indent-1'>
                <strong>Let&apos;s Collaborate</strong> (Discussion): Discuss
                and respond to your peers about the idea of offsetting carbon in
                your organization
              </li>
              <li>
                <strong>Carbon Workshop Module 4</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Purchasing Carbon Credits</strong> (Presentation):
                Summarize the basics of carbon credits: carbon credits vs.
                carbon offsets, purchasing as an individual or business, and
                carbon investment opportunities
              </li>
              <li>
                <strong>Carbon Workshop Module 5</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>The Seven Step Process </strong>(Video): Apply the
                process of outline carbon equivalents and offset
                strategies&nbsp;
              </li>
              <li>
                <strong>Carbon Workshop Module 6</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Calculating Your Packaging Carbon</strong> Footprint
                (PDF): Summarize resources to aid you in the calculation process
              </li>
              <li class='ql-indent-1'>
                <strong>
                  Carbon Equivalents and Offset Strategies: Filled Template
                  Example{' '}
                </strong>
                (PDF): Showcase an example using the seven step process
              </li>
              <li class='ql-indent-1'>
                <strong>Carbon Equivalents and Offset Strategies</strong>{' '}
                (Assignment)<strong>: </strong>Apply the seven step process
                worksheet to your packaged product&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Thoughts from a Lawyer</strong> (Presentation):
                Summarize overarching legal issues to consider when
                investigating sustainable practices&nbsp;
              </li>
              <li>
                <strong>Life Cycle Analysis Module 1</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Before Your Begin </strong>(Directions): Instruct on how
                to sign up for the life cycle analysis software&nbsp;
              </li>
              <li class='ql-indent-1'>
                <strong>Using COMPASS </strong>(Video): Discuss the basics of
                the this software: definitions, inputting data, and reporting
              </li>
              <li>
                <strong>Life Cycle Analysis Module 2</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Data Entry </strong>(Video): Use a packaging scenario to
                learn how to&nbsp; input data
              </li>
              <li>
                <strong>Life Cycle Analysis Module 3</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Beginning Your Project </strong>(Video): Examine the
                software at a granular level
              </li>
              <li>
                <strong>Life Cycle Analysis Module 4</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Running a Report</strong> (Video): Investigate how to
                run a report on the system at a granular level
              </li>
              <li class='ql-indent-1'>
                <strong>Insight from Dr. Hurley </strong>(Video): Discuss
                assumptions and considerations to understand when running a
                report&nbsp;
              </li>
              <li>
                <strong>Final Pitch</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Experiential Learning: Video Pitch</strong>{' '}
                (Assignment): Based on all your findings from the program, come
                up with a 30 second video pitch on how you plan to implement
                these changes within your company.&nbsp;
              </li>
              <li>
                <strong>Conclusion</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Program Survey</strong> (Survey): &nbsp;Measure the
                effectiveness of this program by providing feedback&nbsp;
              </li>
              <li>
                <strong>Appendix</strong>
              </li>
              <li class='ql-indent-1'>
                <strong>Additional Resources from a Corrugated Expert</strong>{' '}
                (Downloadable Assets): Explore resources that will assist you in
                diving deeper into topics of interest
              </li>
            </ol>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Resource Requirements:&nbsp;</strong>
            </p>
            <p>
              The Packaging School requires all students to have access to a
              computer and at least 3 mbps of internet. Student services will
              provide students with suggestions as to how to get access to the
              internet and/or a computer if requested. All other requirements to
              complete any course or assignment within the Packaging School are
              embedded in the learning management system. Students will not be
              asked to purchase any other technology in order to complete the
              program. The lessons are accessible from any smartphone or tablet.
              Chrome is the recommended web browser. At this time, students may
              not download any material for offline viewing unless it is
              intuitive to do so. Students are responsible for their own
              computer maintenance.
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <h1>
              <strong>Academic Integrity Policy:&nbsp;</strong>
            </h1>
            <p>
              Any breach of the principles outlined in the Academic Integrity
              Statement is considered an act of academic dishonesty.
            </p>

            <p>Academic dishonesty is further defined as:</p>
            <ol className='flex flex-col gap-3'>
              <li>
                Giving, receiving, or using unauthorized aid, including the
                inappropriate use of internet research, in any work submitted to
                fulfill academic requirements. In examination situations all
                outside resources must be inaccessible unless otherwise
                authorized by the instructor;
              </li>
              <li>
                Plagiarism, which includes the intentional or unintentional
                copying of language, structure, or ideas of another and
                attributing the work to one&apos;s own efforts;
              </li>
              <li>
                The use of computer accounts that belong to another person
                without the permission of the file owner or account owner;
              </li>
            </ol>
            <p>
              All academic work submitted for grading or to fulfill academic
              requirements contains an implicit pledge and may contain, at the
              request of an instructor, an explicit pledge by the student that
              no unauthorized aid has been received.
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Complaints:&nbsp;</strong>
            </p>
            <p>
              If a student(s) has complaints about a course situation, they
              should first attempt to resolve the situation with the instructor:
              Dr. Suggs, Julie@packagingschool.com 864-412-5000.
            </p>

            <p>
              If a resolution cannot be made with the instructor, or if the
              complaint is about a general school policy over which the
              instructor has no jurisdiction, then the student(s) may contact
              the school director for mediation: Drew Felty, CEO{' '}
              <a
                href='mailto:Drew@packagingschool.com'
                rel='noopener noreferrer'
                target='_blank'
              >
                Drew@packagingschool.com
              </a>
              .
            </p>

            <p>
              If the complaint cannot be resolved at the school level through
              its complaint procedure, students may contact the South Carolina
              Commission on Higher Education. The form to contact the South
              Carolina Commission on Higher Education is available on the
              Commission&apos;s website here:{' '}
              <a
                href='http://www.che.sc.gov/CHE_Docs/AcademicAffairs/License/Complaint_procedures_and_form.pdf'
                rel='noopener noreferrer'
                target='_blank'
              >
                http://www.che.sc.gov/CHE_Docs/AcademicAffairs/License/Complaint_procedures_and_form.pdf
              </a>
              .
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Grading Policies:&nbsp;</strong>
            </p>
            <p>
              Students&apos; progress throughout the program is monitored
              through the Learning Management System (LMS). Courses include
              multiple knowledge checks and a final exam, which assess the
              student&apos;s comprehension of the course&apos;s learning
              objectives. Knowledge checks are not graded. However, they must be
              completed. Knowledge checks test retention of the teachings and
              help the student prepare for the final exam. Passing the course
              requires an 80% or greater on the final exam. Student completion
              progress is presented with the completion of every lesson in the
              LMS. Grades are reported to students at the end of each course and
              a final grade is submitted upon completion of the final exam.
              Students are notified by email each week if they have outstanding
              course material that has not been completed. Transcripts will be
              held digitally and are considered Permanent Records which are held
              indefinitely. Attendance is recorded for each login session in the
              LMS, and all engagement with the program is monitored.&nbsp;
            </p>

            <p>Grading Scale</p>
            <p> 0–79% = Fail</p>
            <p> 80–100% = Pass</p>

            <p>
              Students must pass the final exam in each course in order to
              successfully complete the course. Students must successfully
              complete every course in the program&apos;s curriculum in order to
              receive the certificate of completion at the end of the program.
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p>
              <strong>Student Identity Verification:</strong>
            </p>
            <p>
              The Packaging School requires students to set up an account and
              password in order to access all course work. Students are
              encouraged to protect their password and account. Only one student
              per account is permitted. IP addresses are monitored to ensure
              that students are not sharing their account with individuals in
              another location. Proctoring software is used during exams to
              ensure that students are who they say they are. Accredible is used
              to verify that the same person who completes coursework and
              assignments receives the certificate and digital badge.
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p>
              <strong>Non-Discrimination Policy:</strong>
            </p>
            <p>
              The Packaging School is committed to providing an environment that
              is free from discrimination on the basis of race, color, national
              origin, sex, sexual orientation, or disability in its educational
              courses and employment practices. If any student, faculty, staff
              or applicant has a question or concern regarding compliance with
              this policy, that person may direct the question or concern to
              Student Services.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
