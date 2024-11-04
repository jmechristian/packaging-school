/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'packschool.s3.amazonaws.com',
      'psheadshots.s3.amazonaws.com',
      'tailwindui.com',
      'apsmedia.s3.amazonaws.com',
      'packagingschool.com',
      'psupdatetemp.wpengine.com',
      'psadmin.s3.amazonaws.com',
      'media.licdn.com',
      'packmedia54032-staging.s3.amazonaws.com',
      'packschool.s3.us-east-1.amazonaws.com',
    ],
  },
  async redirects() {
    return [
      // Path Matching - will match `/old-blog/a`, but not `/old-blog/a/b`
      {
        source: '/courses/sales-bootcamp',
        destination: '/sales-bootcamp',
        permanent: true,
      },
      {
        source: '/pack-design-camp',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/packcamp',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/pack-design-workshop',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/workshop',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/workshops',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/get-to-know-cmpm',
        destination: 'certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cmpm',
        destination: 'certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/get-to-know-cps',
        destination: '/certifications/get-to-know-cps',
        permanent: true,
      },
      {
        source: '/get-to-know-apc',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/about-packaging-school',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/automotive',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/automotive/:id',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/automotive',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/automotive-counter',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/learn-packaging-online-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/learn-packaging-online-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/author',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/author',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/shop/glass-packaging',
        destination: '/courses/glass-metal-packaging',
        permanent: true,
      },
      {
        source: '/package-printing',
        destination: '/courses/package-printing',
        permanent: true,
      },
      {
        source: '/printing',
        destination: '/courses/package-printing',
        permanent: true,
      },
      {
        source: '/paperboard-cartons',
        destination: '/courses/packaging-foundations',
        permanent: true,
      },
      {
        source: '/packaging-distribution',
        destination: '/courses/packaging-distribution',
        permanent: true,
      },
      {
        source: '/packaging-machinery',
        destination: '/courses/packaging-machinery',
        permanent: true,
      },
      {
        source: '/polymers-in-packaging',
        destination: '/courses/polymers-in-packaging',
        permanent: true,
      },
      {
        source: '/glass-metal-packaging',
        destination: '/courses/glass-metal-packaging',
        permanent: true,
      },

      {
        source: '/packaging-foundations',
        destination: '/courses/paperboard-cartons',
        permanent: true,
      },
      {
        source: '/paperboard-cartons-course',
        destination: '/courses/paperboard-cartons',
        permanent: true,
      },
      {
        source: '/corrugated-containers',
        destination: '/courses/corrugated-containers',
        permanent: true,
      },
      {
        source: '/courses-corrugated-containers-101',
        destination: '/courses/corrugated-containers',
        permanent: true,
      },
      {
        source: '/corrugated-design',
        destination: '/courses/introduction-to-corrugated-design',
        permanent: true,
      },
      {
        source: '/courses-package-printing-101',
        destination: '/courses/package-printing',
        permanent: true,
      },
      {
        source: '/courses-sustainable-packaging-101',
        destination: '/courses/sustainable-packaging',
        permanent: true,
      },
      {
        source: '/hazmat-packaging',
        destination:
          '/courses/hazmat-packaging-certificate-for-automotive-applications',
        permanent: true,
      },
      {
        source: '/packaging-boot-camp',
        destination: '/courses/packaging-boot-camp-101',
        permanent: true,
      },
      {
        source: '/packaging-design-workflow',
        destination: '/courses/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/packaging-foundations',
        destination: '/courses/packaging-foundations',
        permanent: true,
      },
      {
        source: '/packaging-regulations',
        destination: '/courses/packaging-laws-and-regulations',
        permanent: true,
      },
      {
        source: '/packaging-science-certificate',
        destination: '/certifications/get-to-know-cps',
        permanent: true,
      },
      {
        source: '/packaging-science-certificate',
        destination: '/certifications/get-to-know-cps',
        permanent: true,
      },
      {
        source: '/sustainable-packaging',
        destination: '/courses/sustainable-packaging',
        permanent: true,
      },
      {
        source: '/sustainability',
        destination: '/courses/sustainable-packaging',
        permanent: true,
      },
      {
        source: '/sustainable',
        destination: '/courses/sustainable-packaging',
        permanent: true,
      },
      {
        source: '/beauty-and-health',
        destination:
          'https://library.packagingschool.com/articles/beauty-and-health',
        permanent: true,
      },
      {
        source: '/beauty-and-health',
        destination:
          'https://library.packagingschool.com/articles/beauty-and-health',
        permanent: true,
      },
      {
        source: '/bev-tech-fundamentals/',
        destination: '/courses/fundamentals-of-beverage-technology',
        permanent: true,
      },
      {
        source: '/beverage-institute/',
        destination: '/collections/beverage-institute-value-bundle',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-packaging-compliance-specialist/',
        destination: '/careers-in-packaging-consumer-behavior-analyst',
        permanent: true,
      },
      {
        source: '/certificates',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/cmpm-automotive',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/courses/packdesign-workshop',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/corrugated-design-scholarship-application',
        destination: '/forms/scholarship-application-form',
        permanent: true,
      },
      {
        source: '/courses-bmw-distribution-testing',
        destination: '/courses/transportation-damage-testing',
        permanent: true,
      },
      {
        source: '/courses/bmw-distribution-testing',
        destination: '/courses/transportation-damage-testing',
        permanent: true,
      },
      {
        source: '/courses-pet-preform-to-bottle',
        destination: '/courses/preform-design',
        permanent: true,
      },
      {
        source: '/courses-preform-heating',
        destination: '/courses/preform-heating',
        permanent: true,
      },
      {
        source: '/courses-solidworks-basics',
        destination: '/courses/solidworks-for-packaging-basic',
        permanent: true,
      },
      {
        source: '/solidworks-for-packaging-basic',
        destination: '/courses/solidworks-for-packaging-basic',
        permanent: true,
      },
      {
        source: '/design',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/flexographic-print-fundamentals',
        destination: '/courses/flexographic-print-fundamentals',
        permanent: true,
      },
      {
        source: '/human-factors-in-packaging-design',
        destination: '/courses/leveraging-human-factors-in-packaging-design',
        permanent: true,
      },
      {
        source: '/project-management-essentials',
        destination: '/courses/project-management-essentials',
        permanent: true,
      },
      {
        source: '/cannabis-packaging',
        destination: '/courses/cannabis-packaging',
        permanent: true,
      },
      {
        source: '/cannabis-packaging',
        destination: '/courses/cannabis-packaging',
        permanent: true,
      },
      {
        source: '/pressure-sensitive-labels-101',
        destination: '/courses/pressure-sensitive-labels-101',
        permanent: true,
      },
      {
        source: '/bioplastics-for-packaging-with-dr-sandeep-kulkarni',
        destination:
          '/courses/bioplastics-for-packaging-with-dr-sandeep-kulkarni',
        permanent: true,
      },
      {
        source: '/liquid-filling-machinery-with-john-henry',
        destination: '/courses/liquid-filling-with-john-henry',
        permanent: true,
      },
      {
        source: '/luxepack',
        destination: '/courses/luxe-pack-exclusive-collection',
        permanent: true,
      },
      {
        source: '/our-brand',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/packcamp',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/packcamp-2020',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/packaging-sales',
        destination:
          '/courses/sales-operations-for-printing-and-packaging-professionals',
        permanent: true,
      },
      {
        source: '/packaging-glossary',
        destination:
          'https://library.packagingschool.com/articles/packaging-glossary',
        permanent: true,
      },
      {
        source: '/pharmaceutical',
        destination:
          'https://library.packagingschool.com/articles/pharmaceutical',
        permanent: true,
      },
      {
        source: '/plastic-folding-cartons-course',
        destination: '/courses/plastic-folding-cartons',
        permanent: true,
      },
      {
        source: '/pressure-sensitive-labels-101',
        destination: '/courses/pressure-sensitive-labels-101',
        permanent: true,
      },
      {
        source: '/s/PAPERBOARD-GRADES-CHEAT-SHEET.pdf',
        destination:
          'https://packschool.s3.amazonaws.com/paperboard_grades_cheat_sheet_vv3.pdf',
        permanent: true,
      },
      {
        source: '/s/TAP-acknowledgments__overview10-lz3b.pdf',
        destination:
          'https://packschool.s3.amazonaws.com/TAP+Acknowledgments.pdf',
        permanent: true,
      },
      {
        source: '/software',
        destination:
          'https://packschool.s3.amazonaws.com/TAP+Acknowledgments.pdf',
        permanent: true,
      },
      {
        source: '/summer',
        destination:
          'https://library.packagingschool.com/articles/packaging-glossary',
        permanent: true,
      },
      {
        source: '/summer',
        destination:
          'https://library.packagingschool.com/articles/packaging-glossary',
        permanent: true,
      },
      {
        source: '/the-packaging-school-licensure',
        destination:
          'https://library.packagingschool.com/articles/packaging-glossary',
        permanent: true,
      },
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2020/10/Overview-of-PDP-Phases-2020.pdf',
        destination:
          'https://packschool.s3.amazonaws.com/Overview-of-PDP-Phases-2020.pdf',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2021/03/Global-Packaging-Industry.pdf',
        destination:
          'https://packschool.s3.amazonaws.com/Global-Packaging-Industry.pdf',
        permanent: true,
      },
      {
        source:
          '/wp-content/uploads/2022/04/Sales-Bootcamp-Program-Outline-Updated.pdf',
        destination:
          'https://packschool.s3.amazonaws.com/Sales-Bootcamp-Program-Outline.pdf',
        permanent: true,
      },
      {
        source: '/alumni',
        destination: '/testimonials',
        permanent: true,
      },
      {
        source: '/testimonial',
        destination: '/testimonials',
        permanent: true,
      },
      {
        source: '/scholarship-application-form',
        destination: '/forms/scholarship-application-form',
        permanent: true,
      },
      {
        source: '/aws-and-regs-ad',
        destination: '/courses/packaging-laws-and-regulations',
        permanent: true,
      },
      {
        source: '/john-henry',
        destination: '/courses/liquid-filling-with-john-henry',
        permanent: true,
      },
      {
        source: '/center-for-corporate-learning',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/isbt-i06-water-and-wastewater-treatment-technology',
        destination: '/courses/water-and-wastewater-treatment-technology',
        permanent: true,
      },
      {
        source: '/temperature-assurance-packaging-fundamentals',
        destination: '/courses/temperature-assurance-packaging-fundamentals',
        permanent: true,
      },
      {
        source: '/isbt-i02-sanitation-for-fountain-beverages',
        destination: '/courses/sanitation-for-fountain-beverages',
        permanent: true,
      },
      {
        source: '/isbt-i02-sanitation-for-fountain-beverages',
        destination: '/courses/sanitation-for-fountain-beverages',
        permanent: true,
      },
      {
        source: '/courses',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/courses-preform-heating',
        destination: '/courses/preform-heating',
        permanent: true,
      },
      {
        source: '/courses-preform-design',
        destination: '/courses/preform-design',
        permanent: true,
      },
      {
        source: '/courses-polymer-to-preform',
        destination: '/courses/polymer-to-preform',
        permanent: true,
      },
      {
        source: '/plastic-folding-cartons',
        destination: '/courses/plastic-folding-cartons',
        permanent: true,
      },
      {
        source: '/courses-pet-recycling',
        destination: '/courses/pet-recycling',
        permanent: true,
      },
      {
        source: '/courses-pet-preform-to-bottle',
        destination: '/courses/pet-preform-to-bottle',
        permanent: true,
      },
      {
        source: '/courses-pet-industry-overview-manufacture-and-properties',
        destination:
          '/courses/pet-industry-overview-manufacture-and-properties',
        permanent: true,
      },
      {
        source: '/courses-packaging-regulations-101',
        destination: '/courses/packaging-laws-and-regulations',
        permanent: true,
      },
      {
        source: '/courses-packaging-regulations-101',
        destination: '/courses/packaging-laws-and-regulations',
        permanent: true,
      },
      {
        source: '/courses-packaging-machinery-101',
        destination: '/courses/packaging-machinery',
        permanent: true,
      },
      {
        source: '/courses-material-handling-and-drying',
        destination: '/courses/material-handling-and-drying',
        permanent: true,
      },
      {
        source: '/liquid-filling-machinery',
        destination: '/courses/liquid-filling-with-john-henry',
        permanent: true,
      },
      {
        source: '/courses-introduction-to-polymers-and-pet',
        destination: '/courses/introduction-to-polymers-and-pet',
        permanent: true,
      },
      {
        source: '/isbt-i05-introduction-to-microbiology',
        destination: '/courses/introduction-to-microbiology',
        permanent: true,
      },
      {
        source: '/isbt-i05-introduction-to-microbiology',
        destination: '/courses/introduction-to-microbiology',
        permanent: true,
      },
      {
        source: '/human-factors',
        destination: '/courses/leveraging-human-factors-in-packaging-design',
        permanent: true,
      },
      {
        source: '/human-factors',
        destination: '/courses/leveraging-human-factors-in-packaging-design',
        permanent: true,
      },
      {
        source: '/metal-packaging',
        destination: '/courses/glass-metal-packaging',
        permanent: true,
      },
      {
        source: '/glass-packaging',
        destination: '/courses/glass-metal-packaging',
        permanent: true,
      },
      {
        source: '/isbt-i01-fundamentals-of-beverage-technology',
        destination: '/courses/fundamentals-of-beverage-technology',
        permanent: true,
      },
      {
        source: '/bev-tech-fundamentals',
        destination: '/courses/fundamentals-of-beverage-technology',
        permanent: true,
      },
      {
        source: '/flexographic-print-fundamentals',
        destination: '/courses/flexographic-print-fundamentals',
        permanent: true,
      },
      {
        source: '/courses-solidworks-basics',
        destination: '/courses/solidworks-for-packaging-basic',
        permanent: true,
      },
      {
        source: '/courses-container-design-and-development',
        destination: '/courses/container-design-and-development',
        permanent: true,
      },
      {
        source: '/courses-blow-molding',
        destination: '/courses/blow-molding-processing',
        permanent: true,
      },
      {
        source: '/isbt-i03-beverage-ingredients-bundle',
        destination: '/collections/isbt-ingredients',
        permanent: true,
      },
      {
        source: '/isbt-i04-beverage-gases-argon-oxygen-and-nitrogen',
        destination: '/courses/beverage-gases-argon-oxygen-and-nitrogen',
        permanent: true,
      },
      {
        source: '/augmented-reality',
        destination: '/courses/augmented-reality-for-packaging',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-packaging-operator',
        destination: '/careers/careers-in-packaging-packaging-operator',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-packaging-operator',
        destination: '/careers/careers-in-packaging-packaging-engineer',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-packaging-compliance-specialist',
        destination:
          '/careers/careers-in-packaging-packaging-compliance-specialist',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-logistics-coordinator',
        destination: '/careers/careers-in-packaging-logistics-coordinator',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-graphic-designer',
        destination: '/careers/careers-in-packaging-graphic-designer',
        permanent: true,
      },
      {
        source: '/careers-in-packaging-account-manager',
        destination: '/careers/careers-in-packaging-account-manager',
        permanent: true,
      },
      {
        source: '/clemson-mba-apply',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/trainings-workshops',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/pti-online-academy-collection',
        destination: '/collections/pti-online-academy-collection',
        permanent: true,
      },
      {
        source: '/pti-online-academy-collection',
        destination: '/collections/pti-online-academy-collection',
        permanent: true,
      },
      {
        source: '/packaging-mini-mba-application',
        destination: '/certificate-of-mastery-in-packaging-management',
        permanent: true,
      },
      {
        source: '/make-a-change',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/women',
        destination:
          'https://library.packagingschool.com/articles/women-in-packaging',
        permanent: true,
      },
      {
        source: '/food-packaging-sponsor-form',
        destination: '/food-packaging',
        permanent: true,
      },
      {
        source: '/beverage-institute',
        destination: '/collections/beverage-institute-value-bundle',
        permanent: true,
      },
      {
        source: '/automotive-form',
        destination: '/certifications/get-to-know-apc',
        permanent: true,
      },
      {
        source: '/women-in-packaging',
        destination:
          'https://library.packagingschool.com/articles/women-in-packaging',
        permanent: true,
      },
      {
        source: '/the-packaging-school-licensure',
        destination:
          'https://library.packagingschool.com/articles/the-packaging-school-licensure',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination:
          'https://library.packagingschool.com/articles/privacy-policy',
        permanent: true,
      },
      {
        source: '/academic-policies-and-prodecures',
        destination:
          'https://library.packagingschool.com/articles/academic-policies-and-prodecures',
        permanent: true,
      },
      {
        source: '/removal-request',
        destination:
          'https://library.packagingschool.com/articles/removal-request',
        permanent: true,
      },
      {
        source: '/poy-2022-press-release',
        destination:
          'https://library.packagingschool.com/articles/poy-2022-press-release',
        permanent: true,
      },
      {
        source: '/worldwide-packaging-degrees',
        destination:
          'https://library.packagingschool.com/articles/poy-2022-press-release',
        permanent: true,
      },
      {
        source: '/what-is-the-packaging-industry',
        destination: '/courses/packaging-boot-camp-101',
        permanent: true,
      },
      {
        source: '/solidworks',
        destination: '/courses/solidworks-for-packaging-basic',
        permanent: true,
      },
      {
        source: '/request-info',
        destination: '/subscribe',
        permanent: true,
      },
      {
        source: '/regulations',
        destination: 'https://library.packagingschool.com/articles/regulations',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/',
        permanent: true,
      },
      {
        source: '/psl',
        destination: '/courses/pressure-sensitive-labels-101',
        permanent: true,
      },
      {
        source: '/prospecting-series',
        destination: '/sales-bootcamp',
        permanent: true,
      },
      {
        source: '/prospecting-series-registration-page',
        destination: '/sales-bootcamp',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/our-brand',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/newsletter',
        destination: '/subscribe',
        permanent: true,
      },
      {
        source: '/my-account',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/members',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/materials',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/luxe-pack-exclusive-collection',
        destination: '/courses/luxe-pack-exclusive-collection',
        permanent: true,
      },
      {
        source: '/level-up',
        destination: '/certifications',
        permanent: true,
      },
      {
        source: '/intro',
        destination: '/courses/packaging-boot-camp-101',
        permanent: true,
      },
      {
        source: '/courses/packaging-printing',
        destination: '/courses/package-printing',
        permanent: true,
      },
      {
        source: '/cps-may-1',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cps-may-2',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cps-may-3',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cpm',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cmpm-tuition',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/courses-project-management-essentials',
        destination: '/courses/project-management-essentials',
        permanent: true,
      },
      {
        source: '/courses-solidworks-advanced',
        destination: '/courses/solidworks-for-packaging-basic',
        permanent: true,
      },
      {
        source: '/courses-polymers-in-packaging-101',
        destination: '/courses/polymers-in-packaging',
        permanent: true,
      },
      {
        source: '/courses-metal-packaging-101',
        destination: '/courses/glass-metal-packaging',
        permanent: true,
      },
      {
        source: '/courses-luxe-pack-exclusive-collection',
        destination: '/courses/luxe-pack-exclusive-collection',
        permanent: true,
      },
      {
        source: '/course-catalog',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/business',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/course-catalog_v3',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/course-catalog-v4',
        destination: '/all_courses',
        permanent: true,
      },
      {
        source: '/brochure',
        destination: '/certifications/get-to-know-cmpm',
        permanent: true,
      },
      {
        source: '/cannabis',
        destination: '/courses/cannabis-packaging',
        permanent: true,
      },
      {
        source: '/box-design',
        destination: 'https://library.packagingschool.com/packdesign-workshop',
        permanent: true,
      },
      {
        source: '/bioplastics-for-packaging',
        destination:
          '/courses/bioplastics-for-packaging-with-dr-sandeep-kulkarni',
        permanent: true,
      },
      {
        source: '/beverage',
        destination: 'https://library.packagingschool.com/articles/beverages',
        permanent: true,
      },
      {
        source: '/apc-enroll',
        destination: 'https://learn.packagingschool.com/enroll/735516',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/courses/diecutting-academy-diemaking-101',
        destination: '/courses/iadd-diecutting-academy-diemaking-101',
        permanent: true,
      },
      {
        source: '/courses/diecutting-academy-diemaking-101',
        destination: '/courses/iadd-diecutting-academy-diemaking-101',
        permanent: true,
      },
      {
        source: '/courses/diecutting-101',
        destination: '/courses/iadd-diecutting-academy-diemaking-101',
        permanent: true,
      },
      {
        source: '/cmpm-apply',
        destination: '/certificate-of-mastery-in-packaging-management',
        permanent: true,
      },
      {
        source: '/cmpm-apply',
        destination: '/certificate-of-mastery-in-packaging-management',
        permanent: true,
      },
      {
        source: '/sws-bmw-landing-page',
        destination: 'https://bmw.packagingschool.com',
        permanent: true,
      },
      {
        source: '/sws-bmw-start-survey',
        destination: 'https://bmw.packagingschool.com/sws-bmw-start-survey',
        permanent: true,
      },
      {
        source: '/sws-bmw-overview-training',
        destination:
          'https://bmw.packagingschool.com/sws-bmw-overview-training',
        permanent: true,
      },
      {
        source: '/sws-bmw-survey',
        destination: 'https://bmw.packagingschool.com/sws-bmw-survey',
        permanent: true,
      },
      {
        source: '/apccourses',
        destination: '/all_courses?cat=automotive',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
