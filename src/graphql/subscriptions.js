/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLessonSource = /* GraphQL */ `
  subscription OnCreateLessonSource(
    $filter: ModelSubscriptionLessonSourceFilterInput
  ) {
    onCreateLessonSource(filter: $filter) {
      id
      name
      link
      position
      createdAt
      updatedAt
      lessonSourcesId
      __typename
    }
  }
`;
export const onUpdateLessonSource = /* GraphQL */ `
  subscription OnUpdateLessonSource(
    $filter: ModelSubscriptionLessonSourceFilterInput
  ) {
    onUpdateLessonSource(filter: $filter) {
      id
      name
      link
      position
      createdAt
      updatedAt
      lessonSourcesId
      __typename
    }
  }
`;
export const onDeleteLessonSource = /* GraphQL */ `
  subscription OnDeleteLessonSource(
    $filter: ModelSubscriptionLessonSourceFilterInput
  ) {
    onDeleteLessonSource(filter: $filter) {
      id
      name
      link
      position
      createdAt
      updatedAt
      lessonSourcesId
      __typename
    }
  }
`;
export const onCreateLessonLink = /* GraphQL */ `
  subscription OnCreateLessonLink(
    $filter: ModelSubscriptionLessonLinkFilterInput
  ) {
    onCreateLessonLink(filter: $filter) {
      id
      name
      link
      createdAt
      updatedAt
      lessonLinksId
      __typename
    }
  }
`;
export const onUpdateLessonLink = /* GraphQL */ `
  subscription OnUpdateLessonLink(
    $filter: ModelSubscriptionLessonLinkFilterInput
  ) {
    onUpdateLessonLink(filter: $filter) {
      id
      name
      link
      createdAt
      updatedAt
      lessonLinksId
      __typename
    }
  }
`;
export const onDeleteLessonLink = /* GraphQL */ `
  subscription OnDeleteLessonLink(
    $filter: ModelSubscriptionLessonLinkFilterInput
  ) {
    onDeleteLessonLink(filter: $filter) {
      id
      name
      link
      createdAt
      updatedAt
      lessonLinksId
      __typename
    }
  }
`;
export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags($filter: ModelSubscriptionTagsFilterInput) {
    onCreateTags(filter: $filter) {
      id
      tag
      lesson {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags($filter: ModelSubscriptionTagsFilterInput) {
    onUpdateTags(filter: $filter) {
      id
      tag
      lesson {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags($filter: ModelSubscriptionTagsFilterInput) {
    onDeleteTags(filter: $filter) {
      id
      tag
      lesson {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      name
      value
      certificates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      name
      value
      certificates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      name
      value
      certificates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCertificate = /* GraphQL */ `
  subscription OnCreateCertificate(
    $filter: ModelSubscriptionCertificateFilterInput
  ) {
    onCreateCertificate(filter: $filter) {
      id
      slug
      title
      title_callout_1
      title_callout_2
      title_text
      title_button_1_text
      title_button_1_link
      title_button_2_text
      title_button_2_link
      title_image
      courses {
        nextToken
        __typename
      }
      whoText
      courses_total
      hours_total
      ceus_total
      brochure_link
      video
      price_full
      price_monthly
      price_features
      lmsLink
      demoLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertificate = /* GraphQL */ `
  subscription OnUpdateCertificate(
    $filter: ModelSubscriptionCertificateFilterInput
  ) {
    onUpdateCertificate(filter: $filter) {
      id
      slug
      title
      title_callout_1
      title_callout_2
      title_text
      title_button_1_text
      title_button_1_link
      title_button_2_text
      title_button_2_link
      title_image
      courses {
        nextToken
        __typename
      }
      whoText
      courses_total
      hours_total
      ceus_total
      brochure_link
      video
      price_full
      price_monthly
      price_features
      lmsLink
      demoLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertificate = /* GraphQL */ `
  subscription OnDeleteCertificate(
    $filter: ModelSubscriptionCertificateFilterInput
  ) {
    onDeleteCertificate(filter: $filter) {
      id
      slug
      title
      title_callout_1
      title_callout_2
      title_text
      title_button_1_text
      title_button_1_link
      title_button_2_text
      title_button_2_link
      title_image
      courses {
        nextToken
        __typename
      }
      whoText
      courses_total
      hours_total
      ceus_total
      brochure_link
      video
      price_full
      price_monthly
      price_features
      lmsLink
      demoLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCertificateObject = /* GraphQL */ `
  subscription OnCreateCertificateObject(
    $filter: ModelSubscriptionCertificateObjectFilterInput
  ) {
    onCreateCertificateObject(filter: $filter) {
      id
      courseId
      title
      description
      seoImage
      hours
      courses
      video
      price
      link
      applicationLink
      callout
      purchaseLink
      categoryArray
      abbreviation
      category {
        nextToken
        __typename
      }
      whereText
      whatText
      howText
      deadline
      subscriptionLink
      subscriptionPrice
      sessions {
        nextToken
        __typename
      }
      status
      displayOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertificateObject = /* GraphQL */ `
  subscription OnUpdateCertificateObject(
    $filter: ModelSubscriptionCertificateObjectFilterInput
  ) {
    onUpdateCertificateObject(filter: $filter) {
      id
      courseId
      title
      description
      seoImage
      hours
      courses
      video
      price
      link
      applicationLink
      callout
      purchaseLink
      categoryArray
      abbreviation
      category {
        nextToken
        __typename
      }
      whereText
      whatText
      howText
      deadline
      subscriptionLink
      subscriptionPrice
      sessions {
        nextToken
        __typename
      }
      status
      displayOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertificateObject = /* GraphQL */ `
  subscription OnDeleteCertificateObject(
    $filter: ModelSubscriptionCertificateObjectFilterInput
  ) {
    onDeleteCertificateObject(filter: $filter) {
      id
      courseId
      title
      description
      seoImage
      hours
      courses
      video
      price
      link
      applicationLink
      callout
      purchaseLink
      categoryArray
      abbreviation
      category {
        nextToken
        __typename
      }
      whereText
      whatText
      howText
      deadline
      subscriptionLink
      subscriptionPrice
      sessions {
        nextToken
        __typename
      }
      status
      displayOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
      id
      slug
      category
      title
      subhead
      media
      video
      hour
      lessons
      videos
      price
      articles {
        nextToken
        __typename
      }
      certificate {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
      id
      slug
      category
      title
      subhead
      media
      video
      hour
      lessons
      videos
      price
      articles {
        nextToken
        __typename
      }
      certificate {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
      id
      slug
      category
      title
      subhead
      media
      video
      hour
      lessons
      videos
      price
      articles {
        nextToken
        __typename
      }
      certificate {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson($filter: ModelSubscriptionLessonFilterInput) {
    onCreateLesson(filter: $filter) {
      id
      slug
      title
      subhead
      type
      media
      mediaType
      slides
      seoImage
      content
      sources {
        nextToken
        __typename
      }
      links {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      objectives
      actionCTA
      actionSubhead
      actionLink
      actionLinkTitle
      actionExample
      author
      status
      related
      featured
      backdate
      createdBy
      lastEditedBy
      videoLink
      screengrab
      analysis {
        id
        wordCount
        readingTime
        quizQuestion
        quizOptions
        quizCorrectAnswer
        lessonId
        createdAt
        updatedAt
        __typename
      }
      usersCompleted {
        nextToken
        __typename
      }
      learningPaths {
        nextToken
        __typename
      }
      seoDescription
      seoKeywords
      seoTitle
      seoUrl
      seoRobots
      seoFollow
      glossaryTerms {
        nextToken
        __typename
      }
      wired
      wiredQuestions {
        question
        options
        correctAnswer
        __typename
      }
      wiredLessonId
      createdAt
      updatedAt
      lessonAnalysisId
      __typename
    }
  }
`;
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson($filter: ModelSubscriptionLessonFilterInput) {
    onUpdateLesson(filter: $filter) {
      id
      slug
      title
      subhead
      type
      media
      mediaType
      slides
      seoImage
      content
      sources {
        nextToken
        __typename
      }
      links {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      objectives
      actionCTA
      actionSubhead
      actionLink
      actionLinkTitle
      actionExample
      author
      status
      related
      featured
      backdate
      createdBy
      lastEditedBy
      videoLink
      screengrab
      analysis {
        id
        wordCount
        readingTime
        quizQuestion
        quizOptions
        quizCorrectAnswer
        lessonId
        createdAt
        updatedAt
        __typename
      }
      usersCompleted {
        nextToken
        __typename
      }
      learningPaths {
        nextToken
        __typename
      }
      seoDescription
      seoKeywords
      seoTitle
      seoUrl
      seoRobots
      seoFollow
      glossaryTerms {
        nextToken
        __typename
      }
      wired
      wiredQuestions {
        question
        options
        correctAnswer
        __typename
      }
      wiredLessonId
      createdAt
      updatedAt
      lessonAnalysisId
      __typename
    }
  }
`;
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson($filter: ModelSubscriptionLessonFilterInput) {
    onDeleteLesson(filter: $filter) {
      id
      slug
      title
      subhead
      type
      media
      mediaType
      slides
      seoImage
      content
      sources {
        nextToken
        __typename
      }
      links {
        nextToken
        __typename
      }
      tags {
        nextToken
        __typename
      }
      objectives
      actionCTA
      actionSubhead
      actionLink
      actionLinkTitle
      actionExample
      author
      status
      related
      featured
      backdate
      createdBy
      lastEditedBy
      videoLink
      screengrab
      analysis {
        id
        wordCount
        readingTime
        quizQuestion
        quizOptions
        quizCorrectAnswer
        lessonId
        createdAt
        updatedAt
        __typename
      }
      usersCompleted {
        nextToken
        __typename
      }
      learningPaths {
        nextToken
        __typename
      }
      seoDescription
      seoKeywords
      seoTitle
      seoUrl
      seoRobots
      seoFollow
      glossaryTerms {
        nextToken
        __typename
      }
      wired
      wiredQuestions {
        question
        options
        correctAnswer
        __typename
      }
      wiredLessonId
      createdAt
      updatedAt
      lessonAnalysisId
      __typename
    }
  }
`;
export const onCreateSeoDocument = /* GraphQL */ `
  subscription OnCreateSeoDocument(
    $filter: ModelSubscriptionSeoDocumentFilterInput
  ) {
    onCreateSeoDocument(filter: $filter) {
      id
      contentType
      slugOrPath
      metaJson
      jsonLd
      updatedBy
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onUpdateSeoDocument = /* GraphQL */ `
  subscription OnUpdateSeoDocument(
    $filter: ModelSubscriptionSeoDocumentFilterInput
  ) {
    onUpdateSeoDocument(filter: $filter) {
      id
      contentType
      slugOrPath
      metaJson
      jsonLd
      updatedBy
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onDeleteSeoDocument = /* GraphQL */ `
  subscription OnDeleteSeoDocument(
    $filter: ModelSubscriptionSeoDocumentFilterInput
  ) {
    onDeleteSeoDocument(filter: $filter) {
      id
      contentType
      slugOrPath
      metaJson
      jsonLd
      updatedBy
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onCreateAuthor = /* GraphQL */ `
  subscription OnCreateAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onCreateAuthor(filter: $filter) {
      id
      name
      headshot
      linkedIn
      title
      company
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAuthor = /* GraphQL */ `
  subscription OnUpdateAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onUpdateAuthor(filter: $filter) {
      id
      name
      headshot
      linkedIn
      title
      company
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAuthor = /* GraphQL */ `
  subscription OnDeleteAuthor($filter: ModelSubscriptionAuthorFilterInput) {
    onDeleteAuthor(filter: $filter) {
      id
      name
      headshot
      linkedIn
      title
      company
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
      id
      slug
      title
      media
      content
      author
      tags
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onUpdateBlog(filter: $filter) {
      id
      slug
      title
      media
      content
      author
      tags
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($filter: ModelSubscriptionBlogFilterInput) {
    onDeleteBlog(filter: $filter) {
      id
      slug
      title
      media
      content
      author
      tags
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onCreateArticle(filter: $filter) {
      id
      slug
      title
      subhead
      media
      seoImage
      content
      tags
      relatedCourses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onUpdateArticle(filter: $filter) {
      id
      slug
      title
      subhead
      media
      seoImage
      content
      tags
      relatedCourses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
    onDeleteArticle(filter: $filter) {
      id
      slug
      title
      subhead
      media
      seoImage
      content
      tags
      relatedCourses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDayInLifeItem = /* GraphQL */ `
  subscription OnCreateDayInLifeItem(
    $filter: ModelSubscriptionDayInLifeItemFilterInput
  ) {
    onCreateDayInLifeItem(filter: $filter) {
      id
      name
      desc
      icon
      createdAt
      updatedAt
      careerDayInLifeId
      __typename
    }
  }
`;
export const onUpdateDayInLifeItem = /* GraphQL */ `
  subscription OnUpdateDayInLifeItem(
    $filter: ModelSubscriptionDayInLifeItemFilterInput
  ) {
    onUpdateDayInLifeItem(filter: $filter) {
      id
      name
      desc
      icon
      createdAt
      updatedAt
      careerDayInLifeId
      __typename
    }
  }
`;
export const onDeleteDayInLifeItem = /* GraphQL */ `
  subscription OnDeleteDayInLifeItem(
    $filter: ModelSubscriptionDayInLifeItemFilterInput
  ) {
    onDeleteDayInLifeItem(filter: $filter) {
      id
      name
      desc
      icon
      createdAt
      updatedAt
      careerDayInLifeId
      __typename
    }
  }
`;
export const onCreateCareer = /* GraphQL */ `
  subscription OnCreateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onCreateCareer(filter: $filter) {
      id
      slug
      title
      altName
      subhead
      media
      dayInLife {
        nextToken
        __typename
      }
      cmpmCopy
      cpsCopy
      apcCopy
      coreCopy
      electiveCopy
      freeCopy
      beverageCopy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCareer = /* GraphQL */ `
  subscription OnUpdateCareer($filter: ModelSubscriptionCareerFilterInput) {
    onUpdateCareer(filter: $filter) {
      id
      slug
      title
      altName
      subhead
      media
      dayInLife {
        nextToken
        __typename
      }
      cmpmCopy
      cpsCopy
      apcCopy
      coreCopy
      electiveCopy
      freeCopy
      beverageCopy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCareer = /* GraphQL */ `
  subscription OnDeleteCareer($filter: ModelSubscriptionCareerFilterInput) {
    onDeleteCareer(filter: $filter) {
      id
      slug
      title
      altName
      subhead
      media
      dayInLife {
        nextToken
        __typename
      }
      cmpmCopy
      cpsCopy
      apcCopy
      coreCopy
      electiveCopy
      freeCopy
      beverageCopy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAPS2025MediaItem = /* GraphQL */ `
  subscription OnCreateAPS2025MediaItem(
    $filter: ModelSubscriptionAPS2025MediaItemFilterInput
  ) {
    onCreateAPS2025MediaItem(filter: $filter) {
      id
      title
      url
      type
      caption
      uploadedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAPS2025MediaItem = /* GraphQL */ `
  subscription OnUpdateAPS2025MediaItem(
    $filter: ModelSubscriptionAPS2025MediaItemFilterInput
  ) {
    onUpdateAPS2025MediaItem(filter: $filter) {
      id
      title
      url
      type
      caption
      uploadedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAPS2025MediaItem = /* GraphQL */ `
  subscription OnDeleteAPS2025MediaItem(
    $filter: ModelSubscriptionAPS2025MediaItemFilterInput
  ) {
    onDeleteAPS2025MediaItem(filter: $filter) {
      id
      title
      url
      type
      caption
      uploadedBy
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
      id
      name
      Employees {
        nextToken
        __typename
      }
      website
      email
      phone
      street_1
      street_2
      city
      state
      zip
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
      id
      name
      Employees {
        nextToken
        __typename
      }
      website
      email
      phone
      street_1
      street_2
      city
      state
      zip
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
      id
      name
      Employees {
        nextToken
        __typename
      }
      website
      email
      phone
      street_1
      street_2
      city
      state
      zip
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      thinkificId
      name
      title
      company
      email
      office
      bio
      interests
      goals
      cell
      picture
      linkedin
      location
      companyID
      cmpmFormID
      cmpmForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        moreAboutYou
        birthYear
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cMPMFormUserId
        __typename
      }
      cpsFormID
      cpsForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        birthYear
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cpsGoals
        paymentType
        moreAboutYou
        elective
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cPSFormUserId
        __typename
      }
      savedCourses
      savedLessons
      savedArticles
      source
      achievements {
        nextToken
        __typename
      }
      onboardingComplete
      onboardingCompleteDate
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      cohorts {
        nextToken
        __typename
      }
      allAccess
      allAccessStartDate
      allAccessEndDate
      lessonsCompleted {
        nextToken
        __typename
      }
      learningPathProgress {
        nextToken
        __typename
      }
      userXp {
        id
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        progress
        createdAt
        updatedAt
        userXpUserId
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      tourCompleted
      orders {
        nextToken
        __typename
      }
      icpfCmpmFormID
      icpfCmpmForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        optOut
        birthYear
        paymentConfirmation
        contactConsent
        status
        videoLink
        createdOn
        updatedOn
        icpfCmpmFormUserId
        __typename
      }
      pgsfFormID
      pgsfForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        certApplying
        r2rconsent
        referral
        payment
        yearGoals
        careerGoals
        openToInternships
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        whyinterested
        optOut
        birthYear
        paymentConfirmation
        impact
        status
        funding
        createdOn
        updatedOn
        pgsfFormUserId
        __typename
      }
      initials
      createdAt
      updatedAt
      userUserXpId
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      thinkificId
      name
      title
      company
      email
      office
      bio
      interests
      goals
      cell
      picture
      linkedin
      location
      companyID
      cmpmFormID
      cmpmForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        moreAboutYou
        birthYear
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cMPMFormUserId
        __typename
      }
      cpsFormID
      cpsForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        birthYear
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cpsGoals
        paymentType
        moreAboutYou
        elective
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cPSFormUserId
        __typename
      }
      savedCourses
      savedLessons
      savedArticles
      source
      achievements {
        nextToken
        __typename
      }
      onboardingComplete
      onboardingCompleteDate
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      cohorts {
        nextToken
        __typename
      }
      allAccess
      allAccessStartDate
      allAccessEndDate
      lessonsCompleted {
        nextToken
        __typename
      }
      learningPathProgress {
        nextToken
        __typename
      }
      userXp {
        id
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        progress
        createdAt
        updatedAt
        userXpUserId
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      tourCompleted
      orders {
        nextToken
        __typename
      }
      icpfCmpmFormID
      icpfCmpmForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        optOut
        birthYear
        paymentConfirmation
        contactConsent
        status
        videoLink
        createdOn
        updatedOn
        icpfCmpmFormUserId
        __typename
      }
      pgsfFormID
      pgsfForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        certApplying
        r2rconsent
        referral
        payment
        yearGoals
        careerGoals
        openToInternships
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        whyinterested
        optOut
        birthYear
        paymentConfirmation
        impact
        status
        funding
        createdOn
        updatedOn
        pgsfFormUserId
        __typename
      }
      initials
      createdAt
      updatedAt
      userUserXpId
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      thinkificId
      name
      title
      company
      email
      office
      bio
      interests
      goals
      cell
      picture
      linkedin
      location
      companyID
      cmpmFormID
      cmpmForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        moreAboutYou
        birthYear
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cMPMFormUserId
        __typename
      }
      cpsFormID
      cpsForm {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        addressExtra
        city
        state
        country
        birthYear
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cpsGoals
        paymentType
        moreAboutYou
        elective
        optOut
        paymentConfirmation
        status
        createdOn
        updatedOn
        cPSFormUserId
        __typename
      }
      savedCourses
      savedLessons
      savedArticles
      source
      achievements {
        nextToken
        __typename
      }
      onboardingComplete
      onboardingCompleteDate
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      cohorts {
        nextToken
        __typename
      }
      allAccess
      allAccessStartDate
      allAccessEndDate
      lessonsCompleted {
        nextToken
        __typename
      }
      learningPathProgress {
        nextToken
        __typename
      }
      userXp {
        id
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        progress
        createdAt
        updatedAt
        userXpUserId
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      tourCompleted
      orders {
        nextToken
        __typename
      }
      icpfCmpmFormID
      icpfCmpmForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        sessionApplying
        referral
        payment
        yearGoals
        cmpmGoals
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        optOut
        birthYear
        paymentConfirmation
        contactConsent
        status
        videoLink
        createdOn
        updatedOn
        icpfCmpmFormUserId
        __typename
      }
      pgsfFormID
      pgsfForm {
        id
        firstName
        lastName
        email
        age
        phone
        streetAddress
        addressExtra
        city
        state
        country
        companyName
        companyTitle
        linkedin
        background
        whyPackaging
        areaOfInterest
        certApplying
        r2rconsent
        referral
        payment
        yearGoals
        careerGoals
        openToInternships
        school
        schoolType
        studying
        credential
        credentialProgress
        credentialYear
        fullTime
        organizations
        transcript
        resume
        corrugatedImpact
        opportunities
        moreAboutYou
        whyinterested
        optOut
        birthYear
        paymentConfirmation
        impact
        status
        funding
        createdOn
        updatedOn
        pgsfFormUserId
        __typename
      }
      initials
      createdAt
      updatedAt
      userUserXpId
      __typename
    }
  }
`;
export const onCreateUserXp = /* GraphQL */ `
  subscription OnCreateUserXp($filter: ModelSubscriptionUserXpFilterInput) {
    onCreateUserXp(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      progress
      createdAt
      updatedAt
      userXpUserId
      __typename
    }
  }
`;
export const onUpdateUserXp = /* GraphQL */ `
  subscription OnUpdateUserXp($filter: ModelSubscriptionUserXpFilterInput) {
    onUpdateUserXp(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      progress
      createdAt
      updatedAt
      userXpUserId
      __typename
    }
  }
`;
export const onDeleteUserXp = /* GraphQL */ `
  subscription OnDeleteUserXp($filter: ModelSubscriptionUserXpFilterInput) {
    onDeleteUserXp(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      totalXp
      thinkificXp
      psXp
      level
      xpToNextLevel
      lastLogin
      dailyStreak
      progress
      createdAt
      updatedAt
      userXpUserId
      __typename
    }
  }
`;
export const onCreateCohort = /* GraphQL */ `
  subscription OnCreateCohort($filter: ModelSubscriptionCohortFilterInput) {
    onCreateCohort(filter: $filter) {
      id
      name
      startDate
      endDate
      deadline
      users {
        nextToken
        __typename
      }
      type
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      description
      link
      createdAt
      updatedAt
      instructorCohortsId
      cohortInstructorId
      __typename
    }
  }
`;
export const onUpdateCohort = /* GraphQL */ `
  subscription OnUpdateCohort($filter: ModelSubscriptionCohortFilterInput) {
    onUpdateCohort(filter: $filter) {
      id
      name
      startDate
      endDate
      deadline
      users {
        nextToken
        __typename
      }
      type
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      description
      link
      createdAt
      updatedAt
      instructorCohortsId
      cohortInstructorId
      __typename
    }
  }
`;
export const onDeleteCohort = /* GraphQL */ `
  subscription OnDeleteCohort($filter: ModelSubscriptionCohortFilterInput) {
    onDeleteCohort(filter: $filter) {
      id
      name
      startDate
      endDate
      deadline
      users {
        nextToken
        __typename
      }
      type
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      description
      link
      createdAt
      updatedAt
      instructorCohortsId
      cohortInstructorId
      __typename
    }
  }
`;
export const onCreateLearningPath = /* GraphQL */ `
  subscription OnCreateLearningPath(
    $filter: ModelSubscriptionLearningPathFilterInput
  ) {
    onCreateLearningPath(filter: $filter) {
      id
      title
      description
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      userProgress {
        nextToken
        __typename
      }
      displayOrder
      hours
      slug
      status
      icon
      accredibleId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLearningPath = /* GraphQL */ `
  subscription OnUpdateLearningPath(
    $filter: ModelSubscriptionLearningPathFilterInput
  ) {
    onUpdateLearningPath(filter: $filter) {
      id
      title
      description
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      userProgress {
        nextToken
        __typename
      }
      displayOrder
      hours
      slug
      status
      icon
      accredibleId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLearningPath = /* GraphQL */ `
  subscription OnDeleteLearningPath(
    $filter: ModelSubscriptionLearningPathFilterInput
  ) {
    onDeleteLearningPath(filter: $filter) {
      id
      title
      description
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      userProgress {
        nextToken
        __typename
      }
      displayOrder
      hours
      slug
      status
      icon
      accredibleId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLearningPathProgress = /* GraphQL */ `
  subscription OnCreateLearningPathProgress(
    $filter: ModelSubscriptionLearningPathProgressFilterInput
  ) {
    onCreateLearningPathProgress(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      progress
      completedCourses
      completedLessons
      lastAccessedDate
      startDate
      completionDate
      status
      credential
      credentialDate
      createdAt
      updatedAt
      userLearningPathProgressId
      learningPathUserProgressId
      __typename
    }
  }
`;
export const onUpdateLearningPathProgress = /* GraphQL */ `
  subscription OnUpdateLearningPathProgress(
    $filter: ModelSubscriptionLearningPathProgressFilterInput
  ) {
    onUpdateLearningPathProgress(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      progress
      completedCourses
      completedLessons
      lastAccessedDate
      startDate
      completionDate
      status
      credential
      credentialDate
      createdAt
      updatedAt
      userLearningPathProgressId
      learningPathUserProgressId
      __typename
    }
  }
`;
export const onDeleteLearningPathProgress = /* GraphQL */ `
  subscription OnDeleteLearningPathProgress(
    $filter: ModelSubscriptionLearningPathProgressFilterInput
  ) {
    onDeleteLearningPathProgress(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      progress
      completedCourses
      completedLessons
      lastAccessedDate
      startDate
      completionDate
      status
      credential
      credentialDate
      createdAt
      updatedAt
      userLearningPathProgressId
      learningPathUserProgressId
      __typename
    }
  }
`;
export const onCreateBoosterCourseProgress = /* GraphQL */ `
  subscription OnCreateBoosterCourseProgress(
    $filter: ModelSubscriptionBoosterCourseProgressFilterInput
  ) {
    onCreateBoosterCourseProgress(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      courseTitle
      completedLessonIds
      completedLessonTitles
      totalLessonCount
      percentComplete
      milestonesIssued
      lastCompletedLessonId
      lastCompletedLessonTitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBoosterCourseProgress = /* GraphQL */ `
  subscription OnUpdateBoosterCourseProgress(
    $filter: ModelSubscriptionBoosterCourseProgressFilterInput
  ) {
    onUpdateBoosterCourseProgress(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      courseTitle
      completedLessonIds
      completedLessonTitles
      totalLessonCount
      percentComplete
      milestonesIssued
      lastCompletedLessonId
      lastCompletedLessonTitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBoosterCourseProgress = /* GraphQL */ `
  subscription OnDeleteBoosterCourseProgress(
    $filter: ModelSubscriptionBoosterCourseProgressFilterInput
  ) {
    onDeleteBoosterCourseProgress(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      courseTitle
      completedLessonIds
      completedLessonTitles
      totalLessonCount
      percentComplete
      milestonesIssued
      lastCompletedLessonId
      lastCompletedLessonTitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBoosterDiscountCode = /* GraphQL */ `
  subscription OnCreateBoosterDiscountCode(
    $filter: ModelSubscriptionBoosterDiscountCodeFilterInput
  ) {
    onCreateBoosterDiscountCode(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      milestonePercent
      code
      issuedAt
      redeemedAt
      isRedeemed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBoosterDiscountCode = /* GraphQL */ `
  subscription OnUpdateBoosterDiscountCode(
    $filter: ModelSubscriptionBoosterDiscountCodeFilterInput
  ) {
    onUpdateBoosterDiscountCode(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      milestonePercent
      code
      issuedAt
      redeemedAt
      isRedeemed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBoosterDiscountCode = /* GraphQL */ `
  subscription OnDeleteBoosterDiscountCode(
    $filter: ModelSubscriptionBoosterDiscountCodeFilterInput
  ) {
    onDeleteBoosterDiscountCode(filter: $filter) {
      id
      userId
      userEmail
      thinkificCourseId
      milestonePercent
      code
      issuedAt
      redeemedAt
      isRedeemed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLearningPathCourse = /* GraphQL */ `
  subscription OnCreateLearningPathCourse(
    $filter: ModelSubscriptionLearningPathCourseFilterInput
  ) {
    onCreateLearningPathCourse(filter: $filter) {
      id
      courseId
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      thinkificId
      createdAt
      updatedAt
      learningPathCoursesId
      lMSCourseLearningPathsId
      __typename
    }
  }
`;
export const onUpdateLearningPathCourse = /* GraphQL */ `
  subscription OnUpdateLearningPathCourse(
    $filter: ModelSubscriptionLearningPathCourseFilterInput
  ) {
    onUpdateLearningPathCourse(filter: $filter) {
      id
      courseId
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      thinkificId
      createdAt
      updatedAt
      learningPathCoursesId
      lMSCourseLearningPathsId
      __typename
    }
  }
`;
export const onDeleteLearningPathCourse = /* GraphQL */ `
  subscription OnDeleteLearningPathCourse(
    $filter: ModelSubscriptionLearningPathCourseFilterInput
  ) {
    onDeleteLearningPathCourse(filter: $filter) {
      id
      courseId
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      thinkificId
      createdAt
      updatedAt
      learningPathCoursesId
      lMSCourseLearningPathsId
      __typename
    }
  }
`;
export const onCreateLearningPathLesson = /* GraphQL */ `
  subscription OnCreateLearningPathLesson(
    $filter: ModelSubscriptionLearningPathLessonFilterInput
  ) {
    onCreateLearningPathLesson(filter: $filter) {
      id
      lessonId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      createdAt
      updatedAt
      lessonLearningPathsId
      learningPathLessonsId
      __typename
    }
  }
`;
export const onUpdateLearningPathLesson = /* GraphQL */ `
  subscription OnUpdateLearningPathLesson(
    $filter: ModelSubscriptionLearningPathLessonFilterInput
  ) {
    onUpdateLearningPathLesson(filter: $filter) {
      id
      lessonId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      createdAt
      updatedAt
      lessonLearningPathsId
      learningPathLessonsId
      __typename
    }
  }
`;
export const onDeleteLearningPathLesson = /* GraphQL */ `
  subscription OnDeleteLearningPathLesson(
    $filter: ModelSubscriptionLearningPathLessonFilterInput
  ) {
    onDeleteLearningPathLesson(filter: $filter) {
      id
      lessonId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      learningPath {
        id
        title
        description
        displayOrder
        hours
        slug
        status
        icon
        accredibleId
        createdAt
        updatedAt
        __typename
      }
      order
      createdAt
      updatedAt
      lessonLearningPathsId
      learningPathLessonsId
      __typename
    }
  }
`;
export const onCreateCMPMSession = /* GraphQL */ `
  subscription OnCreateCMPMSession(
    $filter: ModelSubscriptionCMPMSessionFilterInput
  ) {
    onCreateCMPMSession(filter: $filter) {
      startDate
      endDate
      deadline
      title
      id
      createdAt
      updatedAt
      certificateObjectSessionsId
      __typename
    }
  }
`;
export const onUpdateCMPMSession = /* GraphQL */ `
  subscription OnUpdateCMPMSession(
    $filter: ModelSubscriptionCMPMSessionFilterInput
  ) {
    onUpdateCMPMSession(filter: $filter) {
      startDate
      endDate
      deadline
      title
      id
      createdAt
      updatedAt
      certificateObjectSessionsId
      __typename
    }
  }
`;
export const onDeleteCMPMSession = /* GraphQL */ `
  subscription OnDeleteCMPMSession(
    $filter: ModelSubscriptionCMPMSessionFilterInput
  ) {
    onDeleteCMPMSession(filter: $filter) {
      startDate
      endDate
      deadline
      title
      id
      createdAt
      updatedAt
      certificateObjectSessionsId
      __typename
    }
  }
`;
export const onCreateCMPMForm = /* GraphQL */ `
  subscription OnCreateCMPMForm($filter: ModelSubscriptionCMPMFormFilterInput) {
    onCreateCMPMForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      moreAboutYou
      birthYear
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cMPMFormUserId
      __typename
    }
  }
`;
export const onUpdateCMPMForm = /* GraphQL */ `
  subscription OnUpdateCMPMForm($filter: ModelSubscriptionCMPMFormFilterInput) {
    onUpdateCMPMForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      moreAboutYou
      birthYear
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cMPMFormUserId
      __typename
    }
  }
`;
export const onDeleteCMPMForm = /* GraphQL */ `
  subscription OnDeleteCMPMForm($filter: ModelSubscriptionCMPMFormFilterInput) {
    onDeleteCMPMForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      moreAboutYou
      birthYear
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cMPMFormUserId
      __typename
    }
  }
`;
export const onCreateIcpfCmpmForm = /* GraphQL */ `
  subscription OnCreateIcpfCmpmForm(
    $filter: ModelSubscriptionIcpfCmpmFormFilterInput
  ) {
    onCreateIcpfCmpmForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      optOut
      birthYear
      paymentConfirmation
      contactConsent
      status
      videoLink
      createdOn
      updatedOn
      icpfCmpmFormUserId
      __typename
    }
  }
`;
export const onUpdateIcpfCmpmForm = /* GraphQL */ `
  subscription OnUpdateIcpfCmpmForm(
    $filter: ModelSubscriptionIcpfCmpmFormFilterInput
  ) {
    onUpdateIcpfCmpmForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      optOut
      birthYear
      paymentConfirmation
      contactConsent
      status
      videoLink
      createdOn
      updatedOn
      icpfCmpmFormUserId
      __typename
    }
  }
`;
export const onDeleteIcpfCmpmForm = /* GraphQL */ `
  subscription OnDeleteIcpfCmpmForm(
    $filter: ModelSubscriptionIcpfCmpmFormFilterInput
  ) {
    onDeleteIcpfCmpmForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cmpmGoals
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      optOut
      birthYear
      paymentConfirmation
      contactConsent
      status
      videoLink
      createdOn
      updatedOn
      icpfCmpmFormUserId
      __typename
    }
  }
`;
export const onCreatePgsfForm = /* GraphQL */ `
  subscription OnCreatePgsfForm($filter: ModelSubscriptionPgsfFormFilterInput) {
    onCreatePgsfForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      certApplying
      r2rconsent
      referral
      payment
      yearGoals
      careerGoals
      openToInternships
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      whyinterested
      optOut
      birthYear
      paymentConfirmation
      impact
      status
      funding
      createdOn
      updatedOn
      pgsfFormUserId
      __typename
    }
  }
`;
export const onUpdatePgsfForm = /* GraphQL */ `
  subscription OnUpdatePgsfForm($filter: ModelSubscriptionPgsfFormFilterInput) {
    onUpdatePgsfForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      certApplying
      r2rconsent
      referral
      payment
      yearGoals
      careerGoals
      openToInternships
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      whyinterested
      optOut
      birthYear
      paymentConfirmation
      impact
      status
      funding
      createdOn
      updatedOn
      pgsfFormUserId
      __typename
    }
  }
`;
export const onDeletePgsfForm = /* GraphQL */ `
  subscription OnDeletePgsfForm($filter: ModelSubscriptionPgsfFormFilterInput) {
    onDeletePgsfForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      age
      phone
      streetAddress
      addressExtra
      city
      state
      country
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      certApplying
      r2rconsent
      referral
      payment
      yearGoals
      careerGoals
      openToInternships
      school
      schoolType
      studying
      credential
      credentialProgress
      credentialYear
      fullTime
      organizations
      transcript
      resume
      corrugatedImpact
      opportunities
      moreAboutYou
      whyinterested
      optOut
      birthYear
      paymentConfirmation
      impact
      status
      funding
      createdOn
      updatedOn
      pgsfFormUserId
      __typename
    }
  }
`;
export const onCreateCPSForm = /* GraphQL */ `
  subscription OnCreateCPSForm($filter: ModelSubscriptionCPSFormFilterInput) {
    onCreateCPSForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      birthYear
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cpsGoals
      paymentType
      moreAboutYou
      elective
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cPSFormUserId
      __typename
    }
  }
`;
export const onUpdateCPSForm = /* GraphQL */ `
  subscription OnUpdateCPSForm($filter: ModelSubscriptionCPSFormFilterInput) {
    onUpdateCPSForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      birthYear
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cpsGoals
      paymentType
      moreAboutYou
      elective
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cPSFormUserId
      __typename
    }
  }
`;
export const onDeleteCPSForm = /* GraphQL */ `
  subscription OnDeleteCPSForm($filter: ModelSubscriptionCPSFormFilterInput) {
    onDeleteCPSForm(filter: $filter) {
      id
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      firstName
      lastName
      email
      phone
      streetAddress
      addressExtra
      city
      state
      country
      birthYear
      companyName
      companyTitle
      linkedin
      background
      whyPackaging
      areaOfInterest
      sessionApplying
      referral
      payment
      yearGoals
      cpsGoals
      paymentType
      moreAboutYou
      elective
      optOut
      paymentConfirmation
      status
      createdOn
      updatedOn
      cPSFormUserId
      __typename
    }
  }
`;
export const onCreateAppStart = /* GraphQL */ `
  subscription OnCreateAppStart($filter: ModelSubscriptionAppStartFilterInput) {
    onCreateAppStart(filter: $filter) {
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onUpdateAppStart = /* GraphQL */ `
  subscription OnUpdateAppStart($filter: ModelSubscriptionAppStartFilterInput) {
    onUpdateAppStart(filter: $filter) {
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onDeleteAppStart = /* GraphQL */ `
  subscription OnDeleteAppStart($filter: ModelSubscriptionAppStartFilterInput) {
    onDeleteAppStart(filter: $filter) {
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onCreateApplicationStart = /* GraphQL */ `
  subscription OnCreateApplicationStart(
    $filter: ModelSubscriptionApplicationStartFilterInput
  ) {
    onCreateApplicationStart(filter: $filter) {
      id
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      updatedAt
      __typename
    }
  }
`;
export const onUpdateApplicationStart = /* GraphQL */ `
  subscription OnUpdateApplicationStart(
    $filter: ModelSubscriptionApplicationStartFilterInput
  ) {
    onUpdateApplicationStart(filter: $filter) {
      id
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      updatedAt
      __typename
    }
  }
`;
export const onDeleteApplicationStart = /* GraphQL */ `
  subscription OnDeleteApplicationStart(
    $filter: ModelSubscriptionApplicationStartFilterInput
  ) {
    onDeleteApplicationStart(filter: $filter) {
      id
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      updatedAt
      __typename
    }
  }
`;
export const onCreateCertAppStart = /* GraphQL */ `
  subscription OnCreateCertAppStart(
    $filter: ModelSubscriptionCertAppStartFilterInput
  ) {
    onCreateCertAppStart(filter: $filter) {
      id
      type
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      country
      ipAddress
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertAppStart = /* GraphQL */ `
  subscription OnUpdateCertAppStart(
    $filter: ModelSubscriptionCertAppStartFilterInput
  ) {
    onUpdateCertAppStart(filter: $filter) {
      id
      type
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      country
      ipAddress
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertAppStart = /* GraphQL */ `
  subscription OnDeleteCertAppStart(
    $filter: ModelSubscriptionCertAppStartFilterInput
  ) {
    onDeleteCertAppStart(filter: $filter) {
      id
      type
      createdAt
      firstName
      lastName
      email
      phone
      source
      sourceUrl
      country
      ipAddress
      updatedAt
      __typename
    }
  }
`;
export const onCreateLMSCollection = /* GraphQL */ `
  subscription OnCreateLMSCollection(
    $filter: ModelSubscriptionLMSCollectionFilterInput
  ) {
    onCreateLMSCollection(filter: $filter) {
      id
      description
      title
      subtitle
      instructor
      instructorImage
      instructorDescription
      instructorLink
      courses {
        nextToken
        __typename
      }
      hours
      price
      slug
      category
      collectionId
      lmsLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLMSCollection = /* GraphQL */ `
  subscription OnUpdateLMSCollection(
    $filter: ModelSubscriptionLMSCollectionFilterInput
  ) {
    onUpdateLMSCollection(filter: $filter) {
      id
      description
      title
      subtitle
      instructor
      instructorImage
      instructorDescription
      instructorLink
      courses {
        nextToken
        __typename
      }
      hours
      price
      slug
      category
      collectionId
      lmsLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLMSCollection = /* GraphQL */ `
  subscription OnDeleteLMSCollection(
    $filter: ModelSubscriptionLMSCollectionFilterInput
  ) {
    onDeleteLMSCollection(filter: $filter) {
      id
      description
      title
      subtitle
      instructor
      instructorImage
      instructorDescription
      instructorLink
      courses {
        nextToken
        __typename
      }
      hours
      price
      slug
      category
      collectionId
      lmsLink
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLMSCirriculum = /* GraphQL */ `
  subscription OnCreateLMSCirriculum(
    $filter: ModelSubscriptionLMSCirriculumFilterInput
  ) {
    onCreateLMSCirriculum(filter: $filter) {
      id
      shorthand
      title
      slug
      description
      Courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLMSCirriculum = /* GraphQL */ `
  subscription OnUpdateLMSCirriculum(
    $filter: ModelSubscriptionLMSCirriculumFilterInput
  ) {
    onUpdateLMSCirriculum(filter: $filter) {
      id
      shorthand
      title
      slug
      description
      Courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLMSCirriculum = /* GraphQL */ `
  subscription OnDeleteLMSCirriculum(
    $filter: ModelSubscriptionLMSCirriculumFilterInput
  ) {
    onDeleteLMSCirriculum(filter: $filter) {
      id
      shorthand
      title
      slug
      description
      Courses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLMSCourse = /* GraphQL */ `
  subscription OnCreateLMSCourse(
    $filter: ModelSubscriptionLMSCourseFilterInput
  ) {
    onCreateLMSCourse(filter: $filter) {
      id
      thinkificId
      learningPaths {
        nextToken
        __typename
      }
      courseId
      category
      categoryArray
      type
      cirriculum {
        nextToken
        __typename
      }
      lmsLessons {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      price
      hours
      lessons
      videos
      preview
      seoImage
      infoSheet
      title
      subheadline
      what_learned
      objectives
      link
      trial_link
      percentComplete
      slug
      collections {
        nextToken
        __typename
      }
      demo
      partOf
      altLink
      shortDescription
      subscriptionLink
      subscriptionPrice
      stripeLink
      callout
      achievements {
        nextToken
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      partner {
        nextToken
        __typename
      }
      libraries {
        nextToken
        __typename
      }
      glossaryTerms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customerLibaryClientCoursesId
      customerLibaryPschoolCoursesId
      __typename
    }
  }
`;
export const onUpdateLMSCourse = /* GraphQL */ `
  subscription OnUpdateLMSCourse(
    $filter: ModelSubscriptionLMSCourseFilterInput
  ) {
    onUpdateLMSCourse(filter: $filter) {
      id
      thinkificId
      learningPaths {
        nextToken
        __typename
      }
      courseId
      category
      categoryArray
      type
      cirriculum {
        nextToken
        __typename
      }
      lmsLessons {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      price
      hours
      lessons
      videos
      preview
      seoImage
      infoSheet
      title
      subheadline
      what_learned
      objectives
      link
      trial_link
      percentComplete
      slug
      collections {
        nextToken
        __typename
      }
      demo
      partOf
      altLink
      shortDescription
      subscriptionLink
      subscriptionPrice
      stripeLink
      callout
      achievements {
        nextToken
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      partner {
        nextToken
        __typename
      }
      libraries {
        nextToken
        __typename
      }
      glossaryTerms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customerLibaryClientCoursesId
      customerLibaryPschoolCoursesId
      __typename
    }
  }
`;
export const onDeleteLMSCourse = /* GraphQL */ `
  subscription OnDeleteLMSCourse(
    $filter: ModelSubscriptionLMSCourseFilterInput
  ) {
    onDeleteLMSCourse(filter: $filter) {
      id
      thinkificId
      learningPaths {
        nextToken
        __typename
      }
      courseId
      category
      categoryArray
      type
      cirriculum {
        nextToken
        __typename
      }
      lmsLessons {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      price
      hours
      lessons
      videos
      preview
      seoImage
      infoSheet
      title
      subheadline
      what_learned
      objectives
      link
      trial_link
      percentComplete
      slug
      collections {
        nextToken
        __typename
      }
      demo
      partOf
      altLink
      shortDescription
      subscriptionLink
      subscriptionPrice
      stripeLink
      callout
      achievements {
        nextToken
        __typename
      }
      wishlist {
        nextToken
        __typename
      }
      reviews {
        nextToken
        __typename
      }
      partner {
        nextToken
        __typename
      }
      libraries {
        nextToken
        __typename
      }
      glossaryTerms {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customerLibaryClientCoursesId
      customerLibaryPschoolCoursesId
      __typename
    }
  }
`;
export const onCreateLMSLesson = /* GraphQL */ `
  subscription OnCreateLMSLesson(
    $filter: ModelSubscriptionLMSLessonFilterInput
  ) {
    onCreateLMSLesson(filter: $filter) {
      id
      title
      course {
        nextToken
        __typename
      }
      modules {
        nextToken
        __typename
      }
      subheadline
      objectives
      media
      percentComplete
      content
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLMSLesson = /* GraphQL */ `
  subscription OnUpdateLMSLesson(
    $filter: ModelSubscriptionLMSLessonFilterInput
  ) {
    onUpdateLMSLesson(filter: $filter) {
      id
      title
      course {
        nextToken
        __typename
      }
      modules {
        nextToken
        __typename
      }
      subheadline
      objectives
      media
      percentComplete
      content
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLMSLesson = /* GraphQL */ `
  subscription OnDeleteLMSLesson(
    $filter: ModelSubscriptionLMSLessonFilterInput
  ) {
    onDeleteLMSLesson(filter: $filter) {
      id
      title
      course {
        nextToken
        __typename
      }
      modules {
        nextToken
        __typename
      }
      subheadline
      objectives
      media
      percentComplete
      content
      slug
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLMSModule = /* GraphQL */ `
  subscription OnCreateLMSModule(
    $filter: ModelSubscriptionLMSModuleFilterInput
  ) {
    onCreateLMSModule(filter: $filter) {
      id
      title
      lesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      subheadline
      objectives
      mediaType
      slides {
        nextToken
        __typename
      }
      media
      quiz {
        id
        prompt
        answer1
        answer2
        answer3
        answer4
        correctAnswer
        createdAt
        updatedAt
        lMSQuizModuleId
        __typename
      }
      content
      slug
      createdAt
      updatedAt
      lMSLessonModulesId
      lMSModuleQuizId
      __typename
    }
  }
`;
export const onUpdateLMSModule = /* GraphQL */ `
  subscription OnUpdateLMSModule(
    $filter: ModelSubscriptionLMSModuleFilterInput
  ) {
    onUpdateLMSModule(filter: $filter) {
      id
      title
      lesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      subheadline
      objectives
      mediaType
      slides {
        nextToken
        __typename
      }
      media
      quiz {
        id
        prompt
        answer1
        answer2
        answer3
        answer4
        correctAnswer
        createdAt
        updatedAt
        lMSQuizModuleId
        __typename
      }
      content
      slug
      createdAt
      updatedAt
      lMSLessonModulesId
      lMSModuleQuizId
      __typename
    }
  }
`;
export const onDeleteLMSModule = /* GraphQL */ `
  subscription OnDeleteLMSModule(
    $filter: ModelSubscriptionLMSModuleFilterInput
  ) {
    onDeleteLMSModule(filter: $filter) {
      id
      title
      lesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      subheadline
      objectives
      mediaType
      slides {
        nextToken
        __typename
      }
      media
      quiz {
        id
        prompt
        answer1
        answer2
        answer3
        answer4
        correctAnswer
        createdAt
        updatedAt
        lMSQuizModuleId
        __typename
      }
      content
      slug
      createdAt
      updatedAt
      lMSLessonModulesId
      lMSModuleQuizId
      __typename
    }
  }
`;
export const onCreateLMSQuiz = /* GraphQL */ `
  subscription OnCreateLMSQuiz($filter: ModelSubscriptionLMSQuizFilterInput) {
    onCreateLMSQuiz(filter: $filter) {
      id
      module {
        id
        title
        subheadline
        objectives
        mediaType
        media
        content
        slug
        createdAt
        updatedAt
        lMSLessonModulesId
        lMSModuleQuizId
        __typename
      }
      prompt
      answer1
      answer2
      answer3
      answer4
      correctAnswer
      createdAt
      updatedAt
      lMSQuizModuleId
      __typename
    }
  }
`;
export const onUpdateLMSQuiz = /* GraphQL */ `
  subscription OnUpdateLMSQuiz($filter: ModelSubscriptionLMSQuizFilterInput) {
    onUpdateLMSQuiz(filter: $filter) {
      id
      module {
        id
        title
        subheadline
        objectives
        mediaType
        media
        content
        slug
        createdAt
        updatedAt
        lMSLessonModulesId
        lMSModuleQuizId
        __typename
      }
      prompt
      answer1
      answer2
      answer3
      answer4
      correctAnswer
      createdAt
      updatedAt
      lMSQuizModuleId
      __typename
    }
  }
`;
export const onDeleteLMSQuiz = /* GraphQL */ `
  subscription OnDeleteLMSQuiz($filter: ModelSubscriptionLMSQuizFilterInput) {
    onDeleteLMSQuiz(filter: $filter) {
      id
      module {
        id
        title
        subheadline
        objectives
        mediaType
        media
        content
        slug
        createdAt
        updatedAt
        lMSLessonModulesId
        lMSModuleQuizId
        __typename
      }
      prompt
      answer1
      answer2
      answer3
      answer4
      correctAnswer
      createdAt
      updatedAt
      lMSQuizModuleId
      __typename
    }
  }
`;
export const onCreateInstructor = /* GraphQL */ `
  subscription OnCreateInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
  ) {
    onCreateInstructor(filter: $filter) {
      id
      userId
      name
      image
      bio
      linkedIn
      company
      title
      coursesTaught {
        nextToken
        __typename
      }
      cohorts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateInstructor = /* GraphQL */ `
  subscription OnUpdateInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
  ) {
    onUpdateInstructor(filter: $filter) {
      id
      userId
      name
      image
      bio
      linkedIn
      company
      title
      coursesTaught {
        nextToken
        __typename
      }
      cohorts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteInstructor = /* GraphQL */ `
  subscription OnDeleteInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
  ) {
    onDeleteInstructor(filter: $filter) {
      id
      userId
      name
      image
      bio
      linkedIn
      company
      title
      coursesTaught {
        nextToken
        __typename
      }
      cohorts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateObjective = /* GraphQL */ `
  subscription OnCreateObjective(
    $filter: ModelSubscriptionObjectiveFilterInput
  ) {
    onCreateObjective(filter: $filter) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateObjective = /* GraphQL */ `
  subscription OnUpdateObjective(
    $filter: ModelSubscriptionObjectiveFilterInput
  ) {
    onUpdateObjective(filter: $filter) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteObjective = /* GraphQL */ `
  subscription OnDeleteObjective(
    $filter: ModelSubscriptionObjectiveFilterInput
  ) {
    onDeleteObjective(filter: $filter) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSlide = /* GraphQL */ `
  subscription OnCreateSlide($filter: ModelSubscriptionSlideFilterInput) {
    onCreateSlide(filter: $filter) {
      id
      slideSource
      description
      createdAt
      updatedAt
      lMSModuleSlidesId
      __typename
    }
  }
`;
export const onUpdateSlide = /* GraphQL */ `
  subscription OnUpdateSlide($filter: ModelSubscriptionSlideFilterInput) {
    onUpdateSlide(filter: $filter) {
      id
      slideSource
      description
      createdAt
      updatedAt
      lMSModuleSlidesId
      __typename
    }
  }
`;
export const onDeleteSlide = /* GraphQL */ `
  subscription OnDeleteSlide($filter: ModelSubscriptionSlideFilterInput) {
    onDeleteSlide(filter: $filter) {
      id
      slideSource
      description
      createdAt
      updatedAt
      lMSModuleSlidesId
      __typename
    }
  }
`;
export const onCreateTimestamp = /* GraphQL */ `
  subscription OnCreateTimestamp(
    $filter: ModelSubscriptionTimestampFilterInput
  ) {
    onCreateTimestamp(filter: $filter) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTimestamp = /* GraphQL */ `
  subscription OnUpdateTimestamp(
    $filter: ModelSubscriptionTimestampFilterInput
  ) {
    onUpdateTimestamp(filter: $filter) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTimestamp = /* GraphQL */ `
  subscription OnDeleteTimestamp(
    $filter: ModelSubscriptionTimestampFilterInput
  ) {
    onDeleteTimestamp(filter: $filter) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onCreateStaff(filter: $filter) {
      id
      fullName
      title
      image
      linkedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onUpdateStaff(filter: $filter) {
      id
      fullName
      title
      image
      linkedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff($filter: ModelSubscriptionStaffFilterInput) {
    onDeleteStaff(filter: $filter) {
      id
      fullName
      title
      image
      linkedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTrackedCourse = /* GraphQL */ `
  subscription OnCreateTrackedCourse(
    $filter: ModelSubscriptionTrackedCourseFilterInput
  ) {
    onCreateTrackedCourse(filter: $filter) {
      id
      courseId
      clicks
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTrackedCourse = /* GraphQL */ `
  subscription OnUpdateTrackedCourse(
    $filter: ModelSubscriptionTrackedCourseFilterInput
  ) {
    onUpdateTrackedCourse(filter: $filter) {
      id
      courseId
      clicks
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTrackedCourse = /* GraphQL */ `
  subscription OnDeleteTrackedCourse(
    $filter: ModelSubscriptionTrackedCourseFilterInput
  ) {
    onDeleteTrackedCourse(filter: $filter) {
      id
      courseId
      clicks
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIncludedCourse = /* GraphQL */ `
  subscription OnCreateIncludedCourse(
    $filter: ModelSubscriptionIncludedCourseFilterInput
  ) {
    onCreateIncludedCourse(filter: $filter) {
      id
      courseId
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIncludedCourse = /* GraphQL */ `
  subscription OnUpdateIncludedCourse(
    $filter: ModelSubscriptionIncludedCourseFilterInput
  ) {
    onUpdateIncludedCourse(filter: $filter) {
      id
      courseId
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIncludedCourse = /* GraphQL */ `
  subscription OnDeleteIncludedCourse(
    $filter: ModelSubscriptionIncludedCourseFilterInput
  ) {
    onDeleteIncludedCourse(filter: $filter) {
      id
      courseId
      customer {
        id
        displayName
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        offered
        offerings
        status
        createdAt
        updatedAt
        __typename
      }
      customerId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
      id
      displayName
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      offered
      pscourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      offerings
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
      id
      displayName
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      offered
      pscourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      offerings
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
      id
      displayName
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      offered
      pscourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      offerings
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCustomerLibary = /* GraphQL */ `
  subscription OnCreateCustomerLibary(
    $filter: ModelSubscriptionCustomerLibaryFilterInput
  ) {
    onCreateCustomerLibary(filter: $filter) {
      id
      displayName
      slug
      description
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      clientCourses {
        nextToken
        __typename
      }
      pschoolCourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      addOns
      backgroundImage
      code
      status
      availableCodes
      usedCodes
      promotionId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCustomerLibary = /* GraphQL */ `
  subscription OnUpdateCustomerLibary(
    $filter: ModelSubscriptionCustomerLibaryFilterInput
  ) {
    onUpdateCustomerLibary(filter: $filter) {
      id
      displayName
      slug
      description
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      clientCourses {
        nextToken
        __typename
      }
      pschoolCourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      addOns
      backgroundImage
      code
      status
      availableCodes
      usedCodes
      promotionId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCustomerLibary = /* GraphQL */ `
  subscription OnDeleteCustomerLibary(
    $filter: ModelSubscriptionCustomerLibaryFilterInput
  ) {
    onDeleteCustomerLibary(filter: $filter) {
      id
      displayName
      slug
      description
      link
      logo
      email
      primaryColor
      highlightColor
      pdf
      slide
      video
      clientCourses {
        nextToken
        __typename
      }
      pschoolCourses {
        nextToken
        __typename
      }
      courses {
        nextToken
        __typename
      }
      addOns
      backgroundImage
      code
      status
      availableCodes
      usedCodes
      promotionId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSalesBar = /* GraphQL */ `
  subscription OnCreateSalesBar($filter: ModelSubscriptionSalesBarFilterInput) {
    onCreateSalesBar(filter: $filter) {
      id
      text
      link
      icon
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSalesBar = /* GraphQL */ `
  subscription OnUpdateSalesBar($filter: ModelSubscriptionSalesBarFilterInput) {
    onUpdateSalesBar(filter: $filter) {
      id
      text
      link
      icon
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSalesBar = /* GraphQL */ `
  subscription OnDeleteSalesBar($filter: ModelSubscriptionSalesBarFilterInput) {
    onDeleteSalesBar(filter: $filter) {
      id
      text
      link
      icon
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTestimonial = /* GraphQL */ `
  subscription OnCreateTestimonial(
    $filter: ModelSubscriptionTestimonialFilterInput
  ) {
    onCreateTestimonial(filter: $filter) {
      id
      content
      author
      company
      affiliation
      title
      tags
      linkedin
      headshot
      featured
      date
      video
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTestimonial = /* GraphQL */ `
  subscription OnUpdateTestimonial(
    $filter: ModelSubscriptionTestimonialFilterInput
  ) {
    onUpdateTestimonial(filter: $filter) {
      id
      content
      author
      company
      affiliation
      title
      tags
      linkedin
      headshot
      featured
      date
      video
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTestimonial = /* GraphQL */ `
  subscription OnDeleteTestimonial(
    $filter: ModelSubscriptionTestimonialFilterInput
  ) {
    onDeleteTestimonial(filter: $filter) {
      id
      content
      author
      company
      affiliation
      title
      tags
      linkedin
      headshot
      featured
      date
      video
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWorkshopForm = /* GraphQL */ `
  subscription OnCreateWorkshopForm(
    $filter: ModelSubscriptionWorkshopFormFilterInput
  ) {
    onCreateWorkshopForm(filter: $filter) {
      firstName
      lastName
      email
      phone
      companyName
      eventDate
      audienceSize
      eventLocation
      eventDescription
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onUpdateWorkshopForm = /* GraphQL */ `
  subscription OnUpdateWorkshopForm(
    $filter: ModelSubscriptionWorkshopFormFilterInput
  ) {
    onUpdateWorkshopForm(filter: $filter) {
      firstName
      lastName
      email
      phone
      companyName
      eventDate
      audienceSize
      eventLocation
      eventDescription
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onDeleteWorkshopForm = /* GraphQL */ `
  subscription OnDeleteWorkshopForm(
    $filter: ModelSubscriptionWorkshopFormFilterInput
  ) {
    onDeleteWorkshopForm(filter: $filter) {
      firstName
      lastName
      email
      phone
      companyName
      eventDate
      audienceSize
      eventLocation
      eventDescription
      id
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onCreateCourseClick = /* GraphQL */ `
  subscription OnCreateCourseClick(
    $filter: ModelSubscriptionCourseClickFilterInput
  ) {
    onCreateCourseClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseClick = /* GraphQL */ `
  subscription OnUpdateCourseClick(
    $filter: ModelSubscriptionCourseClickFilterInput
  ) {
    onUpdateCourseClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseClick = /* GraphQL */ `
  subscription OnDeleteCourseClick(
    $filter: ModelSubscriptionCourseClickFilterInput
  ) {
    onDeleteCourseClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSalesbarClick = /* GraphQL */ `
  subscription OnCreateSalesbarClick(
    $filter: ModelSubscriptionSalesbarClickFilterInput
  ) {
    onCreateSalesbarClick(filter: $filter) {
      id
      page
      ipAddress
      country
      link
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSalesbarClick = /* GraphQL */ `
  subscription OnUpdateSalesbarClick(
    $filter: ModelSubscriptionSalesbarClickFilterInput
  ) {
    onUpdateSalesbarClick(filter: $filter) {
      id
      page
      ipAddress
      country
      link
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSalesbarClick = /* GraphQL */ `
  subscription OnDeleteSalesbarClick(
    $filter: ModelSubscriptionSalesbarClickFilterInput
  ) {
    onDeleteSalesbarClick(filter: $filter) {
      id
      page
      ipAddress
      country
      link
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLessonClick = /* GraphQL */ `
  subscription OnCreateLessonClick(
    $filter: ModelSubscriptionLessonClickFilterInput
  ) {
    onCreateLessonClick(filter: $filter) {
      id
      LessonID
      page
      ipAddress
      country
      lat
      long
      referrer
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLessonClick = /* GraphQL */ `
  subscription OnUpdateLessonClick(
    $filter: ModelSubscriptionLessonClickFilterInput
  ) {
    onUpdateLessonClick(filter: $filter) {
      id
      LessonID
      page
      ipAddress
      country
      lat
      long
      referrer
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLessonClick = /* GraphQL */ `
  subscription OnDeleteLessonClick(
    $filter: ModelSubscriptionLessonClickFilterInput
  ) {
    onDeleteLessonClick(filter: $filter) {
      id
      LessonID
      page
      ipAddress
      country
      lat
      long
      referrer
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourseSearch = /* GraphQL */ `
  subscription OnCreateCourseSearch(
    $filter: ModelSubscriptionCourseSearchFilterInput
  ) {
    onCreateCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseSearch = /* GraphQL */ `
  subscription OnUpdateCourseSearch(
    $filter: ModelSubscriptionCourseSearchFilterInput
  ) {
    onUpdateCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseSearch = /* GraphQL */ `
  subscription OnDeleteCourseSearch(
    $filter: ModelSubscriptionCourseSearchFilterInput
  ) {
    onDeleteCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCyberMondayClick = /* GraphQL */ `
  subscription OnCreateCyberMondayClick(
    $filter: ModelSubscriptionCyberMondayClickFilterInput
  ) {
    onCreateCyberMondayClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCyberMondayClick = /* GraphQL */ `
  subscription OnUpdateCyberMondayClick(
    $filter: ModelSubscriptionCyberMondayClickFilterInput
  ) {
    onUpdateCyberMondayClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCyberMondayClick = /* GraphQL */ `
  subscription OnDeleteCyberMondayClick(
    $filter: ModelSubscriptionCyberMondayClickFilterInput
  ) {
    onDeleteCyberMondayClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAPSPresentationClick = /* GraphQL */ `
  subscription OnCreateAPSPresentationClick(
    $filter: ModelSubscriptionAPSPresentationClickFilterInput
  ) {
    onCreateAPSPresentationClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAPSPresentationClick = /* GraphQL */ `
  subscription OnUpdateAPSPresentationClick(
    $filter: ModelSubscriptionAPSPresentationClickFilterInput
  ) {
    onUpdateAPSPresentationClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAPSPresentationClick = /* GraphQL */ `
  subscription OnDeleteAPSPresentationClick(
    $filter: ModelSubscriptionAPSPresentationClickFilterInput
  ) {
    onDeleteAPSPresentationClick(filter: $filter) {
      id
      object
      ipAddress
      country
      device
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCategoryClick = /* GraphQL */ `
  subscription OnCreateCategoryClick(
    $filter: ModelSubscriptionCategoryClickFilterInput
  ) {
    onCreateCategoryClick(filter: $filter) {
      id
      category
      ipAddress
      country
      device
      email
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCategoryClick = /* GraphQL */ `
  subscription OnUpdateCategoryClick(
    $filter: ModelSubscriptionCategoryClickFilterInput
  ) {
    onUpdateCategoryClick(filter: $filter) {
      id
      category
      ipAddress
      country
      device
      email
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCategoryClick = /* GraphQL */ `
  subscription OnDeleteCategoryClick(
    $filter: ModelSubscriptionCategoryClickFilterInput
  ) {
    onDeleteCategoryClick(filter: $filter) {
      id
      category
      ipAddress
      country
      device
      email
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateClick = /* GraphQL */ `
  subscription OnCreateClick($filter: ModelSubscriptionClickFilterInput) {
    onCreateClick(filter: $filter) {
      id
      ref
      path
      type
      identifier
      nextPath
      ipAddress
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateClick = /* GraphQL */ `
  subscription OnUpdateClick($filter: ModelSubscriptionClickFilterInput) {
    onUpdateClick(filter: $filter) {
      id
      ref
      path
      type
      identifier
      nextPath
      ipAddress
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteClick = /* GraphQL */ `
  subscription OnDeleteClick($filter: ModelSubscriptionClickFilterInput) {
    onDeleteClick(filter: $filter) {
      id
      ref
      path
      type
      identifier
      nextPath
      ipAddress
      location
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndiaClick = /* GraphQL */ `
  subscription OnCreateIndiaClick(
    $filter: ModelSubscriptionIndiaClickFilterInput
  ) {
    onCreateIndiaClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndiaClick = /* GraphQL */ `
  subscription OnUpdateIndiaClick(
    $filter: ModelSubscriptionIndiaClickFilterInput
  ) {
    onUpdateIndiaClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndiaClick = /* GraphQL */ `
  subscription OnDeleteIndiaClick(
    $filter: ModelSubscriptionIndiaClickFilterInput
  ) {
    onDeleteIndiaClick(filter: $filter) {
      id
      courseID
      page
      ipAddress
      country
      lat
      long
      referrer
      nextPath
      format
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndiaCourseSearch = /* GraphQL */ `
  subscription OnCreateIndiaCourseSearch(
    $filter: ModelSubscriptionIndiaCourseSearchFilterInput
  ) {
    onCreateIndiaCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndiaCourseSearch = /* GraphQL */ `
  subscription OnUpdateIndiaCourseSearch(
    $filter: ModelSubscriptionIndiaCourseSearchFilterInput
  ) {
    onUpdateIndiaCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndiaCourseSearch = /* GraphQL */ `
  subscription OnDeleteIndiaCourseSearch(
    $filter: ModelSubscriptionIndiaCourseSearchFilterInput
  ) {
    onDeleteIndiaCourseSearch(filter: $filter) {
      id
      term
      ipAddress
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndexTemplate = /* GraphQL */ `
  subscription OnCreateIndexTemplate(
    $filter: ModelSubscriptionIndexTemplateFilterInput
  ) {
    onCreateIndexTemplate(filter: $filter) {
      id
      slug
      title
      subhead
      authors {
        nextToken
        __typename
      }
      rows {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndexTemplate = /* GraphQL */ `
  subscription OnUpdateIndexTemplate(
    $filter: ModelSubscriptionIndexTemplateFilterInput
  ) {
    onUpdateIndexTemplate(filter: $filter) {
      id
      slug
      title
      subhead
      authors {
        nextToken
        __typename
      }
      rows {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndexTemplate = /* GraphQL */ `
  subscription OnDeleteIndexTemplate(
    $filter: ModelSubscriptionIndexTemplateFilterInput
  ) {
    onDeleteIndexTemplate(filter: $filter) {
      id
      slug
      title
      subhead
      authors {
        nextToken
        __typename
      }
      rows {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndexRow = /* GraphQL */ `
  subscription OnCreateIndexRow($filter: ModelSubscriptionIndexRowFilterInput) {
    onCreateIndexRow(filter: $filter) {
      id
      headline
      subhead
      type
      content
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndexRow = /* GraphQL */ `
  subscription OnUpdateIndexRow($filter: ModelSubscriptionIndexRowFilterInput) {
    onUpdateIndexRow(filter: $filter) {
      id
      headline
      subhead
      type
      content
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndexRow = /* GraphQL */ `
  subscription OnDeleteIndexRow($filter: ModelSubscriptionIndexRowFilterInput) {
    onDeleteIndexRow(filter: $filter) {
      id
      headline
      subhead
      type
      content
      templates {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndexPage = /* GraphQL */ `
  subscription OnCreateIndexPage(
    $filter: ModelSubscriptionIndexPageFilterInput
  ) {
    onCreateIndexPage(filter: $filter) {
      id
      content
      contentStorage
      contentKey
      contentBytes
      seoImage
      slug
      discount
      status
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndexPage = /* GraphQL */ `
  subscription OnUpdateIndexPage(
    $filter: ModelSubscriptionIndexPageFilterInput
  ) {
    onUpdateIndexPage(filter: $filter) {
      id
      content
      contentStorage
      contentKey
      contentBytes
      seoImage
      slug
      discount
      status
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndexPage = /* GraphQL */ `
  subscription OnDeleteIndexPage(
    $filter: ModelSubscriptionIndexPageFilterInput
  ) {
    onDeleteIndexPage(filter: $filter) {
      id
      content
      contentStorage
      contentKey
      contentBytes
      seoImage
      slug
      discount
      status
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateFaq = /* GraphQL */ `
  subscription OnCreateFaq($filter: ModelSubscriptionFaqFilterInput) {
    onCreateFaq(filter: $filter) {
      id
      question
      answer
      type
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFaq = /* GraphQL */ `
  subscription OnUpdateFaq($filter: ModelSubscriptionFaqFilterInput) {
    onUpdateFaq(filter: $filter) {
      id
      question
      answer
      type
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFaq = /* GraphQL */ `
  subscription OnDeleteFaq($filter: ModelSubscriptionFaqFilterInput) {
    onDeleteFaq(filter: $filter) {
      id
      question
      answer
      type
      order
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateGlossaryTerm = /* GraphQL */ `
  subscription OnCreateGlossaryTerm(
    $filter: ModelSubscriptionGlossaryTermFilterInput
  ) {
    onCreateGlossaryTerm(filter: $filter) {
      id
      term
      letter
      definition
      order
      status
      difficulty
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      rand
      gameDefinition
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateGlossaryTerm = /* GraphQL */ `
  subscription OnUpdateGlossaryTerm(
    $filter: ModelSubscriptionGlossaryTermFilterInput
  ) {
    onUpdateGlossaryTerm(filter: $filter) {
      id
      term
      letter
      definition
      order
      status
      difficulty
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      rand
      gameDefinition
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteGlossaryTerm = /* GraphQL */ `
  subscription OnDeleteGlossaryTerm(
    $filter: ModelSubscriptionGlossaryTermFilterInput
  ) {
    onDeleteGlossaryTerm(filter: $filter) {
      id
      term
      letter
      definition
      order
      status
      difficulty
      courses {
        nextToken
        __typename
      }
      lessons {
        nextToken
        __typename
      }
      rand
      gameDefinition
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEventTemplate = /* GraphQL */ `
  subscription OnCreateEventTemplate(
    $filter: ModelSubscriptionEventTemplateFilterInput
  ) {
    onCreateEventTemplate(filter: $filter) {
      id
      title
      startDate
      endDate
      description
      location
      hero
      link
      photos {
        nextToken
        __typename
      }
      presentations {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      speakers {
        nextToken
        __typename
      }
      slug
      logo
      clicks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateAgendaId
      __typename
    }
  }
`;
export const onUpdateEventTemplate = /* GraphQL */ `
  subscription OnUpdateEventTemplate(
    $filter: ModelSubscriptionEventTemplateFilterInput
  ) {
    onUpdateEventTemplate(filter: $filter) {
      id
      title
      startDate
      endDate
      description
      location
      hero
      link
      photos {
        nextToken
        __typename
      }
      presentations {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      speakers {
        nextToken
        __typename
      }
      slug
      logo
      clicks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateAgendaId
      __typename
    }
  }
`;
export const onDeleteEventTemplate = /* GraphQL */ `
  subscription OnDeleteEventTemplate(
    $filter: ModelSubscriptionEventTemplateFilterInput
  ) {
    onDeleteEventTemplate(filter: $filter) {
      id
      title
      startDate
      endDate
      description
      location
      hero
      link
      photos {
        nextToken
        __typename
      }
      presentations {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      speakers {
        nextToken
        __typename
      }
      slug
      logo
      clicks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateAgendaId
      __typename
    }
  }
`;
export const onCreateEventPhoto = /* GraphQL */ `
  subscription OnCreateEventPhoto(
    $filter: ModelSubscriptionEventPhotoFilterInput
  ) {
    onCreateEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      order
      createdAt
      updatedAt
      eventTemplatePhotosId
      __typename
    }
  }
`;
export const onUpdateEventPhoto = /* GraphQL */ `
  subscription OnUpdateEventPhoto(
    $filter: ModelSubscriptionEventPhotoFilterInput
  ) {
    onUpdateEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      order
      createdAt
      updatedAt
      eventTemplatePhotosId
      __typename
    }
  }
`;
export const onDeleteEventPhoto = /* GraphQL */ `
  subscription OnDeleteEventPhoto(
    $filter: ModelSubscriptionEventPhotoFilterInput
  ) {
    onDeleteEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      order
      createdAt
      updatedAt
      eventTemplatePhotosId
      __typename
    }
  }
`;
export const onCreateUserEventPhoto = /* GraphQL */ `
  subscription OnCreateUserEventPhoto(
    $filter: ModelSubscriptionUserEventPhotoFilterInput
  ) {
    onCreateUserEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      eventID
      event
      approved
      approvedId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserEventPhoto = /* GraphQL */ `
  subscription OnUpdateUserEventPhoto(
    $filter: ModelSubscriptionUserEventPhotoFilterInput
  ) {
    onUpdateUserEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      eventID
      event
      approved
      approvedId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserEventPhoto = /* GraphQL */ `
  subscription OnDeleteUserEventPhoto(
    $filter: ModelSubscriptionUserEventPhotoFilterInput
  ) {
    onDeleteUserEventPhoto(filter: $filter) {
      id
      photo
      caption
      uploadedBy
      eventID
      event
      approved
      approvedId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEventPresentation = /* GraphQL */ `
  subscription OnCreateEventPresentation(
    $filter: ModelSubscriptionEventPresentationFilterInput
  ) {
    onCreateEventPresentation(filter: $filter) {
      id
      presentation
      hero
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventTemplatePresentationsId
      __typename
    }
  }
`;
export const onUpdateEventPresentation = /* GraphQL */ `
  subscription OnUpdateEventPresentation(
    $filter: ModelSubscriptionEventPresentationFilterInput
  ) {
    onUpdateEventPresentation(filter: $filter) {
      id
      presentation
      hero
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventTemplatePresentationsId
      __typename
    }
  }
`;
export const onDeleteEventPresentation = /* GraphQL */ `
  subscription OnDeleteEventPresentation(
    $filter: ModelSubscriptionEventPresentationFilterInput
  ) {
    onDeleteEventPresentation(filter: $filter) {
      id
      presentation
      hero
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventTemplatePresentationsId
      __typename
    }
  }
`;
export const onCreateEventAgenda = /* GraphQL */ `
  subscription OnCreateEventAgenda(
    $filter: ModelSubscriptionEventAgendaFilterInput
  ) {
    onCreateEventAgenda(filter: $filter) {
      id
      items {
        nextToken
        __typename
      }
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaEventId
      __typename
    }
  }
`;
export const onUpdateEventAgenda = /* GraphQL */ `
  subscription OnUpdateEventAgenda(
    $filter: ModelSubscriptionEventAgendaFilterInput
  ) {
    onUpdateEventAgenda(filter: $filter) {
      id
      items {
        nextToken
        __typename
      }
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaEventId
      __typename
    }
  }
`;
export const onDeleteEventAgenda = /* GraphQL */ `
  subscription OnDeleteEventAgenda(
    $filter: ModelSubscriptionEventAgendaFilterInput
  ) {
    onDeleteEventAgenda(filter: $filter) {
      id
      items {
        nextToken
        __typename
      }
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaEventId
      __typename
    }
  }
`;
export const onCreateEventAgendaItem = /* GraphQL */ `
  subscription OnCreateEventAgendaItem(
    $filter: ModelSubscriptionEventAgendaItemFilterInput
  ) {
    onCreateEventAgendaItem(filter: $filter) {
      id
      title
      description
      location
      type
      start
      end
      speakers {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaItemsId
      eventSpeakerAgendaItemsId
      __typename
    }
  }
`;
export const onUpdateEventAgendaItem = /* GraphQL */ `
  subscription OnUpdateEventAgendaItem(
    $filter: ModelSubscriptionEventAgendaItemFilterInput
  ) {
    onUpdateEventAgendaItem(filter: $filter) {
      id
      title
      description
      location
      type
      start
      end
      speakers {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaItemsId
      eventSpeakerAgendaItemsId
      __typename
    }
  }
`;
export const onDeleteEventAgendaItem = /* GraphQL */ `
  subscription OnDeleteEventAgendaItem(
    $filter: ModelSubscriptionEventAgendaItemFilterInput
  ) {
    onDeleteEventAgendaItem(filter: $filter) {
      id
      title
      description
      location
      type
      start
      end
      speakers {
        nextToken
        __typename
      }
      agenda {
        id
        createdAt
        updatedAt
        eventAgendaEventId
        __typename
      }
      createdAt
      updatedAt
      eventAgendaItemsId
      eventSpeakerAgendaItemsId
      __typename
    }
  }
`;
export const onCreateEventSpeaker = /* GraphQL */ `
  subscription OnCreateEventSpeaker(
    $filter: ModelSubscriptionEventSpeakerFilterInput
  ) {
    onCreateEventSpeaker(filter: $filter) {
      id
      name
      title
      company
      email
      image
      logo
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      agendaItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateSpeakersId
      eventAgendaItemSpeakersId
      __typename
    }
  }
`;
export const onUpdateEventSpeaker = /* GraphQL */ `
  subscription OnUpdateEventSpeaker(
    $filter: ModelSubscriptionEventSpeakerFilterInput
  ) {
    onUpdateEventSpeaker(filter: $filter) {
      id
      name
      title
      company
      email
      image
      logo
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      agendaItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateSpeakersId
      eventAgendaItemSpeakersId
      __typename
    }
  }
`;
export const onDeleteEventSpeaker = /* GraphQL */ `
  subscription OnDeleteEventSpeaker(
    $filter: ModelSubscriptionEventSpeakerFilterInput
  ) {
    onDeleteEventSpeaker(filter: $filter) {
      id
      name
      title
      company
      email
      image
      logo
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      agendaItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      eventTemplateSpeakersId
      eventAgendaItemSpeakersId
      __typename
    }
  }
`;
export const onCreateEventClick = /* GraphQL */ `
  subscription OnCreateEventClick(
    $filter: ModelSubscriptionEventClickFilterInput
  ) {
    onCreateEventClick(filter: $filter) {
      id
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      page
      ipAddress
      country
      email
      type
      object
      objectId
      createdAt
      updatedAt
      eventTemplateClicksId
      __typename
    }
  }
`;
export const onUpdateEventClick = /* GraphQL */ `
  subscription OnUpdateEventClick(
    $filter: ModelSubscriptionEventClickFilterInput
  ) {
    onUpdateEventClick(filter: $filter) {
      id
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      page
      ipAddress
      country
      email
      type
      object
      objectId
      createdAt
      updatedAt
      eventTemplateClicksId
      __typename
    }
  }
`;
export const onDeleteEventClick = /* GraphQL */ `
  subscription OnDeleteEventClick(
    $filter: ModelSubscriptionEventClickFilterInput
  ) {
    onDeleteEventClick(filter: $filter) {
      id
      event {
        id
        title
        startDate
        endDate
        description
        location
        hero
        link
        slug
        logo
        createdAt
        updatedAt
        eventTemplateAgendaId
        __typename
      }
      page
      ipAddress
      country
      email
      type
      object
      objectId
      createdAt
      updatedAt
      eventTemplateClicksId
      __typename
    }
  }
`;
export const onCreateCertificateClick = /* GraphQL */ `
  subscription OnCreateCertificateClick(
    $filter: ModelSubscriptionCertificateClickFilterInput
  ) {
    onCreateCertificateClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      object
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertificateClick = /* GraphQL */ `
  subscription OnUpdateCertificateClick(
    $filter: ModelSubscriptionCertificateClickFilterInput
  ) {
    onUpdateCertificateClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      object
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertificateClick = /* GraphQL */ `
  subscription OnDeleteCertificateClick(
    $filter: ModelSubscriptionCertificateClickFilterInput
  ) {
    onDeleteCertificateClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      object
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndexClick = /* GraphQL */ `
  subscription OnCreateIndexClick(
    $filter: ModelSubscriptionIndexClickFilterInput
  ) {
    onCreateIndexClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndexClick = /* GraphQL */ `
  subscription OnUpdateIndexClick(
    $filter: ModelSubscriptionIndexClickFilterInput
  ) {
    onUpdateIndexClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndexClick = /* GraphQL */ `
  subscription OnDeleteIndexClick(
    $filter: ModelSubscriptionIndexClickFilterInput
  ) {
    onDeleteIndexClick(filter: $filter) {
      id
      page
      ipAddress
      country
      type
      device
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEmailSubscription = /* GraphQL */ `
  subscription OnCreateEmailSubscription(
    $filter: ModelSubscriptionEmailSubscriptionFilterInput
  ) {
    onCreateEmailSubscription(filter: $filter) {
      id
      email
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEmailSubscription = /* GraphQL */ `
  subscription OnUpdateEmailSubscription(
    $filter: ModelSubscriptionEmailSubscriptionFilterInput
  ) {
    onUpdateEmailSubscription(filter: $filter) {
      id
      email
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEmailSubscription = /* GraphQL */ `
  subscription OnDeleteEmailSubscription(
    $filter: ModelSubscriptionEmailSubscriptionFilterInput
  ) {
    onDeleteEmailSubscription(filter: $filter) {
      id
      email
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateImageObject = /* GraphQL */ `
  subscription OnCreateImageObject(
    $filter: ModelSubscriptionImageObjectFilterInput
  ) {
    onCreateImageObject(filter: $filter) {
      id
      url
      caption
      uploadedBy
      alt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateImageObject = /* GraphQL */ `
  subscription OnUpdateImageObject(
    $filter: ModelSubscriptionImageObjectFilterInput
  ) {
    onUpdateImageObject(filter: $filter) {
      id
      url
      caption
      uploadedBy
      alt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteImageObject = /* GraphQL */ `
  subscription OnDeleteImageObject(
    $filter: ModelSubscriptionImageObjectFilterInput
  ) {
    onDeleteImageObject(filter: $filter) {
      id
      url
      caption
      uploadedBy
      alt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePurchase = /* GraphQL */ `
  subscription OnCreatePurchase($filter: ModelSubscriptionPurchaseFilterInput) {
    onCreatePurchase(filter: $filter) {
      id
      email
      name
      company
      title
      phone
      address
      zip
      state
      city
      country
      code
      status
      total
      subtotal
      shippingMethod
      shipping
      tax
      items
      paymentConfirmation
      paymentMethod
      paymentLast4
      printfulConfirmed
      printfulOrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePurchase = /* GraphQL */ `
  subscription OnUpdatePurchase($filter: ModelSubscriptionPurchaseFilterInput) {
    onUpdatePurchase(filter: $filter) {
      id
      email
      name
      company
      title
      phone
      address
      zip
      state
      city
      country
      code
      status
      total
      subtotal
      shippingMethod
      shipping
      tax
      items
      paymentConfirmation
      paymentMethod
      paymentLast4
      printfulConfirmed
      printfulOrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePurchase = /* GraphQL */ `
  subscription OnDeletePurchase($filter: ModelSubscriptionPurchaseFilterInput) {
    onDeletePurchase(filter: $filter) {
      id
      email
      name
      company
      title
      phone
      address
      zip
      state
      city
      country
      code
      status
      total
      subtotal
      shippingMethod
      shipping
      tax
      items
      paymentConfirmation
      paymentMethod
      paymentLast4
      printfulConfirmed
      printfulOrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAnalysis = /* GraphQL */ `
  subscription OnCreateAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onCreateAnalysis(filter: $filter) {
      id
      wordCount
      readingTime
      quizQuestion
      quizOptions
      quizCorrectAnswer
      lessonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAnalysis = /* GraphQL */ `
  subscription OnUpdateAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onUpdateAnalysis(filter: $filter) {
      id
      wordCount
      readingTime
      quizQuestion
      quizOptions
      quizCorrectAnswer
      lessonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAnalysis = /* GraphQL */ `
  subscription OnDeleteAnalysis($filter: ModelSubscriptionAnalysisFilterInput) {
    onDeleteAnalysis(filter: $filter) {
      id
      wordCount
      readingTime
      quizQuestion
      quizOptions
      quizCorrectAnswer
      lessonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAchievement = /* GraphQL */ `
  subscription OnCreateAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onCreateAchievement(filter: $filter) {
      id
      title
      description
      image
      courses {
        nextToken
        __typename
      }
      coursesRequired
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAchievement = /* GraphQL */ `
  subscription OnUpdateAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onUpdateAchievement(filter: $filter) {
      id
      title
      description
      image
      courses {
        nextToken
        __typename
      }
      coursesRequired
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAchievement = /* GraphQL */ `
  subscription OnDeleteAchievement(
    $filter: ModelSubscriptionAchievementFilterInput
  ) {
    onDeleteAchievement(filter: $filter) {
      id
      title
      description
      image
      courses {
        nextToken
        __typename
      }
      coursesRequired
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTest = /* GraphQL */ `
  subscription OnCreateTest($filter: ModelSubscriptionTestFilterInput) {
    onCreateTest(filter: $filter) {
      id
      name
      email
      totalTasks
      tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTest = /* GraphQL */ `
  subscription OnUpdateTest($filter: ModelSubscriptionTestFilterInput) {
    onUpdateTest(filter: $filter) {
      id
      name
      email
      totalTasks
      tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTest = /* GraphQL */ `
  subscription OnDeleteTest($filter: ModelSubscriptionTestFilterInput) {
    onDeleteTest(filter: $filter) {
      id
      name
      email
      totalTasks
      tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTestTask = /* GraphQL */ `
  subscription OnCreateTestTask($filter: ModelSubscriptionTestTaskFilterInput) {
    onCreateTestTask(filter: $filter) {
      id
      test {
        id
        name
        email
        totalTasks
        createdAt
        updatedAt
        __typename
      }
      task
      completed
      completedDate
      createdAt
      updatedAt
      testTasksId
      __typename
    }
  }
`;
export const onUpdateTestTask = /* GraphQL */ `
  subscription OnUpdateTestTask($filter: ModelSubscriptionTestTaskFilterInput) {
    onUpdateTestTask(filter: $filter) {
      id
      test {
        id
        name
        email
        totalTasks
        createdAt
        updatedAt
        __typename
      }
      task
      completed
      completedDate
      createdAt
      updatedAt
      testTasksId
      __typename
    }
  }
`;
export const onDeleteTestTask = /* GraphQL */ `
  subscription OnDeleteTestTask($filter: ModelSubscriptionTestTaskFilterInput) {
    onDeleteTestTask(filter: $filter) {
      id
      test {
        id
        name
        email
        totalTasks
        createdAt
        updatedAt
        __typename
      }
      task
      completed
      completedDate
      createdAt
      updatedAt
      testTasksId
      __typename
    }
  }
`;
export const onCreateCourseReview = /* GraphQL */ `
  subscription OnCreateCourseReview(
    $filter: ModelSubscriptionCourseReviewFilterInput
  ) {
    onCreateCourseReview(filter: $filter) {
      id
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      review
      rating
      createdAt
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      thinkificId
      updatedAt
      userReviewsId
      lMSCourseReviewsId
      __typename
    }
  }
`;
export const onUpdateCourseReview = /* GraphQL */ `
  subscription OnUpdateCourseReview(
    $filter: ModelSubscriptionCourseReviewFilterInput
  ) {
    onUpdateCourseReview(filter: $filter) {
      id
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      review
      rating
      createdAt
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      thinkificId
      updatedAt
      userReviewsId
      lMSCourseReviewsId
      __typename
    }
  }
`;
export const onDeleteCourseReview = /* GraphQL */ `
  subscription OnDeleteCourseReview(
    $filter: ModelSubscriptionCourseReviewFilterInput
  ) {
    onDeleteCourseReview(filter: $filter) {
      id
      course {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      review
      rating
      createdAt
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      thinkificId
      updatedAt
      userReviewsId
      lMSCourseReviewsId
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      email
      name
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      total
      status
      courseName
      courseLink
      courseImage
      courseDiscount
      courseDescription
      type
      paymentPlan
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      userOrdersId
      __typename
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      email
      name
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      total
      status
      courseName
      courseLink
      courseImage
      courseDiscount
      courseDescription
      type
      paymentPlan
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      userOrdersId
      __typename
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      email
      name
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      userID
      total
      status
      courseName
      courseLink
      courseImage
      courseDiscount
      courseDescription
      type
      paymentPlan
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      userOrdersId
      __typename
    }
  }
`;
export const onCreateSearchLog = /* GraphQL */ `
  subscription OnCreateSearchLog(
    $filter: ModelSubscriptionSearchLogFilterInput
  ) {
    onCreateSearchLog(filter: $filter) {
      id
      timestamp
      query
      results_count
      results {
        id
        score
        title
        link
        __typename
      }
      answer
      model
      collection
      response_time_ms
      user_rating
      rating_comment
      rating_timestamp
      helpful
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSearchLog = /* GraphQL */ `
  subscription OnUpdateSearchLog(
    $filter: ModelSubscriptionSearchLogFilterInput
  ) {
    onUpdateSearchLog(filter: $filter) {
      id
      timestamp
      query
      results_count
      results {
        id
        score
        title
        link
        __typename
      }
      answer
      model
      collection
      response_time_ms
      user_rating
      rating_comment
      rating_timestamp
      helpful
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSearchLog = /* GraphQL */ `
  subscription OnDeleteSearchLog(
    $filter: ModelSubscriptionSearchLogFilterInput
  ) {
    onDeleteSearchLog(filter: $filter) {
      id
      timestamp
      query
      results_count
      results {
        id
        score
        title
        link
        __typename
      }
      answer
      model
      collection
      response_time_ms
      user_rating
      rating_comment
      rating_timestamp
      helpful
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePartner = /* GraphQL */ `
  subscription OnCreatePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onCreatePartner(filter: $filter) {
      id
      name
      image
      link
      courses {
        nextToken
        __typename
      }
      admins {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePartner = /* GraphQL */ `
  subscription OnUpdatePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onUpdatePartner(filter: $filter) {
      id
      name
      image
      link
      courses {
        nextToken
        __typename
      }
      admins {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePartner = /* GraphQL */ `
  subscription OnDeletePartner($filter: ModelSubscriptionPartnerFilterInput) {
    onDeletePartner(filter: $filter) {
      id
      name
      image
      link
      courses {
        nextToken
        __typename
      }
      admins {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePartnerAdmin = /* GraphQL */ `
  subscription OnCreatePartnerAdmin(
    $filter: ModelSubscriptionPartnerAdminFilterInput
  ) {
    onCreatePartnerAdmin(filter: $filter) {
      id
      name
      email
      password
      partner {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePartnerAdmin = /* GraphQL */ `
  subscription OnUpdatePartnerAdmin(
    $filter: ModelSubscriptionPartnerAdminFilterInput
  ) {
    onUpdatePartnerAdmin(filter: $filter) {
      id
      name
      email
      password
      partner {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePartnerAdmin = /* GraphQL */ `
  subscription OnDeletePartnerAdmin(
    $filter: ModelSubscriptionPartnerAdminFilterInput
  ) {
    onDeletePartnerAdmin(filter: $filter) {
      id
      name
      email
      password
      partner {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLibrarySurvey = /* GraphQL */ `
  subscription OnCreateLibrarySurvey(
    $filter: ModelSubscriptionLibrarySurveyFilterInput
  ) {
    onCreateLibrarySurvey(filter: $filter) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLibrarySurvey = /* GraphQL */ `
  subscription OnUpdateLibrarySurvey(
    $filter: ModelSubscriptionLibrarySurveyFilterInput
  ) {
    onUpdateLibrarySurvey(filter: $filter) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLibrarySurvey = /* GraphQL */ `
  subscription OnDeleteLibrarySurvey(
    $filter: ModelSubscriptionLibrarySurveyFilterInput
  ) {
    onDeleteLibrarySurvey(filter: $filter) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCyberMondayCode = /* GraphQL */ `
  subscription OnCreateCyberMondayCode(
    $filter: ModelSubscriptionCyberMondayCodeFilterInput
  ) {
    onCreateCyberMondayCode(filter: $filter) {
      id
      code
      usedBy
      dayValid
      dayUsed
      isUsed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCyberMondayCode = /* GraphQL */ `
  subscription OnUpdateCyberMondayCode(
    $filter: ModelSubscriptionCyberMondayCodeFilterInput
  ) {
    onUpdateCyberMondayCode(filter: $filter) {
      id
      code
      usedBy
      dayValid
      dayUsed
      isUsed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCyberMondayCode = /* GraphQL */ `
  subscription OnDeleteCyberMondayCode(
    $filter: ModelSubscriptionCyberMondayCodeFilterInput
  ) {
    onDeleteCyberMondayCode(filter: $filter) {
      id
      code
      usedBy
      dayValid
      dayUsed
      isUsed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateApprovedAPS25MediaPage = /* GraphQL */ `
  subscription OnCreateApprovedAPS25MediaPage(
    $filter: ModelSubscriptionApprovedAPS25MediaPageFilterInput
  ) {
    onCreateApprovedAPS25MediaPage(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateApprovedAPS25MediaPage = /* GraphQL */ `
  subscription OnUpdateApprovedAPS25MediaPage(
    $filter: ModelSubscriptionApprovedAPS25MediaPageFilterInput
  ) {
    onUpdateApprovedAPS25MediaPage(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteApprovedAPS25MediaPage = /* GraphQL */ `
  subscription OnDeleteApprovedAPS25MediaPage(
    $filter: ModelSubscriptionApprovedAPS25MediaPageFilterInput
  ) {
    onDeleteApprovedAPS25MediaPage(filter: $filter) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourseOutlineRequest = /* GraphQL */ `
  subscription OnCreateCourseOutlineRequest(
    $filter: ModelSubscriptionCourseOutlineRequestFilterInput
  ) {
    onCreateCourseOutlineRequest(filter: $filter) {
      id
      email
      name
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseOutlineRequest = /* GraphQL */ `
  subscription OnUpdateCourseOutlineRequest(
    $filter: ModelSubscriptionCourseOutlineRequestFilterInput
  ) {
    onUpdateCourseOutlineRequest(filter: $filter) {
      id
      email
      name
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseOutlineRequest = /* GraphQL */ `
  subscription OnDeleteCourseOutlineRequest(
    $filter: ModelSubscriptionCourseOutlineRequestFilterInput
  ) {
    onDeleteCourseOutlineRequest(filter: $filter) {
      id
      email
      name
      ipAddress
      country
      device
      page
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserGameStats = /* GraphQL */ `
  subscription OnCreateUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onCreateUserGameStats(filter: $filter) {
      id
      userID
      bestStreakAllTime
      totalAttempts
      totalCorrect
      lastPlayedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserGameStats = /* GraphQL */ `
  subscription OnUpdateUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onUpdateUserGameStats(filter: $filter) {
      id
      userID
      bestStreakAllTime
      totalAttempts
      totalCorrect
      lastPlayedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserGameStats = /* GraphQL */ `
  subscription OnDeleteUserGameStats(
    $filter: ModelSubscriptionUserGameStatsFilterInput
  ) {
    onDeleteUserGameStats(filter: $filter) {
      id
      userID
      bestStreakAllTime
      totalAttempts
      totalCorrect
      lastPlayedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLeaderboardEntry = /* GraphQL */ `
  subscription OnCreateLeaderboardEntry(
    $filter: ModelSubscriptionLeaderboardEntryFilterInput
  ) {
    onCreateLeaderboardEntry(filter: $filter) {
      id
      period
      key
      sortKey
      userID
      displayName
      avatarUrl
      score
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onUpdateLeaderboardEntry = /* GraphQL */ `
  subscription OnUpdateLeaderboardEntry(
    $filter: ModelSubscriptionLeaderboardEntryFilterInput
  ) {
    onUpdateLeaderboardEntry(filter: $filter) {
      id
      period
      key
      sortKey
      userID
      displayName
      avatarUrl
      score
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onDeleteLeaderboardEntry = /* GraphQL */ `
  subscription OnDeleteLeaderboardEntry(
    $filter: ModelSubscriptionLeaderboardEntryFilterInput
  ) {
    onDeleteLeaderboardEntry(filter: $filter) {
      id
      period
      key
      sortKey
      userID
      displayName
      avatarUrl
      score
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const onCreateAnswerEvent = /* GraphQL */ `
  subscription OnCreateAnswerEvent(
    $filter: ModelSubscriptionAnswerEventFilterInput
  ) {
    onCreateAnswerEvent(filter: $filter) {
      id
      userID
      termID
      correct
      latencyMs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAnswerEvent = /* GraphQL */ `
  subscription OnUpdateAnswerEvent(
    $filter: ModelSubscriptionAnswerEventFilterInput
  ) {
    onUpdateAnswerEvent(filter: $filter) {
      id
      userID
      termID
      correct
      latencyMs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAnswerEvent = /* GraphQL */ `
  subscription OnDeleteAnswerEvent(
    $filter: ModelSubscriptionAnswerEventFilterInput
  ) {
    onDeleteAnswerEvent(filter: $filter) {
      id
      userID
      termID
      correct
      latencyMs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLessonTags = /* GraphQL */ `
  subscription OnCreateLessonTags(
    $filter: ModelSubscriptionLessonTagsFilterInput
  ) {
    onCreateLessonTags(filter: $filter) {
      id
      tagsId
      lessonId
      tags {
        id
        tag
        createdAt
        updatedAt
        __typename
      }
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLessonTags = /* GraphQL */ `
  subscription OnUpdateLessonTags(
    $filter: ModelSubscriptionLessonTagsFilterInput
  ) {
    onUpdateLessonTags(filter: $filter) {
      id
      tagsId
      lessonId
      tags {
        id
        tag
        createdAt
        updatedAt
        __typename
      }
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLessonTags = /* GraphQL */ `
  subscription OnDeleteLessonTags(
    $filter: ModelSubscriptionLessonTagsFilterInput
  ) {
    onDeleteLessonTags(filter: $filter) {
      id
      tagsId
      lessonId
      tags {
        id
        tag
        createdAt
        updatedAt
        __typename
      }
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCertificateByCategory = /* GraphQL */ `
  subscription OnCreateCertificateByCategory(
    $filter: ModelSubscriptionCertificateByCategoryFilterInput
  ) {
    onCreateCertificateByCategory(filter: $filter) {
      id
      categoryId
      certificateObjectId
      category {
        id
        name
        value
        createdAt
        updatedAt
        __typename
      }
      certificateObject {
        id
        courseId
        title
        description
        seoImage
        hours
        courses
        video
        price
        link
        applicationLink
        callout
        purchaseLink
        categoryArray
        abbreviation
        whereText
        whatText
        howText
        deadline
        subscriptionLink
        subscriptionPrice
        status
        displayOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertificateByCategory = /* GraphQL */ `
  subscription OnUpdateCertificateByCategory(
    $filter: ModelSubscriptionCertificateByCategoryFilterInput
  ) {
    onUpdateCertificateByCategory(filter: $filter) {
      id
      categoryId
      certificateObjectId
      category {
        id
        name
        value
        createdAt
        updatedAt
        __typename
      }
      certificateObject {
        id
        courseId
        title
        description
        seoImage
        hours
        courses
        video
        price
        link
        applicationLink
        callout
        purchaseLink
        categoryArray
        abbreviation
        whereText
        whatText
        howText
        deadline
        subscriptionLink
        subscriptionPrice
        status
        displayOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertificateByCategory = /* GraphQL */ `
  subscription OnDeleteCertificateByCategory(
    $filter: ModelSubscriptionCertificateByCategoryFilterInput
  ) {
    onDeleteCertificateByCategory(filter: $filter) {
      id
      categoryId
      certificateObjectId
      category {
        id
        name
        value
        createdAt
        updatedAt
        __typename
      }
      certificateObject {
        id
        courseId
        title
        description
        seoImage
        hours
        courses
        video
        price
        link
        applicationLink
        callout
        purchaseLink
        categoryArray
        abbreviation
        whereText
        whatText
        howText
        deadline
        subscriptionLink
        subscriptionPrice
        status
        displayOrder
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCertificateCourses = /* GraphQL */ `
  subscription OnCreateCertificateCourses(
    $filter: ModelSubscriptionCertificateCoursesFilterInput
  ) {
    onCreateCertificateCourses(filter: $filter) {
      id
      certificateId
      courseId
      certificate {
        id
        slug
        title
        title_callout_1
        title_callout_2
        title_text
        title_button_1_text
        title_button_1_link
        title_button_2_text
        title_button_2_link
        title_image
        whoText
        courses_total
        hours_total
        ceus_total
        brochure_link
        video
        price_full
        price_monthly
        price_features
        lmsLink
        demoLink
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCertificateCourses = /* GraphQL */ `
  subscription OnUpdateCertificateCourses(
    $filter: ModelSubscriptionCertificateCoursesFilterInput
  ) {
    onUpdateCertificateCourses(filter: $filter) {
      id
      certificateId
      courseId
      certificate {
        id
        slug
        title
        title_callout_1
        title_callout_2
        title_text
        title_button_1_text
        title_button_1_link
        title_button_2_text
        title_button_2_link
        title_image
        whoText
        courses_total
        hours_total
        ceus_total
        brochure_link
        video
        price_full
        price_monthly
        price_features
        lmsLink
        demoLink
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCertificateCourses = /* GraphQL */ `
  subscription OnDeleteCertificateCourses(
    $filter: ModelSubscriptionCertificateCoursesFilterInput
  ) {
    onDeleteCertificateCourses(filter: $filter) {
      id
      certificateId
      courseId
      certificate {
        id
        slug
        title
        title_callout_1
        title_callout_2
        title_text
        title_button_1_text
        title_button_1_link
        title_button_2_text
        title_button_2_link
        title_image
        whoText
        courses_total
        hours_total
        ceus_total
        brochure_link
        video
        price_full
        price_monthly
        price_features
        lmsLink
        demoLink
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateArticleRelatedCourses = /* GraphQL */ `
  subscription OnCreateArticleRelatedCourses(
    $filter: ModelSubscriptionArticleRelatedCoursesFilterInput
  ) {
    onCreateArticleRelatedCourses(filter: $filter) {
      id
      courseId
      articleId
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      article {
        id
        slug
        title
        subhead
        media
        seoImage
        content
        tags
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateArticleRelatedCourses = /* GraphQL */ `
  subscription OnUpdateArticleRelatedCourses(
    $filter: ModelSubscriptionArticleRelatedCoursesFilterInput
  ) {
    onUpdateArticleRelatedCourses(filter: $filter) {
      id
      courseId
      articleId
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      article {
        id
        slug
        title
        subhead
        media
        seoImage
        content
        tags
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteArticleRelatedCourses = /* GraphQL */ `
  subscription OnDeleteArticleRelatedCourses(
    $filter: ModelSubscriptionArticleRelatedCoursesFilterInput
  ) {
    onDeleteArticleRelatedCourses(filter: $filter) {
      id
      courseId
      articleId
      course {
        id
        slug
        category
        title
        subhead
        media
        video
        hour
        lessons
        videos
        price
        createdAt
        updatedAt
        __typename
      }
      article {
        id
        slug
        title
        subhead
        media
        seoImage
        content
        tags
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserCompletedLessons = /* GraphQL */ `
  subscription OnCreateUserCompletedLessons(
    $filter: ModelSubscriptionUserCompletedLessonsFilterInput
  ) {
    onCreateUserCompletedLessons(filter: $filter) {
      id
      lessonId
      userId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserCompletedLessons = /* GraphQL */ `
  subscription OnUpdateUserCompletedLessons(
    $filter: ModelSubscriptionUserCompletedLessonsFilterInput
  ) {
    onUpdateUserCompletedLessons(filter: $filter) {
      id
      lessonId
      userId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserCompletedLessons = /* GraphQL */ `
  subscription OnDeleteUserCompletedLessons(
    $filter: ModelSubscriptionUserCompletedLessonsFilterInput
  ) {
    onDeleteUserCompletedLessons(filter: $filter) {
      id
      lessonId
      userId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLessonGlossaryTerms = /* GraphQL */ `
  subscription OnCreateLessonGlossaryTerms(
    $filter: ModelSubscriptionLessonGlossaryTermsFilterInput
  ) {
    onCreateLessonGlossaryTerms(filter: $filter) {
      id
      lessonId
      glossaryTermId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLessonGlossaryTerms = /* GraphQL */ `
  subscription OnUpdateLessonGlossaryTerms(
    $filter: ModelSubscriptionLessonGlossaryTermsFilterInput
  ) {
    onUpdateLessonGlossaryTerms(filter: $filter) {
      id
      lessonId
      glossaryTermId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLessonGlossaryTerms = /* GraphQL */ `
  subscription OnDeleteLessonGlossaryTerms(
    $filter: ModelSubscriptionLessonGlossaryTermsFilterInput
  ) {
    onDeleteLessonGlossaryTerms(filter: $filter) {
      id
      lessonId
      glossaryTermId
      lesson {
        id
        slug
        title
        subhead
        type
        media
        mediaType
        slides
        seoImage
        content
        objectives
        actionCTA
        actionSubhead
        actionLink
        actionLinkTitle
        actionExample
        author
        status
        related
        featured
        backdate
        createdBy
        lastEditedBy
        videoLink
        screengrab
        seoDescription
        seoKeywords
        seoTitle
        seoUrl
        seoRobots
        seoFollow
        wired
        wiredLessonId
        createdAt
        updatedAt
        lessonAnalysisId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAuthorTemplates = /* GraphQL */ `
  subscription OnCreateAuthorTemplates(
    $filter: ModelSubscriptionAuthorTemplatesFilterInput
  ) {
    onCreateAuthorTemplates(filter: $filter) {
      id
      authorId
      indexTemplateId
      author {
        id
        name
        headshot
        linkedIn
        title
        company
        createdAt
        updatedAt
        __typename
      }
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAuthorTemplates = /* GraphQL */ `
  subscription OnUpdateAuthorTemplates(
    $filter: ModelSubscriptionAuthorTemplatesFilterInput
  ) {
    onUpdateAuthorTemplates(filter: $filter) {
      id
      authorId
      indexTemplateId
      author {
        id
        name
        headshot
        linkedIn
        title
        company
        createdAt
        updatedAt
        __typename
      }
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAuthorTemplates = /* GraphQL */ `
  subscription OnDeleteAuthorTemplates(
    $filter: ModelSubscriptionAuthorTemplatesFilterInput
  ) {
    onDeleteAuthorTemplates(filter: $filter) {
      id
      authorId
      indexTemplateId
      author {
        id
        name
        headshot
        linkedIn
        title
        company
        createdAt
        updatedAt
        __typename
      }
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAchievementUsers = /* GraphQL */ `
  subscription OnCreateAchievementUsers(
    $filter: ModelSubscriptionAchievementUsersFilterInput
  ) {
    onCreateAchievementUsers(filter: $filter) {
      id
      userId
      achievementId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAchievementUsers = /* GraphQL */ `
  subscription OnUpdateAchievementUsers(
    $filter: ModelSubscriptionAchievementUsersFilterInput
  ) {
    onUpdateAchievementUsers(filter: $filter) {
      id
      userId
      achievementId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAchievementUsers = /* GraphQL */ `
  subscription OnDeleteAchievementUsers(
    $filter: ModelSubscriptionAchievementUsersFilterInput
  ) {
    onDeleteAchievementUsers(filter: $filter) {
      id
      userId
      achievementId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCohortUsers = /* GraphQL */ `
  subscription OnCreateCohortUsers(
    $filter: ModelSubscriptionCohortUsersFilterInput
  ) {
    onCreateCohortUsers(filter: $filter) {
      id
      userId
      cohortId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      cohort {
        id
        name
        startDate
        endDate
        deadline
        type
        description
        link
        createdAt
        updatedAt
        instructorCohortsId
        cohortInstructorId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCohortUsers = /* GraphQL */ `
  subscription OnUpdateCohortUsers(
    $filter: ModelSubscriptionCohortUsersFilterInput
  ) {
    onUpdateCohortUsers(filter: $filter) {
      id
      userId
      cohortId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      cohort {
        id
        name
        startDate
        endDate
        deadline
        type
        description
        link
        createdAt
        updatedAt
        instructorCohortsId
        cohortInstructorId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCohortUsers = /* GraphQL */ `
  subscription OnDeleteCohortUsers(
    $filter: ModelSubscriptionCohortUsersFilterInput
  ) {
    onDeleteCohortUsers(filter: $filter) {
      id
      userId
      cohortId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      cohort {
        id
        name
        startDate
        endDate
        deadline
        type
        description
        link
        createdAt
        updatedAt
        instructorCohortsId
        cohortInstructorId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserWishlist = /* GraphQL */ `
  subscription OnCreateUserWishlist(
    $filter: ModelSubscriptionUserWishlistFilterInput
  ) {
    onCreateUserWishlist(filter: $filter) {
      id
      userId
      lMSCourseId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserWishlist = /* GraphQL */ `
  subscription OnUpdateUserWishlist(
    $filter: ModelSubscriptionUserWishlistFilterInput
  ) {
    onUpdateUserWishlist(filter: $filter) {
      id
      userId
      lMSCourseId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserWishlist = /* GraphQL */ `
  subscription OnDeleteUserWishlist(
    $filter: ModelSubscriptionUserWishlistFilterInput
  ) {
    onDeleteUserWishlist(filter: $filter) {
      id
      userId
      lMSCourseId
      user {
        id
        thinkificId
        name
        title
        company
        email
        office
        bio
        interests
        goals
        cell
        picture
        linkedin
        location
        companyID
        cmpmFormID
        cpsFormID
        savedCourses
        savedLessons
        savedArticles
        source
        onboardingComplete
        onboardingCompleteDate
        totalXp
        thinkificXp
        psXp
        level
        xpToNextLevel
        lastLogin
        dailyStreak
        allAccess
        allAccessStartDate
        allAccessEndDate
        tourCompleted
        icpfCmpmFormID
        pgsfFormID
        initials
        createdAt
        updatedAt
        userUserXpId
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCollectionCourses = /* GraphQL */ `
  subscription OnCreateCollectionCourses(
    $filter: ModelSubscriptionCollectionCoursesFilterInput
  ) {
    onCreateCollectionCourses(filter: $filter) {
      id
      lMSCollectionId
      lMSCourseId
      lMSCollection {
        id
        description
        title
        subtitle
        instructor
        instructorImage
        instructorDescription
        instructorLink
        hours
        price
        slug
        category
        collectionId
        lmsLink
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCollectionCourses = /* GraphQL */ `
  subscription OnUpdateCollectionCourses(
    $filter: ModelSubscriptionCollectionCoursesFilterInput
  ) {
    onUpdateCollectionCourses(filter: $filter) {
      id
      lMSCollectionId
      lMSCourseId
      lMSCollection {
        id
        description
        title
        subtitle
        instructor
        instructorImage
        instructorDescription
        instructorLink
        hours
        price
        slug
        category
        collectionId
        lmsLink
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCollectionCourses = /* GraphQL */ `
  subscription OnDeleteCollectionCourses(
    $filter: ModelSubscriptionCollectionCoursesFilterInput
  ) {
    onDeleteCollectionCourses(filter: $filter) {
      id
      lMSCollectionId
      lMSCourseId
      lMSCollection {
        id
        description
        title
        subtitle
        instructor
        instructorImage
        instructorDescription
        instructorLink
        hours
        price
        slug
        category
        collectionId
        lmsLink
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCirriculumCourses = /* GraphQL */ `
  subscription OnCreateCirriculumCourses(
    $filter: ModelSubscriptionCirriculumCoursesFilterInput
  ) {
    onCreateCirriculumCourses(filter: $filter) {
      id
      lMSCirriculumId
      lMSCourseId
      lMSCirriculum {
        id
        shorthand
        title
        slug
        description
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCirriculumCourses = /* GraphQL */ `
  subscription OnUpdateCirriculumCourses(
    $filter: ModelSubscriptionCirriculumCoursesFilterInput
  ) {
    onUpdateCirriculumCourses(filter: $filter) {
      id
      lMSCirriculumId
      lMSCourseId
      lMSCirriculum {
        id
        shorthand
        title
        slug
        description
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCirriculumCourses = /* GraphQL */ `
  subscription OnDeleteCirriculumCourses(
    $filter: ModelSubscriptionCirriculumCoursesFilterInput
  ) {
    onDeleteCirriculumCourses(filter: $filter) {
      id
      lMSCirriculumId
      lMSCourseId
      lMSCirriculum {
        id
        shorthand
        title
        slug
        description
        createdAt
        updatedAt
        __typename
      }
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourseLessons = /* GraphQL */ `
  subscription OnCreateCourseLessons(
    $filter: ModelSubscriptionCourseLessonsFilterInput
  ) {
    onCreateCourseLessons(filter: $filter) {
      id
      lMSCourseId
      lMSLessonId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      lMSLesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseLessons = /* GraphQL */ `
  subscription OnUpdateCourseLessons(
    $filter: ModelSubscriptionCourseLessonsFilterInput
  ) {
    onUpdateCourseLessons(filter: $filter) {
      id
      lMSCourseId
      lMSLessonId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      lMSLesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseLessons = /* GraphQL */ `
  subscription OnDeleteCourseLessons(
    $filter: ModelSubscriptionCourseLessonsFilterInput
  ) {
    onDeleteCourseLessons(filter: $filter) {
      id
      lMSCourseId
      lMSLessonId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      lMSLesson {
        id
        title
        subheadline
        objectives
        media
        percentComplete
        content
        slug
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourseInstructors = /* GraphQL */ `
  subscription OnCreateCourseInstructors(
    $filter: ModelSubscriptionCourseInstructorsFilterInput
  ) {
    onCreateCourseInstructors(filter: $filter) {
      id
      lMSCourseId
      instructorId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseInstructors = /* GraphQL */ `
  subscription OnUpdateCourseInstructors(
    $filter: ModelSubscriptionCourseInstructorsFilterInput
  ) {
    onUpdateCourseInstructors(filter: $filter) {
      id
      lMSCourseId
      instructorId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseInstructors = /* GraphQL */ `
  subscription OnDeleteCourseInstructors(
    $filter: ModelSubscriptionCourseInstructorsFilterInput
  ) {
    onDeleteCourseInstructors(filter: $filter) {
      id
      lMSCourseId
      instructorId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      instructor {
        id
        userId
        name
        image
        bio
        linkedIn
        company
        title
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAchievementCourses = /* GraphQL */ `
  subscription OnCreateAchievementCourses(
    $filter: ModelSubscriptionAchievementCoursesFilterInput
  ) {
    onCreateAchievementCourses(filter: $filter) {
      id
      lMSCourseId
      achievementId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAchievementCourses = /* GraphQL */ `
  subscription OnUpdateAchievementCourses(
    $filter: ModelSubscriptionAchievementCoursesFilterInput
  ) {
    onUpdateAchievementCourses(filter: $filter) {
      id
      lMSCourseId
      achievementId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAchievementCourses = /* GraphQL */ `
  subscription OnDeleteAchievementCourses(
    $filter: ModelSubscriptionAchievementCoursesFilterInput
  ) {
    onDeleteAchievementCourses(filter: $filter) {
      id
      lMSCourseId
      achievementId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      achievement {
        id
        title
        description
        image
        coursesRequired
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePartnerCourses = /* GraphQL */ `
  subscription OnCreatePartnerCourses(
    $filter: ModelSubscriptionPartnerCoursesFilterInput
  ) {
    onCreatePartnerCourses(filter: $filter) {
      id
      lMSCourseId
      partnerId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePartnerCourses = /* GraphQL */ `
  subscription OnUpdatePartnerCourses(
    $filter: ModelSubscriptionPartnerCoursesFilterInput
  ) {
    onUpdatePartnerCourses(filter: $filter) {
      id
      lMSCourseId
      partnerId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePartnerCourses = /* GraphQL */ `
  subscription OnDeletePartnerCourses(
    $filter: ModelSubscriptionPartnerCoursesFilterInput
  ) {
    onDeletePartnerCourses(filter: $filter) {
      id
      lMSCourseId
      partnerId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateLibraryCourses = /* GraphQL */ `
  subscription OnCreateLibraryCourses(
    $filter: ModelSubscriptionLibraryCoursesFilterInput
  ) {
    onCreateLibraryCourses(filter: $filter) {
      id
      lMSCourseId
      customerLibaryId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      customerLibary {
        id
        displayName
        slug
        description
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        addOns
        backgroundImage
        code
        status
        availableCodes
        usedCodes
        promotionId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLibraryCourses = /* GraphQL */ `
  subscription OnUpdateLibraryCourses(
    $filter: ModelSubscriptionLibraryCoursesFilterInput
  ) {
    onUpdateLibraryCourses(filter: $filter) {
      id
      lMSCourseId
      customerLibaryId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      customerLibary {
        id
        displayName
        slug
        description
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        addOns
        backgroundImage
        code
        status
        availableCodes
        usedCodes
        promotionId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLibraryCourses = /* GraphQL */ `
  subscription OnDeleteLibraryCourses(
    $filter: ModelSubscriptionLibraryCoursesFilterInput
  ) {
    onDeleteLibraryCourses(filter: $filter) {
      id
      lMSCourseId
      customerLibaryId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      customerLibary {
        id
        displayName
        slug
        description
        link
        logo
        email
        primaryColor
        highlightColor
        pdf
        slide
        video
        addOns
        backgroundImage
        code
        status
        availableCodes
        usedCodes
        promotionId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourseGlossaryTerms = /* GraphQL */ `
  subscription OnCreateCourseGlossaryTerms(
    $filter: ModelSubscriptionCourseGlossaryTermsFilterInput
  ) {
    onCreateCourseGlossaryTerms(filter: $filter) {
      id
      lMSCourseId
      glossaryTermId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourseGlossaryTerms = /* GraphQL */ `
  subscription OnUpdateCourseGlossaryTerms(
    $filter: ModelSubscriptionCourseGlossaryTermsFilterInput
  ) {
    onUpdateCourseGlossaryTerms(filter: $filter) {
      id
      lMSCourseId
      glossaryTermId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourseGlossaryTerms = /* GraphQL */ `
  subscription OnDeleteCourseGlossaryTerms(
    $filter: ModelSubscriptionCourseGlossaryTermsFilterInput
  ) {
    onDeleteCourseGlossaryTerms(filter: $filter) {
      id
      lMSCourseId
      glossaryTermId
      lMSCourse {
        id
        thinkificId
        courseId
        category
        categoryArray
        type
        price
        hours
        lessons
        videos
        preview
        seoImage
        infoSheet
        title
        subheadline
        what_learned
        objectives
        link
        trial_link
        percentComplete
        slug
        demo
        partOf
        altLink
        shortDescription
        subscriptionLink
        subscriptionPrice
        stripeLink
        callout
        createdAt
        updatedAt
        customerLibaryClientCoursesId
        customerLibaryPschoolCoursesId
        __typename
      }
      glossaryTerm {
        id
        term
        letter
        definition
        order
        status
        difficulty
        rand
        gameDefinition
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateIndexTemplateRows = /* GraphQL */ `
  subscription OnCreateIndexTemplateRows(
    $filter: ModelSubscriptionIndexTemplateRowsFilterInput
  ) {
    onCreateIndexTemplateRows(filter: $filter) {
      id
      indexTemplateId
      indexRowId
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      indexRow {
        id
        headline
        subhead
        type
        content
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateIndexTemplateRows = /* GraphQL */ `
  subscription OnUpdateIndexTemplateRows(
    $filter: ModelSubscriptionIndexTemplateRowsFilterInput
  ) {
    onUpdateIndexTemplateRows(filter: $filter) {
      id
      indexTemplateId
      indexRowId
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      indexRow {
        id
        headline
        subhead
        type
        content
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteIndexTemplateRows = /* GraphQL */ `
  subscription OnDeleteIndexTemplateRows(
    $filter: ModelSubscriptionIndexTemplateRowsFilterInput
  ) {
    onDeleteIndexTemplateRows(filter: $filter) {
      id
      indexTemplateId
      indexRowId
      indexTemplate {
        id
        slug
        title
        subhead
        createdAt
        updatedAt
        __typename
      }
      indexRow {
        id
        headline
        subhead
        type
        content
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePartnerAdminUsers = /* GraphQL */ `
  subscription OnCreatePartnerAdminUsers(
    $filter: ModelSubscriptionPartnerAdminUsersFilterInput
  ) {
    onCreatePartnerAdminUsers(filter: $filter) {
      id
      partnerId
      partnerAdminId
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      partnerAdmin {
        id
        name
        email
        password
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePartnerAdminUsers = /* GraphQL */ `
  subscription OnUpdatePartnerAdminUsers(
    $filter: ModelSubscriptionPartnerAdminUsersFilterInput
  ) {
    onUpdatePartnerAdminUsers(filter: $filter) {
      id
      partnerId
      partnerAdminId
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      partnerAdmin {
        id
        name
        email
        password
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePartnerAdminUsers = /* GraphQL */ `
  subscription OnDeletePartnerAdminUsers(
    $filter: ModelSubscriptionPartnerAdminUsersFilterInput
  ) {
    onDeletePartnerAdminUsers(filter: $filter) {
      id
      partnerId
      partnerAdminId
      partner {
        id
        name
        image
        link
        createdAt
        updatedAt
        __typename
      }
      partnerAdmin {
        id
        name
        email
        password
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
