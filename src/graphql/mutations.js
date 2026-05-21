/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLessonSource = /* GraphQL */ `
  mutation CreateLessonSource(
    $input: CreateLessonSourceInput!
    $condition: ModelLessonSourceConditionInput
  ) {
    createLessonSource(input: $input, condition: $condition) {
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
export const updateLessonSource = /* GraphQL */ `
  mutation UpdateLessonSource(
    $input: UpdateLessonSourceInput!
    $condition: ModelLessonSourceConditionInput
  ) {
    updateLessonSource(input: $input, condition: $condition) {
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
export const deleteLessonSource = /* GraphQL */ `
  mutation DeleteLessonSource(
    $input: DeleteLessonSourceInput!
    $condition: ModelLessonSourceConditionInput
  ) {
    deleteLessonSource(input: $input, condition: $condition) {
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
export const createLessonLink = /* GraphQL */ `
  mutation CreateLessonLink(
    $input: CreateLessonLinkInput!
    $condition: ModelLessonLinkConditionInput
  ) {
    createLessonLink(input: $input, condition: $condition) {
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
export const updateLessonLink = /* GraphQL */ `
  mutation UpdateLessonLink(
    $input: UpdateLessonLinkInput!
    $condition: ModelLessonLinkConditionInput
  ) {
    updateLessonLink(input: $input, condition: $condition) {
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
export const deleteLessonLink = /* GraphQL */ `
  mutation DeleteLessonLink(
    $input: DeleteLessonLinkInput!
    $condition: ModelLessonLinkConditionInput
  ) {
    deleteLessonLink(input: $input, condition: $condition) {
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
export const createTags = /* GraphQL */ `
  mutation CreateTags(
    $input: CreateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    createTags(input: $input, condition: $condition) {
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
export const updateTags = /* GraphQL */ `
  mutation UpdateTags(
    $input: UpdateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    updateTags(input: $input, condition: $condition) {
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
export const deleteTags = /* GraphQL */ `
  mutation DeleteTags(
    $input: DeleteTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    deleteTags(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createCertificate = /* GraphQL */ `
  mutation CreateCertificate(
    $input: CreateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    createCertificate(input: $input, condition: $condition) {
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
export const updateCertificate = /* GraphQL */ `
  mutation UpdateCertificate(
    $input: UpdateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    updateCertificate(input: $input, condition: $condition) {
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
export const deleteCertificate = /* GraphQL */ `
  mutation DeleteCertificate(
    $input: DeleteCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    deleteCertificate(input: $input, condition: $condition) {
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
export const createCertificateObject = /* GraphQL */ `
  mutation CreateCertificateObject(
    $input: CreateCertificateObjectInput!
    $condition: ModelCertificateObjectConditionInput
  ) {
    createCertificateObject(input: $input, condition: $condition) {
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
export const updateCertificateObject = /* GraphQL */ `
  mutation UpdateCertificateObject(
    $input: UpdateCertificateObjectInput!
    $condition: ModelCertificateObjectConditionInput
  ) {
    updateCertificateObject(input: $input, condition: $condition) {
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
export const deleteCertificateObject = /* GraphQL */ `
  mutation DeleteCertificateObject(
    $input: DeleteCertificateObjectInput!
    $condition: ModelCertificateObjectConditionInput
  ) {
    deleteCertificateObject(input: $input, condition: $condition) {
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
export const createLesson = /* GraphQL */ `
  mutation CreateLesson(
    $input: CreateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    createLesson(input: $input, condition: $condition) {
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
export const updateLesson = /* GraphQL */ `
  mutation UpdateLesson(
    $input: UpdateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    updateLesson(input: $input, condition: $condition) {
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
export const deleteLesson = /* GraphQL */ `
  mutation DeleteLesson(
    $input: DeleteLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    deleteLesson(input: $input, condition: $condition) {
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
export const createSeoDocument = /* GraphQL */ `
  mutation CreateSeoDocument(
    $input: CreateSeoDocumentInput!
    $condition: ModelSeoDocumentConditionInput
  ) {
    createSeoDocument(input: $input, condition: $condition) {
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
export const updateSeoDocument = /* GraphQL */ `
  mutation UpdateSeoDocument(
    $input: UpdateSeoDocumentInput!
    $condition: ModelSeoDocumentConditionInput
  ) {
    updateSeoDocument(input: $input, condition: $condition) {
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
export const deleteSeoDocument = /* GraphQL */ `
  mutation DeleteSeoDocument(
    $input: DeleteSeoDocumentInput!
    $condition: ModelSeoDocumentConditionInput
  ) {
    deleteSeoDocument(input: $input, condition: $condition) {
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
export const createAuthor = /* GraphQL */ `
  mutation CreateAuthor(
    $input: CreateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    createAuthor(input: $input, condition: $condition) {
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
export const updateAuthor = /* GraphQL */ `
  mutation UpdateAuthor(
    $input: UpdateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    updateAuthor(input: $input, condition: $condition) {
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
export const deleteAuthor = /* GraphQL */ `
  mutation DeleteAuthor(
    $input: DeleteAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    deleteAuthor(input: $input, condition: $condition) {
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
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
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
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
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
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
export const createDayInLifeItem = /* GraphQL */ `
  mutation CreateDayInLifeItem(
    $input: CreateDayInLifeItemInput!
    $condition: ModelDayInLifeItemConditionInput
  ) {
    createDayInLifeItem(input: $input, condition: $condition) {
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
export const updateDayInLifeItem = /* GraphQL */ `
  mutation UpdateDayInLifeItem(
    $input: UpdateDayInLifeItemInput!
    $condition: ModelDayInLifeItemConditionInput
  ) {
    updateDayInLifeItem(input: $input, condition: $condition) {
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
export const deleteDayInLifeItem = /* GraphQL */ `
  mutation DeleteDayInLifeItem(
    $input: DeleteDayInLifeItemInput!
    $condition: ModelDayInLifeItemConditionInput
  ) {
    deleteDayInLifeItem(input: $input, condition: $condition) {
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
export const createCareer = /* GraphQL */ `
  mutation CreateCareer(
    $input: CreateCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    createCareer(input: $input, condition: $condition) {
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
export const updateCareer = /* GraphQL */ `
  mutation UpdateCareer(
    $input: UpdateCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    updateCareer(input: $input, condition: $condition) {
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
export const deleteCareer = /* GraphQL */ `
  mutation DeleteCareer(
    $input: DeleteCareerInput!
    $condition: ModelCareerConditionInput
  ) {
    deleteCareer(input: $input, condition: $condition) {
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
export const createAPS2025MediaItem = /* GraphQL */ `
  mutation CreateAPS2025MediaItem(
    $input: CreateAPS2025MediaItemInput!
    $condition: ModelAPS2025MediaItemConditionInput
  ) {
    createAPS2025MediaItem(input: $input, condition: $condition) {
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
export const updateAPS2025MediaItem = /* GraphQL */ `
  mutation UpdateAPS2025MediaItem(
    $input: UpdateAPS2025MediaItemInput!
    $condition: ModelAPS2025MediaItemConditionInput
  ) {
    updateAPS2025MediaItem(input: $input, condition: $condition) {
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
export const deleteAPS2025MediaItem = /* GraphQL */ `
  mutation DeleteAPS2025MediaItem(
    $input: DeleteAPS2025MediaItemInput!
    $condition: ModelAPS2025MediaItemConditionInput
  ) {
    deleteAPS2025MediaItem(input: $input, condition: $condition) {
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
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserXp = /* GraphQL */ `
  mutation CreateUserXp(
    $input: CreateUserXpInput!
    $condition: ModelUserXpConditionInput
  ) {
    createUserXp(input: $input, condition: $condition) {
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
export const updateUserXp = /* GraphQL */ `
  mutation UpdateUserXp(
    $input: UpdateUserXpInput!
    $condition: ModelUserXpConditionInput
  ) {
    updateUserXp(input: $input, condition: $condition) {
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
export const deleteUserXp = /* GraphQL */ `
  mutation DeleteUserXp(
    $input: DeleteUserXpInput!
    $condition: ModelUserXpConditionInput
  ) {
    deleteUserXp(input: $input, condition: $condition) {
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
export const createCohort = /* GraphQL */ `
  mutation CreateCohort(
    $input: CreateCohortInput!
    $condition: ModelCohortConditionInput
  ) {
    createCohort(input: $input, condition: $condition) {
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
export const updateCohort = /* GraphQL */ `
  mutation UpdateCohort(
    $input: UpdateCohortInput!
    $condition: ModelCohortConditionInput
  ) {
    updateCohort(input: $input, condition: $condition) {
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
export const deleteCohort = /* GraphQL */ `
  mutation DeleteCohort(
    $input: DeleteCohortInput!
    $condition: ModelCohortConditionInput
  ) {
    deleteCohort(input: $input, condition: $condition) {
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
export const createLearningPath = /* GraphQL */ `
  mutation CreateLearningPath(
    $input: CreateLearningPathInput!
    $condition: ModelLearningPathConditionInput
  ) {
    createLearningPath(input: $input, condition: $condition) {
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
export const updateLearningPath = /* GraphQL */ `
  mutation UpdateLearningPath(
    $input: UpdateLearningPathInput!
    $condition: ModelLearningPathConditionInput
  ) {
    updateLearningPath(input: $input, condition: $condition) {
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
export const deleteLearningPath = /* GraphQL */ `
  mutation DeleteLearningPath(
    $input: DeleteLearningPathInput!
    $condition: ModelLearningPathConditionInput
  ) {
    deleteLearningPath(input: $input, condition: $condition) {
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
export const createLearningPathProgress = /* GraphQL */ `
  mutation CreateLearningPathProgress(
    $input: CreateLearningPathProgressInput!
    $condition: ModelLearningPathProgressConditionInput
  ) {
    createLearningPathProgress(input: $input, condition: $condition) {
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
export const updateLearningPathProgress = /* GraphQL */ `
  mutation UpdateLearningPathProgress(
    $input: UpdateLearningPathProgressInput!
    $condition: ModelLearningPathProgressConditionInput
  ) {
    updateLearningPathProgress(input: $input, condition: $condition) {
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
export const deleteLearningPathProgress = /* GraphQL */ `
  mutation DeleteLearningPathProgress(
    $input: DeleteLearningPathProgressInput!
    $condition: ModelLearningPathProgressConditionInput
  ) {
    deleteLearningPathProgress(input: $input, condition: $condition) {
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
export const createBoosterCourseProgress = /* GraphQL */ `
  mutation CreateBoosterCourseProgress(
    $input: CreateBoosterCourseProgressInput!
    $condition: ModelBoosterCourseProgressConditionInput
  ) {
    createBoosterCourseProgress(input: $input, condition: $condition) {
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
export const updateBoosterCourseProgress = /* GraphQL */ `
  mutation UpdateBoosterCourseProgress(
    $input: UpdateBoosterCourseProgressInput!
    $condition: ModelBoosterCourseProgressConditionInput
  ) {
    updateBoosterCourseProgress(input: $input, condition: $condition) {
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
export const deleteBoosterCourseProgress = /* GraphQL */ `
  mutation DeleteBoosterCourseProgress(
    $input: DeleteBoosterCourseProgressInput!
    $condition: ModelBoosterCourseProgressConditionInput
  ) {
    deleteBoosterCourseProgress(input: $input, condition: $condition) {
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
export const createBoosterDiscountCode = /* GraphQL */ `
  mutation CreateBoosterDiscountCode(
    $input: CreateBoosterDiscountCodeInput!
    $condition: ModelBoosterDiscountCodeConditionInput
  ) {
    createBoosterDiscountCode(input: $input, condition: $condition) {
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
export const updateBoosterDiscountCode = /* GraphQL */ `
  mutation UpdateBoosterDiscountCode(
    $input: UpdateBoosterDiscountCodeInput!
    $condition: ModelBoosterDiscountCodeConditionInput
  ) {
    updateBoosterDiscountCode(input: $input, condition: $condition) {
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
export const deleteBoosterDiscountCode = /* GraphQL */ `
  mutation DeleteBoosterDiscountCode(
    $input: DeleteBoosterDiscountCodeInput!
    $condition: ModelBoosterDiscountCodeConditionInput
  ) {
    deleteBoosterDiscountCode(input: $input, condition: $condition) {
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
export const createLearningPathCourse = /* GraphQL */ `
  mutation CreateLearningPathCourse(
    $input: CreateLearningPathCourseInput!
    $condition: ModelLearningPathCourseConditionInput
  ) {
    createLearningPathCourse(input: $input, condition: $condition) {
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
export const updateLearningPathCourse = /* GraphQL */ `
  mutation UpdateLearningPathCourse(
    $input: UpdateLearningPathCourseInput!
    $condition: ModelLearningPathCourseConditionInput
  ) {
    updateLearningPathCourse(input: $input, condition: $condition) {
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
export const deleteLearningPathCourse = /* GraphQL */ `
  mutation DeleteLearningPathCourse(
    $input: DeleteLearningPathCourseInput!
    $condition: ModelLearningPathCourseConditionInput
  ) {
    deleteLearningPathCourse(input: $input, condition: $condition) {
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
export const createLearningPathLesson = /* GraphQL */ `
  mutation CreateLearningPathLesson(
    $input: CreateLearningPathLessonInput!
    $condition: ModelLearningPathLessonConditionInput
  ) {
    createLearningPathLesson(input: $input, condition: $condition) {
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
export const updateLearningPathLesson = /* GraphQL */ `
  mutation UpdateLearningPathLesson(
    $input: UpdateLearningPathLessonInput!
    $condition: ModelLearningPathLessonConditionInput
  ) {
    updateLearningPathLesson(input: $input, condition: $condition) {
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
export const deleteLearningPathLesson = /* GraphQL */ `
  mutation DeleteLearningPathLesson(
    $input: DeleteLearningPathLessonInput!
    $condition: ModelLearningPathLessonConditionInput
  ) {
    deleteLearningPathLesson(input: $input, condition: $condition) {
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
export const createCMPMSession = /* GraphQL */ `
  mutation CreateCMPMSession(
    $input: CreateCMPMSessionInput!
    $condition: ModelCMPMSessionConditionInput
  ) {
    createCMPMSession(input: $input, condition: $condition) {
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
export const updateCMPMSession = /* GraphQL */ `
  mutation UpdateCMPMSession(
    $input: UpdateCMPMSessionInput!
    $condition: ModelCMPMSessionConditionInput
  ) {
    updateCMPMSession(input: $input, condition: $condition) {
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
export const deleteCMPMSession = /* GraphQL */ `
  mutation DeleteCMPMSession(
    $input: DeleteCMPMSessionInput!
    $condition: ModelCMPMSessionConditionInput
  ) {
    deleteCMPMSession(input: $input, condition: $condition) {
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
export const createCMPMForm = /* GraphQL */ `
  mutation CreateCMPMForm(
    $input: CreateCMPMFormInput!
    $condition: ModelCMPMFormConditionInput
  ) {
    createCMPMForm(input: $input, condition: $condition) {
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
export const updateCMPMForm = /* GraphQL */ `
  mutation UpdateCMPMForm(
    $input: UpdateCMPMFormInput!
    $condition: ModelCMPMFormConditionInput
  ) {
    updateCMPMForm(input: $input, condition: $condition) {
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
export const deleteCMPMForm = /* GraphQL */ `
  mutation DeleteCMPMForm(
    $input: DeleteCMPMFormInput!
    $condition: ModelCMPMFormConditionInput
  ) {
    deleteCMPMForm(input: $input, condition: $condition) {
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
export const createIcpfCmpmForm = /* GraphQL */ `
  mutation CreateIcpfCmpmForm(
    $input: CreateIcpfCmpmFormInput!
    $condition: ModelIcpfCmpmFormConditionInput
  ) {
    createIcpfCmpmForm(input: $input, condition: $condition) {
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
export const updateIcpfCmpmForm = /* GraphQL */ `
  mutation UpdateIcpfCmpmForm(
    $input: UpdateIcpfCmpmFormInput!
    $condition: ModelIcpfCmpmFormConditionInput
  ) {
    updateIcpfCmpmForm(input: $input, condition: $condition) {
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
export const deleteIcpfCmpmForm = /* GraphQL */ `
  mutation DeleteIcpfCmpmForm(
    $input: DeleteIcpfCmpmFormInput!
    $condition: ModelIcpfCmpmFormConditionInput
  ) {
    deleteIcpfCmpmForm(input: $input, condition: $condition) {
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
export const createPgsfForm = /* GraphQL */ `
  mutation CreatePgsfForm(
    $input: CreatePgsfFormInput!
    $condition: ModelPgsfFormConditionInput
  ) {
    createPgsfForm(input: $input, condition: $condition) {
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
export const updatePgsfForm = /* GraphQL */ `
  mutation UpdatePgsfForm(
    $input: UpdatePgsfFormInput!
    $condition: ModelPgsfFormConditionInput
  ) {
    updatePgsfForm(input: $input, condition: $condition) {
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
export const deletePgsfForm = /* GraphQL */ `
  mutation DeletePgsfForm(
    $input: DeletePgsfFormInput!
    $condition: ModelPgsfFormConditionInput
  ) {
    deletePgsfForm(input: $input, condition: $condition) {
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
export const createCPSForm = /* GraphQL */ `
  mutation CreateCPSForm(
    $input: CreateCPSFormInput!
    $condition: ModelCPSFormConditionInput
  ) {
    createCPSForm(input: $input, condition: $condition) {
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
export const updateCPSForm = /* GraphQL */ `
  mutation UpdateCPSForm(
    $input: UpdateCPSFormInput!
    $condition: ModelCPSFormConditionInput
  ) {
    updateCPSForm(input: $input, condition: $condition) {
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
export const deleteCPSForm = /* GraphQL */ `
  mutation DeleteCPSForm(
    $input: DeleteCPSFormInput!
    $condition: ModelCPSFormConditionInput
  ) {
    deleteCPSForm(input: $input, condition: $condition) {
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
export const createAppStart = /* GraphQL */ `
  mutation CreateAppStart(
    $input: CreateAppStartInput!
    $condition: ModelAppStartConditionInput
  ) {
    createAppStart(input: $input, condition: $condition) {
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
export const updateAppStart = /* GraphQL */ `
  mutation UpdateAppStart(
    $input: UpdateAppStartInput!
    $condition: ModelAppStartConditionInput
  ) {
    updateAppStart(input: $input, condition: $condition) {
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
export const deleteAppStart = /* GraphQL */ `
  mutation DeleteAppStart(
    $input: DeleteAppStartInput!
    $condition: ModelAppStartConditionInput
  ) {
    deleteAppStart(input: $input, condition: $condition) {
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
export const createApplicationStart = /* GraphQL */ `
  mutation CreateApplicationStart(
    $input: CreateApplicationStartInput!
    $condition: ModelApplicationStartConditionInput
  ) {
    createApplicationStart(input: $input, condition: $condition) {
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
export const updateApplicationStart = /* GraphQL */ `
  mutation UpdateApplicationStart(
    $input: UpdateApplicationStartInput!
    $condition: ModelApplicationStartConditionInput
  ) {
    updateApplicationStart(input: $input, condition: $condition) {
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
export const deleteApplicationStart = /* GraphQL */ `
  mutation DeleteApplicationStart(
    $input: DeleteApplicationStartInput!
    $condition: ModelApplicationStartConditionInput
  ) {
    deleteApplicationStart(input: $input, condition: $condition) {
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
export const createCertAppStart = /* GraphQL */ `
  mutation CreateCertAppStart(
    $input: CreateCertAppStartInput!
    $condition: ModelCertAppStartConditionInput
  ) {
    createCertAppStart(input: $input, condition: $condition) {
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
export const updateCertAppStart = /* GraphQL */ `
  mutation UpdateCertAppStart(
    $input: UpdateCertAppStartInput!
    $condition: ModelCertAppStartConditionInput
  ) {
    updateCertAppStart(input: $input, condition: $condition) {
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
export const deleteCertAppStart = /* GraphQL */ `
  mutation DeleteCertAppStart(
    $input: DeleteCertAppStartInput!
    $condition: ModelCertAppStartConditionInput
  ) {
    deleteCertAppStart(input: $input, condition: $condition) {
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
export const createLMSCollection = /* GraphQL */ `
  mutation CreateLMSCollection(
    $input: CreateLMSCollectionInput!
    $condition: ModelLMSCollectionConditionInput
  ) {
    createLMSCollection(input: $input, condition: $condition) {
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
export const updateLMSCollection = /* GraphQL */ `
  mutation UpdateLMSCollection(
    $input: UpdateLMSCollectionInput!
    $condition: ModelLMSCollectionConditionInput
  ) {
    updateLMSCollection(input: $input, condition: $condition) {
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
export const deleteLMSCollection = /* GraphQL */ `
  mutation DeleteLMSCollection(
    $input: DeleteLMSCollectionInput!
    $condition: ModelLMSCollectionConditionInput
  ) {
    deleteLMSCollection(input: $input, condition: $condition) {
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
export const createLMSCirriculum = /* GraphQL */ `
  mutation CreateLMSCirriculum(
    $input: CreateLMSCirriculumInput!
    $condition: ModelLMSCirriculumConditionInput
  ) {
    createLMSCirriculum(input: $input, condition: $condition) {
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
export const updateLMSCirriculum = /* GraphQL */ `
  mutation UpdateLMSCirriculum(
    $input: UpdateLMSCirriculumInput!
    $condition: ModelLMSCirriculumConditionInput
  ) {
    updateLMSCirriculum(input: $input, condition: $condition) {
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
export const deleteLMSCirriculum = /* GraphQL */ `
  mutation DeleteLMSCirriculum(
    $input: DeleteLMSCirriculumInput!
    $condition: ModelLMSCirriculumConditionInput
  ) {
    deleteLMSCirriculum(input: $input, condition: $condition) {
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
export const createLMSCourse = /* GraphQL */ `
  mutation CreateLMSCourse(
    $input: CreateLMSCourseInput!
    $condition: ModelLMSCourseConditionInput
  ) {
    createLMSCourse(input: $input, condition: $condition) {
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
export const updateLMSCourse = /* GraphQL */ `
  mutation UpdateLMSCourse(
    $input: UpdateLMSCourseInput!
    $condition: ModelLMSCourseConditionInput
  ) {
    updateLMSCourse(input: $input, condition: $condition) {
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
export const deleteLMSCourse = /* GraphQL */ `
  mutation DeleteLMSCourse(
    $input: DeleteLMSCourseInput!
    $condition: ModelLMSCourseConditionInput
  ) {
    deleteLMSCourse(input: $input, condition: $condition) {
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
export const createLMSLesson = /* GraphQL */ `
  mutation CreateLMSLesson(
    $input: CreateLMSLessonInput!
    $condition: ModelLMSLessonConditionInput
  ) {
    createLMSLesson(input: $input, condition: $condition) {
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
export const updateLMSLesson = /* GraphQL */ `
  mutation UpdateLMSLesson(
    $input: UpdateLMSLessonInput!
    $condition: ModelLMSLessonConditionInput
  ) {
    updateLMSLesson(input: $input, condition: $condition) {
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
export const deleteLMSLesson = /* GraphQL */ `
  mutation DeleteLMSLesson(
    $input: DeleteLMSLessonInput!
    $condition: ModelLMSLessonConditionInput
  ) {
    deleteLMSLesson(input: $input, condition: $condition) {
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
export const createLMSModule = /* GraphQL */ `
  mutation CreateLMSModule(
    $input: CreateLMSModuleInput!
    $condition: ModelLMSModuleConditionInput
  ) {
    createLMSModule(input: $input, condition: $condition) {
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
export const updateLMSModule = /* GraphQL */ `
  mutation UpdateLMSModule(
    $input: UpdateLMSModuleInput!
    $condition: ModelLMSModuleConditionInput
  ) {
    updateLMSModule(input: $input, condition: $condition) {
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
export const deleteLMSModule = /* GraphQL */ `
  mutation DeleteLMSModule(
    $input: DeleteLMSModuleInput!
    $condition: ModelLMSModuleConditionInput
  ) {
    deleteLMSModule(input: $input, condition: $condition) {
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
export const createLMSQuiz = /* GraphQL */ `
  mutation CreateLMSQuiz(
    $input: CreateLMSQuizInput!
    $condition: ModelLMSQuizConditionInput
  ) {
    createLMSQuiz(input: $input, condition: $condition) {
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
export const updateLMSQuiz = /* GraphQL */ `
  mutation UpdateLMSQuiz(
    $input: UpdateLMSQuizInput!
    $condition: ModelLMSQuizConditionInput
  ) {
    updateLMSQuiz(input: $input, condition: $condition) {
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
export const deleteLMSQuiz = /* GraphQL */ `
  mutation DeleteLMSQuiz(
    $input: DeleteLMSQuizInput!
    $condition: ModelLMSQuizConditionInput
  ) {
    deleteLMSQuiz(input: $input, condition: $condition) {
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
export const createInstructor = /* GraphQL */ `
  mutation CreateInstructor(
    $input: CreateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    createInstructor(input: $input, condition: $condition) {
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
export const updateInstructor = /* GraphQL */ `
  mutation UpdateInstructor(
    $input: UpdateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    updateInstructor(input: $input, condition: $condition) {
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
export const deleteInstructor = /* GraphQL */ `
  mutation DeleteInstructor(
    $input: DeleteInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    deleteInstructor(input: $input, condition: $condition) {
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
export const createObjective = /* GraphQL */ `
  mutation CreateObjective(
    $input: CreateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    createObjective(input: $input, condition: $condition) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateObjective = /* GraphQL */ `
  mutation UpdateObjective(
    $input: UpdateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    updateObjective(input: $input, condition: $condition) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteObjective = /* GraphQL */ `
  mutation DeleteObjective(
    $input: DeleteObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    deleteObjective(input: $input, condition: $condition) {
      id
      objective
      completed
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSlide = /* GraphQL */ `
  mutation CreateSlide(
    $input: CreateSlideInput!
    $condition: ModelSlideConditionInput
  ) {
    createSlide(input: $input, condition: $condition) {
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
export const updateSlide = /* GraphQL */ `
  mutation UpdateSlide(
    $input: UpdateSlideInput!
    $condition: ModelSlideConditionInput
  ) {
    updateSlide(input: $input, condition: $condition) {
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
export const deleteSlide = /* GraphQL */ `
  mutation DeleteSlide(
    $input: DeleteSlideInput!
    $condition: ModelSlideConditionInput
  ) {
    deleteSlide(input: $input, condition: $condition) {
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
export const createTimestamp = /* GraphQL */ `
  mutation CreateTimestamp(
    $input: CreateTimestampInput!
    $condition: ModelTimestampConditionInput
  ) {
    createTimestamp(input: $input, condition: $condition) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTimestamp = /* GraphQL */ `
  mutation UpdateTimestamp(
    $input: UpdateTimestampInput!
    $condition: ModelTimestampConditionInput
  ) {
    updateTimestamp(input: $input, condition: $condition) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTimestamp = /* GraphQL */ `
  mutation DeleteTimestamp(
    $input: DeleteTimestampInput!
    $condition: ModelTimestampConditionInput
  ) {
    deleteTimestamp(input: $input, condition: $condition) {
      id
      time
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
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
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
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
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
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
export const createTrackedCourse = /* GraphQL */ `
  mutation CreateTrackedCourse(
    $input: CreateTrackedCourseInput!
    $condition: ModelTrackedCourseConditionInput
  ) {
    createTrackedCourse(input: $input, condition: $condition) {
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
export const updateTrackedCourse = /* GraphQL */ `
  mutation UpdateTrackedCourse(
    $input: UpdateTrackedCourseInput!
    $condition: ModelTrackedCourseConditionInput
  ) {
    updateTrackedCourse(input: $input, condition: $condition) {
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
export const deleteTrackedCourse = /* GraphQL */ `
  mutation DeleteTrackedCourse(
    $input: DeleteTrackedCourseInput!
    $condition: ModelTrackedCourseConditionInput
  ) {
    deleteTrackedCourse(input: $input, condition: $condition) {
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
export const createIncludedCourse = /* GraphQL */ `
  mutation CreateIncludedCourse(
    $input: CreateIncludedCourseInput!
    $condition: ModelIncludedCourseConditionInput
  ) {
    createIncludedCourse(input: $input, condition: $condition) {
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
export const updateIncludedCourse = /* GraphQL */ `
  mutation UpdateIncludedCourse(
    $input: UpdateIncludedCourseInput!
    $condition: ModelIncludedCourseConditionInput
  ) {
    updateIncludedCourse(input: $input, condition: $condition) {
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
export const deleteIncludedCourse = /* GraphQL */ `
  mutation DeleteIncludedCourse(
    $input: DeleteIncludedCourseInput!
    $condition: ModelIncludedCourseConditionInput
  ) {
    deleteIncludedCourse(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createCustomerLibary = /* GraphQL */ `
  mutation CreateCustomerLibary(
    $input: CreateCustomerLibaryInput!
    $condition: ModelCustomerLibaryConditionInput
  ) {
    createCustomerLibary(input: $input, condition: $condition) {
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
export const updateCustomerLibary = /* GraphQL */ `
  mutation UpdateCustomerLibary(
    $input: UpdateCustomerLibaryInput!
    $condition: ModelCustomerLibaryConditionInput
  ) {
    updateCustomerLibary(input: $input, condition: $condition) {
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
export const deleteCustomerLibary = /* GraphQL */ `
  mutation DeleteCustomerLibary(
    $input: DeleteCustomerLibaryInput!
    $condition: ModelCustomerLibaryConditionInput
  ) {
    deleteCustomerLibary(input: $input, condition: $condition) {
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
export const createSalesBar = /* GraphQL */ `
  mutation CreateSalesBar(
    $input: CreateSalesBarInput!
    $condition: ModelSalesBarConditionInput
  ) {
    createSalesBar(input: $input, condition: $condition) {
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
export const updateSalesBar = /* GraphQL */ `
  mutation UpdateSalesBar(
    $input: UpdateSalesBarInput!
    $condition: ModelSalesBarConditionInput
  ) {
    updateSalesBar(input: $input, condition: $condition) {
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
export const deleteSalesBar = /* GraphQL */ `
  mutation DeleteSalesBar(
    $input: DeleteSalesBarInput!
    $condition: ModelSalesBarConditionInput
  ) {
    deleteSalesBar(input: $input, condition: $condition) {
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
export const createTestimonial = /* GraphQL */ `
  mutation CreateTestimonial(
    $input: CreateTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    createTestimonial(input: $input, condition: $condition) {
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
export const updateTestimonial = /* GraphQL */ `
  mutation UpdateTestimonial(
    $input: UpdateTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    updateTestimonial(input: $input, condition: $condition) {
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
export const deleteTestimonial = /* GraphQL */ `
  mutation DeleteTestimonial(
    $input: DeleteTestimonialInput!
    $condition: ModelTestimonialConditionInput
  ) {
    deleteTestimonial(input: $input, condition: $condition) {
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
export const createWorkshopForm = /* GraphQL */ `
  mutation CreateWorkshopForm(
    $input: CreateWorkshopFormInput!
    $condition: ModelWorkshopFormConditionInput
  ) {
    createWorkshopForm(input: $input, condition: $condition) {
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
export const updateWorkshopForm = /* GraphQL */ `
  mutation UpdateWorkshopForm(
    $input: UpdateWorkshopFormInput!
    $condition: ModelWorkshopFormConditionInput
  ) {
    updateWorkshopForm(input: $input, condition: $condition) {
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
export const deleteWorkshopForm = /* GraphQL */ `
  mutation DeleteWorkshopForm(
    $input: DeleteWorkshopFormInput!
    $condition: ModelWorkshopFormConditionInput
  ) {
    deleteWorkshopForm(input: $input, condition: $condition) {
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
export const createCourseClick = /* GraphQL */ `
  mutation CreateCourseClick(
    $input: CreateCourseClickInput!
    $condition: ModelCourseClickConditionInput
  ) {
    createCourseClick(input: $input, condition: $condition) {
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
export const updateCourseClick = /* GraphQL */ `
  mutation UpdateCourseClick(
    $input: UpdateCourseClickInput!
    $condition: ModelCourseClickConditionInput
  ) {
    updateCourseClick(input: $input, condition: $condition) {
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
export const deleteCourseClick = /* GraphQL */ `
  mutation DeleteCourseClick(
    $input: DeleteCourseClickInput!
    $condition: ModelCourseClickConditionInput
  ) {
    deleteCourseClick(input: $input, condition: $condition) {
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
export const createSalesbarClick = /* GraphQL */ `
  mutation CreateSalesbarClick(
    $input: CreateSalesbarClickInput!
    $condition: ModelSalesbarClickConditionInput
  ) {
    createSalesbarClick(input: $input, condition: $condition) {
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
export const updateSalesbarClick = /* GraphQL */ `
  mutation UpdateSalesbarClick(
    $input: UpdateSalesbarClickInput!
    $condition: ModelSalesbarClickConditionInput
  ) {
    updateSalesbarClick(input: $input, condition: $condition) {
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
export const deleteSalesbarClick = /* GraphQL */ `
  mutation DeleteSalesbarClick(
    $input: DeleteSalesbarClickInput!
    $condition: ModelSalesbarClickConditionInput
  ) {
    deleteSalesbarClick(input: $input, condition: $condition) {
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
export const createLessonClick = /* GraphQL */ `
  mutation CreateLessonClick(
    $input: CreateLessonClickInput!
    $condition: ModelLessonClickConditionInput
  ) {
    createLessonClick(input: $input, condition: $condition) {
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
export const updateLessonClick = /* GraphQL */ `
  mutation UpdateLessonClick(
    $input: UpdateLessonClickInput!
    $condition: ModelLessonClickConditionInput
  ) {
    updateLessonClick(input: $input, condition: $condition) {
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
export const deleteLessonClick = /* GraphQL */ `
  mutation DeleteLessonClick(
    $input: DeleteLessonClickInput!
    $condition: ModelLessonClickConditionInput
  ) {
    deleteLessonClick(input: $input, condition: $condition) {
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
export const createCourseSearch = /* GraphQL */ `
  mutation CreateCourseSearch(
    $input: CreateCourseSearchInput!
    $condition: ModelCourseSearchConditionInput
  ) {
    createCourseSearch(input: $input, condition: $condition) {
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
export const updateCourseSearch = /* GraphQL */ `
  mutation UpdateCourseSearch(
    $input: UpdateCourseSearchInput!
    $condition: ModelCourseSearchConditionInput
  ) {
    updateCourseSearch(input: $input, condition: $condition) {
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
export const deleteCourseSearch = /* GraphQL */ `
  mutation DeleteCourseSearch(
    $input: DeleteCourseSearchInput!
    $condition: ModelCourseSearchConditionInput
  ) {
    deleteCourseSearch(input: $input, condition: $condition) {
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
export const createCyberMondayClick = /* GraphQL */ `
  mutation CreateCyberMondayClick(
    $input: CreateCyberMondayClickInput!
    $condition: ModelCyberMondayClickConditionInput
  ) {
    createCyberMondayClick(input: $input, condition: $condition) {
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
export const updateCyberMondayClick = /* GraphQL */ `
  mutation UpdateCyberMondayClick(
    $input: UpdateCyberMondayClickInput!
    $condition: ModelCyberMondayClickConditionInput
  ) {
    updateCyberMondayClick(input: $input, condition: $condition) {
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
export const deleteCyberMondayClick = /* GraphQL */ `
  mutation DeleteCyberMondayClick(
    $input: DeleteCyberMondayClickInput!
    $condition: ModelCyberMondayClickConditionInput
  ) {
    deleteCyberMondayClick(input: $input, condition: $condition) {
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
export const createAPSPresentationClick = /* GraphQL */ `
  mutation CreateAPSPresentationClick(
    $input: CreateAPSPresentationClickInput!
    $condition: ModelAPSPresentationClickConditionInput
  ) {
    createAPSPresentationClick(input: $input, condition: $condition) {
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
export const updateAPSPresentationClick = /* GraphQL */ `
  mutation UpdateAPSPresentationClick(
    $input: UpdateAPSPresentationClickInput!
    $condition: ModelAPSPresentationClickConditionInput
  ) {
    updateAPSPresentationClick(input: $input, condition: $condition) {
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
export const deleteAPSPresentationClick = /* GraphQL */ `
  mutation DeleteAPSPresentationClick(
    $input: DeleteAPSPresentationClickInput!
    $condition: ModelAPSPresentationClickConditionInput
  ) {
    deleteAPSPresentationClick(input: $input, condition: $condition) {
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
export const createCategoryClick = /* GraphQL */ `
  mutation CreateCategoryClick(
    $input: CreateCategoryClickInput!
    $condition: ModelCategoryClickConditionInput
  ) {
    createCategoryClick(input: $input, condition: $condition) {
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
export const updateCategoryClick = /* GraphQL */ `
  mutation UpdateCategoryClick(
    $input: UpdateCategoryClickInput!
    $condition: ModelCategoryClickConditionInput
  ) {
    updateCategoryClick(input: $input, condition: $condition) {
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
export const deleteCategoryClick = /* GraphQL */ `
  mutation DeleteCategoryClick(
    $input: DeleteCategoryClickInput!
    $condition: ModelCategoryClickConditionInput
  ) {
    deleteCategoryClick(input: $input, condition: $condition) {
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
export const createClick = /* GraphQL */ `
  mutation CreateClick(
    $input: CreateClickInput!
    $condition: ModelClickConditionInput
  ) {
    createClick(input: $input, condition: $condition) {
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
export const updateClick = /* GraphQL */ `
  mutation UpdateClick(
    $input: UpdateClickInput!
    $condition: ModelClickConditionInput
  ) {
    updateClick(input: $input, condition: $condition) {
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
export const deleteClick = /* GraphQL */ `
  mutation DeleteClick(
    $input: DeleteClickInput!
    $condition: ModelClickConditionInput
  ) {
    deleteClick(input: $input, condition: $condition) {
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
export const createIndiaClick = /* GraphQL */ `
  mutation CreateIndiaClick(
    $input: CreateIndiaClickInput!
    $condition: ModelIndiaClickConditionInput
  ) {
    createIndiaClick(input: $input, condition: $condition) {
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
export const updateIndiaClick = /* GraphQL */ `
  mutation UpdateIndiaClick(
    $input: UpdateIndiaClickInput!
    $condition: ModelIndiaClickConditionInput
  ) {
    updateIndiaClick(input: $input, condition: $condition) {
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
export const deleteIndiaClick = /* GraphQL */ `
  mutation DeleteIndiaClick(
    $input: DeleteIndiaClickInput!
    $condition: ModelIndiaClickConditionInput
  ) {
    deleteIndiaClick(input: $input, condition: $condition) {
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
export const createIndiaCourseSearch = /* GraphQL */ `
  mutation CreateIndiaCourseSearch(
    $input: CreateIndiaCourseSearchInput!
    $condition: ModelIndiaCourseSearchConditionInput
  ) {
    createIndiaCourseSearch(input: $input, condition: $condition) {
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
export const updateIndiaCourseSearch = /* GraphQL */ `
  mutation UpdateIndiaCourseSearch(
    $input: UpdateIndiaCourseSearchInput!
    $condition: ModelIndiaCourseSearchConditionInput
  ) {
    updateIndiaCourseSearch(input: $input, condition: $condition) {
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
export const deleteIndiaCourseSearch = /* GraphQL */ `
  mutation DeleteIndiaCourseSearch(
    $input: DeleteIndiaCourseSearchInput!
    $condition: ModelIndiaCourseSearchConditionInput
  ) {
    deleteIndiaCourseSearch(input: $input, condition: $condition) {
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
export const createIndexTemplate = /* GraphQL */ `
  mutation CreateIndexTemplate(
    $input: CreateIndexTemplateInput!
    $condition: ModelIndexTemplateConditionInput
  ) {
    createIndexTemplate(input: $input, condition: $condition) {
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
export const updateIndexTemplate = /* GraphQL */ `
  mutation UpdateIndexTemplate(
    $input: UpdateIndexTemplateInput!
    $condition: ModelIndexTemplateConditionInput
  ) {
    updateIndexTemplate(input: $input, condition: $condition) {
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
export const deleteIndexTemplate = /* GraphQL */ `
  mutation DeleteIndexTemplate(
    $input: DeleteIndexTemplateInput!
    $condition: ModelIndexTemplateConditionInput
  ) {
    deleteIndexTemplate(input: $input, condition: $condition) {
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
export const createIndexRow = /* GraphQL */ `
  mutation CreateIndexRow(
    $input: CreateIndexRowInput!
    $condition: ModelIndexRowConditionInput
  ) {
    createIndexRow(input: $input, condition: $condition) {
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
export const updateIndexRow = /* GraphQL */ `
  mutation UpdateIndexRow(
    $input: UpdateIndexRowInput!
    $condition: ModelIndexRowConditionInput
  ) {
    updateIndexRow(input: $input, condition: $condition) {
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
export const deleteIndexRow = /* GraphQL */ `
  mutation DeleteIndexRow(
    $input: DeleteIndexRowInput!
    $condition: ModelIndexRowConditionInput
  ) {
    deleteIndexRow(input: $input, condition: $condition) {
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
export const createIndexPage = /* GraphQL */ `
  mutation CreateIndexPage(
    $input: CreateIndexPageInput!
    $condition: ModelIndexPageConditionInput
  ) {
    createIndexPage(input: $input, condition: $condition) {
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
export const updateIndexPage = /* GraphQL */ `
  mutation UpdateIndexPage(
    $input: UpdateIndexPageInput!
    $condition: ModelIndexPageConditionInput
  ) {
    updateIndexPage(input: $input, condition: $condition) {
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
export const deleteIndexPage = /* GraphQL */ `
  mutation DeleteIndexPage(
    $input: DeleteIndexPageInput!
    $condition: ModelIndexPageConditionInput
  ) {
    deleteIndexPage(input: $input, condition: $condition) {
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
export const createFaq = /* GraphQL */ `
  mutation CreateFaq(
    $input: CreateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    createFaq(input: $input, condition: $condition) {
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
export const updateFaq = /* GraphQL */ `
  mutation UpdateFaq(
    $input: UpdateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    updateFaq(input: $input, condition: $condition) {
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
export const deleteFaq = /* GraphQL */ `
  mutation DeleteFaq(
    $input: DeleteFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    deleteFaq(input: $input, condition: $condition) {
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
export const createGlossaryTerm = /* GraphQL */ `
  mutation CreateGlossaryTerm(
    $input: CreateGlossaryTermInput!
    $condition: ModelGlossaryTermConditionInput
  ) {
    createGlossaryTerm(input: $input, condition: $condition) {
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
export const updateGlossaryTerm = /* GraphQL */ `
  mutation UpdateGlossaryTerm(
    $input: UpdateGlossaryTermInput!
    $condition: ModelGlossaryTermConditionInput
  ) {
    updateGlossaryTerm(input: $input, condition: $condition) {
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
export const deleteGlossaryTerm = /* GraphQL */ `
  mutation DeleteGlossaryTerm(
    $input: DeleteGlossaryTermInput!
    $condition: ModelGlossaryTermConditionInput
  ) {
    deleteGlossaryTerm(input: $input, condition: $condition) {
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
export const createEventTemplate = /* GraphQL */ `
  mutation CreateEventTemplate(
    $input: CreateEventTemplateInput!
    $condition: ModelEventTemplateConditionInput
  ) {
    createEventTemplate(input: $input, condition: $condition) {
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
export const updateEventTemplate = /* GraphQL */ `
  mutation UpdateEventTemplate(
    $input: UpdateEventTemplateInput!
    $condition: ModelEventTemplateConditionInput
  ) {
    updateEventTemplate(input: $input, condition: $condition) {
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
export const deleteEventTemplate = /* GraphQL */ `
  mutation DeleteEventTemplate(
    $input: DeleteEventTemplateInput!
    $condition: ModelEventTemplateConditionInput
  ) {
    deleteEventTemplate(input: $input, condition: $condition) {
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
export const createEventPhoto = /* GraphQL */ `
  mutation CreateEventPhoto(
    $input: CreateEventPhotoInput!
    $condition: ModelEventPhotoConditionInput
  ) {
    createEventPhoto(input: $input, condition: $condition) {
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
export const updateEventPhoto = /* GraphQL */ `
  mutation UpdateEventPhoto(
    $input: UpdateEventPhotoInput!
    $condition: ModelEventPhotoConditionInput
  ) {
    updateEventPhoto(input: $input, condition: $condition) {
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
export const deleteEventPhoto = /* GraphQL */ `
  mutation DeleteEventPhoto(
    $input: DeleteEventPhotoInput!
    $condition: ModelEventPhotoConditionInput
  ) {
    deleteEventPhoto(input: $input, condition: $condition) {
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
export const createUserEventPhoto = /* GraphQL */ `
  mutation CreateUserEventPhoto(
    $input: CreateUserEventPhotoInput!
    $condition: ModelUserEventPhotoConditionInput
  ) {
    createUserEventPhoto(input: $input, condition: $condition) {
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
export const updateUserEventPhoto = /* GraphQL */ `
  mutation UpdateUserEventPhoto(
    $input: UpdateUserEventPhotoInput!
    $condition: ModelUserEventPhotoConditionInput
  ) {
    updateUserEventPhoto(input: $input, condition: $condition) {
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
export const deleteUserEventPhoto = /* GraphQL */ `
  mutation DeleteUserEventPhoto(
    $input: DeleteUserEventPhotoInput!
    $condition: ModelUserEventPhotoConditionInput
  ) {
    deleteUserEventPhoto(input: $input, condition: $condition) {
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
export const createEventPresentation = /* GraphQL */ `
  mutation CreateEventPresentation(
    $input: CreateEventPresentationInput!
    $condition: ModelEventPresentationConditionInput
  ) {
    createEventPresentation(input: $input, condition: $condition) {
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
export const updateEventPresentation = /* GraphQL */ `
  mutation UpdateEventPresentation(
    $input: UpdateEventPresentationInput!
    $condition: ModelEventPresentationConditionInput
  ) {
    updateEventPresentation(input: $input, condition: $condition) {
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
export const deleteEventPresentation = /* GraphQL */ `
  mutation DeleteEventPresentation(
    $input: DeleteEventPresentationInput!
    $condition: ModelEventPresentationConditionInput
  ) {
    deleteEventPresentation(input: $input, condition: $condition) {
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
export const createEventAgenda = /* GraphQL */ `
  mutation CreateEventAgenda(
    $input: CreateEventAgendaInput!
    $condition: ModelEventAgendaConditionInput
  ) {
    createEventAgenda(input: $input, condition: $condition) {
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
export const updateEventAgenda = /* GraphQL */ `
  mutation UpdateEventAgenda(
    $input: UpdateEventAgendaInput!
    $condition: ModelEventAgendaConditionInput
  ) {
    updateEventAgenda(input: $input, condition: $condition) {
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
export const deleteEventAgenda = /* GraphQL */ `
  mutation DeleteEventAgenda(
    $input: DeleteEventAgendaInput!
    $condition: ModelEventAgendaConditionInput
  ) {
    deleteEventAgenda(input: $input, condition: $condition) {
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
export const createEventAgendaItem = /* GraphQL */ `
  mutation CreateEventAgendaItem(
    $input: CreateEventAgendaItemInput!
    $condition: ModelEventAgendaItemConditionInput
  ) {
    createEventAgendaItem(input: $input, condition: $condition) {
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
export const updateEventAgendaItem = /* GraphQL */ `
  mutation UpdateEventAgendaItem(
    $input: UpdateEventAgendaItemInput!
    $condition: ModelEventAgendaItemConditionInput
  ) {
    updateEventAgendaItem(input: $input, condition: $condition) {
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
export const deleteEventAgendaItem = /* GraphQL */ `
  mutation DeleteEventAgendaItem(
    $input: DeleteEventAgendaItemInput!
    $condition: ModelEventAgendaItemConditionInput
  ) {
    deleteEventAgendaItem(input: $input, condition: $condition) {
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
export const createEventSpeaker = /* GraphQL */ `
  mutation CreateEventSpeaker(
    $input: CreateEventSpeakerInput!
    $condition: ModelEventSpeakerConditionInput
  ) {
    createEventSpeaker(input: $input, condition: $condition) {
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
export const updateEventSpeaker = /* GraphQL */ `
  mutation UpdateEventSpeaker(
    $input: UpdateEventSpeakerInput!
    $condition: ModelEventSpeakerConditionInput
  ) {
    updateEventSpeaker(input: $input, condition: $condition) {
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
export const deleteEventSpeaker = /* GraphQL */ `
  mutation DeleteEventSpeaker(
    $input: DeleteEventSpeakerInput!
    $condition: ModelEventSpeakerConditionInput
  ) {
    deleteEventSpeaker(input: $input, condition: $condition) {
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
export const createEventClick = /* GraphQL */ `
  mutation CreateEventClick(
    $input: CreateEventClickInput!
    $condition: ModelEventClickConditionInput
  ) {
    createEventClick(input: $input, condition: $condition) {
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
export const updateEventClick = /* GraphQL */ `
  mutation UpdateEventClick(
    $input: UpdateEventClickInput!
    $condition: ModelEventClickConditionInput
  ) {
    updateEventClick(input: $input, condition: $condition) {
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
export const deleteEventClick = /* GraphQL */ `
  mutation DeleteEventClick(
    $input: DeleteEventClickInput!
    $condition: ModelEventClickConditionInput
  ) {
    deleteEventClick(input: $input, condition: $condition) {
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
export const createCertificateClick = /* GraphQL */ `
  mutation CreateCertificateClick(
    $input: CreateCertificateClickInput!
    $condition: ModelCertificateClickConditionInput
  ) {
    createCertificateClick(input: $input, condition: $condition) {
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
export const updateCertificateClick = /* GraphQL */ `
  mutation UpdateCertificateClick(
    $input: UpdateCertificateClickInput!
    $condition: ModelCertificateClickConditionInput
  ) {
    updateCertificateClick(input: $input, condition: $condition) {
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
export const deleteCertificateClick = /* GraphQL */ `
  mutation DeleteCertificateClick(
    $input: DeleteCertificateClickInput!
    $condition: ModelCertificateClickConditionInput
  ) {
    deleteCertificateClick(input: $input, condition: $condition) {
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
export const createIndexClick = /* GraphQL */ `
  mutation CreateIndexClick(
    $input: CreateIndexClickInput!
    $condition: ModelIndexClickConditionInput
  ) {
    createIndexClick(input: $input, condition: $condition) {
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
export const updateIndexClick = /* GraphQL */ `
  mutation UpdateIndexClick(
    $input: UpdateIndexClickInput!
    $condition: ModelIndexClickConditionInput
  ) {
    updateIndexClick(input: $input, condition: $condition) {
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
export const deleteIndexClick = /* GraphQL */ `
  mutation DeleteIndexClick(
    $input: DeleteIndexClickInput!
    $condition: ModelIndexClickConditionInput
  ) {
    deleteIndexClick(input: $input, condition: $condition) {
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
export const createEmailSubscription = /* GraphQL */ `
  mutation CreateEmailSubscription(
    $input: CreateEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    createEmailSubscription(input: $input, condition: $condition) {
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
export const updateEmailSubscription = /* GraphQL */ `
  mutation UpdateEmailSubscription(
    $input: UpdateEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    updateEmailSubscription(input: $input, condition: $condition) {
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
export const deleteEmailSubscription = /* GraphQL */ `
  mutation DeleteEmailSubscription(
    $input: DeleteEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    deleteEmailSubscription(input: $input, condition: $condition) {
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
export const createImageObject = /* GraphQL */ `
  mutation CreateImageObject(
    $input: CreateImageObjectInput!
    $condition: ModelImageObjectConditionInput
  ) {
    createImageObject(input: $input, condition: $condition) {
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
export const updateImageObject = /* GraphQL */ `
  mutation UpdateImageObject(
    $input: UpdateImageObjectInput!
    $condition: ModelImageObjectConditionInput
  ) {
    updateImageObject(input: $input, condition: $condition) {
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
export const deleteImageObject = /* GraphQL */ `
  mutation DeleteImageObject(
    $input: DeleteImageObjectInput!
    $condition: ModelImageObjectConditionInput
  ) {
    deleteImageObject(input: $input, condition: $condition) {
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
export const createPurchase = /* GraphQL */ `
  mutation CreatePurchase(
    $input: CreatePurchaseInput!
    $condition: ModelPurchaseConditionInput
  ) {
    createPurchase(input: $input, condition: $condition) {
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
export const updatePurchase = /* GraphQL */ `
  mutation UpdatePurchase(
    $input: UpdatePurchaseInput!
    $condition: ModelPurchaseConditionInput
  ) {
    updatePurchase(input: $input, condition: $condition) {
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
export const deletePurchase = /* GraphQL */ `
  mutation DeletePurchase(
    $input: DeletePurchaseInput!
    $condition: ModelPurchaseConditionInput
  ) {
    deletePurchase(input: $input, condition: $condition) {
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
export const createAnalysis = /* GraphQL */ `
  mutation CreateAnalysis(
    $input: CreateAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    createAnalysis(input: $input, condition: $condition) {
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
export const updateAnalysis = /* GraphQL */ `
  mutation UpdateAnalysis(
    $input: UpdateAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    updateAnalysis(input: $input, condition: $condition) {
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
export const deleteAnalysis = /* GraphQL */ `
  mutation DeleteAnalysis(
    $input: DeleteAnalysisInput!
    $condition: ModelAnalysisConditionInput
  ) {
    deleteAnalysis(input: $input, condition: $condition) {
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
export const createAchievement = /* GraphQL */ `
  mutation CreateAchievement(
    $input: CreateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    createAchievement(input: $input, condition: $condition) {
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
export const updateAchievement = /* GraphQL */ `
  mutation UpdateAchievement(
    $input: UpdateAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    updateAchievement(input: $input, condition: $condition) {
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
export const deleteAchievement = /* GraphQL */ `
  mutation DeleteAchievement(
    $input: DeleteAchievementInput!
    $condition: ModelAchievementConditionInput
  ) {
    deleteAchievement(input: $input, condition: $condition) {
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
export const createTest = /* GraphQL */ `
  mutation CreateTest(
    $input: CreateTestInput!
    $condition: ModelTestConditionInput
  ) {
    createTest(input: $input, condition: $condition) {
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
export const updateTest = /* GraphQL */ `
  mutation UpdateTest(
    $input: UpdateTestInput!
    $condition: ModelTestConditionInput
  ) {
    updateTest(input: $input, condition: $condition) {
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
export const deleteTest = /* GraphQL */ `
  mutation DeleteTest(
    $input: DeleteTestInput!
    $condition: ModelTestConditionInput
  ) {
    deleteTest(input: $input, condition: $condition) {
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
export const createTestTask = /* GraphQL */ `
  mutation CreateTestTask(
    $input: CreateTestTaskInput!
    $condition: ModelTestTaskConditionInput
  ) {
    createTestTask(input: $input, condition: $condition) {
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
export const updateTestTask = /* GraphQL */ `
  mutation UpdateTestTask(
    $input: UpdateTestTaskInput!
    $condition: ModelTestTaskConditionInput
  ) {
    updateTestTask(input: $input, condition: $condition) {
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
export const deleteTestTask = /* GraphQL */ `
  mutation DeleteTestTask(
    $input: DeleteTestTaskInput!
    $condition: ModelTestTaskConditionInput
  ) {
    deleteTestTask(input: $input, condition: $condition) {
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
export const createCourseReview = /* GraphQL */ `
  mutation CreateCourseReview(
    $input: CreateCourseReviewInput!
    $condition: ModelCourseReviewConditionInput
  ) {
    createCourseReview(input: $input, condition: $condition) {
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
export const updateCourseReview = /* GraphQL */ `
  mutation UpdateCourseReview(
    $input: UpdateCourseReviewInput!
    $condition: ModelCourseReviewConditionInput
  ) {
    updateCourseReview(input: $input, condition: $condition) {
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
export const deleteCourseReview = /* GraphQL */ `
  mutation DeleteCourseReview(
    $input: DeleteCourseReviewInput!
    $condition: ModelCourseReviewConditionInput
  ) {
    deleteCourseReview(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createSearchLog = /* GraphQL */ `
  mutation CreateSearchLog(
    $input: CreateSearchLogInput!
    $condition: ModelSearchLogConditionInput
  ) {
    createSearchLog(input: $input, condition: $condition) {
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
export const updateSearchLog = /* GraphQL */ `
  mutation UpdateSearchLog(
    $input: UpdateSearchLogInput!
    $condition: ModelSearchLogConditionInput
  ) {
    updateSearchLog(input: $input, condition: $condition) {
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
export const deleteSearchLog = /* GraphQL */ `
  mutation DeleteSearchLog(
    $input: DeleteSearchLogInput!
    $condition: ModelSearchLogConditionInput
  ) {
    deleteSearchLog(input: $input, condition: $condition) {
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
export const createPartner = /* GraphQL */ `
  mutation CreatePartner(
    $input: CreatePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    createPartner(input: $input, condition: $condition) {
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
export const updatePartner = /* GraphQL */ `
  mutation UpdatePartner(
    $input: UpdatePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    updatePartner(input: $input, condition: $condition) {
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
export const deletePartner = /* GraphQL */ `
  mutation DeletePartner(
    $input: DeletePartnerInput!
    $condition: ModelPartnerConditionInput
  ) {
    deletePartner(input: $input, condition: $condition) {
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
export const createPartnerAdmin = /* GraphQL */ `
  mutation CreatePartnerAdmin(
    $input: CreatePartnerAdminInput!
    $condition: ModelPartnerAdminConditionInput
  ) {
    createPartnerAdmin(input: $input, condition: $condition) {
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
export const updatePartnerAdmin = /* GraphQL */ `
  mutation UpdatePartnerAdmin(
    $input: UpdatePartnerAdminInput!
    $condition: ModelPartnerAdminConditionInput
  ) {
    updatePartnerAdmin(input: $input, condition: $condition) {
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
export const deletePartnerAdmin = /* GraphQL */ `
  mutation DeletePartnerAdmin(
    $input: DeletePartnerAdminInput!
    $condition: ModelPartnerAdminConditionInput
  ) {
    deletePartnerAdmin(input: $input, condition: $condition) {
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
export const createLibrarySurvey = /* GraphQL */ `
  mutation CreateLibrarySurvey(
    $input: CreateLibrarySurveyInput!
    $condition: ModelLibrarySurveyConditionInput
  ) {
    createLibrarySurvey(input: $input, condition: $condition) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLibrarySurvey = /* GraphQL */ `
  mutation UpdateLibrarySurvey(
    $input: UpdateLibrarySurveyInput!
    $condition: ModelLibrarySurveyConditionInput
  ) {
    updateLibrarySurvey(input: $input, condition: $condition) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLibrarySurvey = /* GraphQL */ `
  mutation DeleteLibrarySurvey(
    $input: DeleteLibrarySurveyInput!
    $condition: ModelLibrarySurveyConditionInput
  ) {
    deleteLibrarySurvey(input: $input, condition: $condition) {
      id
      company
      options
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCyberMondayCode = /* GraphQL */ `
  mutation CreateCyberMondayCode(
    $input: CreateCyberMondayCodeInput!
    $condition: ModelCyberMondayCodeConditionInput
  ) {
    createCyberMondayCode(input: $input, condition: $condition) {
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
export const updateCyberMondayCode = /* GraphQL */ `
  mutation UpdateCyberMondayCode(
    $input: UpdateCyberMondayCodeInput!
    $condition: ModelCyberMondayCodeConditionInput
  ) {
    updateCyberMondayCode(input: $input, condition: $condition) {
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
export const deleteCyberMondayCode = /* GraphQL */ `
  mutation DeleteCyberMondayCode(
    $input: DeleteCyberMondayCodeInput!
    $condition: ModelCyberMondayCodeConditionInput
  ) {
    deleteCyberMondayCode(input: $input, condition: $condition) {
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
export const createApprovedAPS25MediaPage = /* GraphQL */ `
  mutation CreateApprovedAPS25MediaPage(
    $input: CreateApprovedAPS25MediaPageInput!
    $condition: ModelApprovedAPS25MediaPageConditionInput
  ) {
    createApprovedAPS25MediaPage(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateApprovedAPS25MediaPage = /* GraphQL */ `
  mutation UpdateApprovedAPS25MediaPage(
    $input: UpdateApprovedAPS25MediaPageInput!
    $condition: ModelApprovedAPS25MediaPageConditionInput
  ) {
    updateApprovedAPS25MediaPage(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteApprovedAPS25MediaPage = /* GraphQL */ `
  mutation DeleteApprovedAPS25MediaPage(
    $input: DeleteApprovedAPS25MediaPageInput!
    $condition: ModelApprovedAPS25MediaPageConditionInput
  ) {
    deleteApprovedAPS25MediaPage(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCourseOutlineRequest = /* GraphQL */ `
  mutation CreateCourseOutlineRequest(
    $input: CreateCourseOutlineRequestInput!
    $condition: ModelCourseOutlineRequestConditionInput
  ) {
    createCourseOutlineRequest(input: $input, condition: $condition) {
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
export const updateCourseOutlineRequest = /* GraphQL */ `
  mutation UpdateCourseOutlineRequest(
    $input: UpdateCourseOutlineRequestInput!
    $condition: ModelCourseOutlineRequestConditionInput
  ) {
    updateCourseOutlineRequest(input: $input, condition: $condition) {
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
export const deleteCourseOutlineRequest = /* GraphQL */ `
  mutation DeleteCourseOutlineRequest(
    $input: DeleteCourseOutlineRequestInput!
    $condition: ModelCourseOutlineRequestConditionInput
  ) {
    deleteCourseOutlineRequest(input: $input, condition: $condition) {
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
export const createUserGameStats = /* GraphQL */ `
  mutation CreateUserGameStats(
    $input: CreateUserGameStatsInput!
    $condition: ModelUserGameStatsConditionInput
  ) {
    createUserGameStats(input: $input, condition: $condition) {
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
export const updateUserGameStats = /* GraphQL */ `
  mutation UpdateUserGameStats(
    $input: UpdateUserGameStatsInput!
    $condition: ModelUserGameStatsConditionInput
  ) {
    updateUserGameStats(input: $input, condition: $condition) {
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
export const deleteUserGameStats = /* GraphQL */ `
  mutation DeleteUserGameStats(
    $input: DeleteUserGameStatsInput!
    $condition: ModelUserGameStatsConditionInput
  ) {
    deleteUserGameStats(input: $input, condition: $condition) {
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
export const createLeaderboardEntry = /* GraphQL */ `
  mutation CreateLeaderboardEntry(
    $input: CreateLeaderboardEntryInput!
    $condition: ModelLeaderboardEntryConditionInput
  ) {
    createLeaderboardEntry(input: $input, condition: $condition) {
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
export const updateLeaderboardEntry = /* GraphQL */ `
  mutation UpdateLeaderboardEntry(
    $input: UpdateLeaderboardEntryInput!
    $condition: ModelLeaderboardEntryConditionInput
  ) {
    updateLeaderboardEntry(input: $input, condition: $condition) {
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
export const deleteLeaderboardEntry = /* GraphQL */ `
  mutation DeleteLeaderboardEntry(
    $input: DeleteLeaderboardEntryInput!
    $condition: ModelLeaderboardEntryConditionInput
  ) {
    deleteLeaderboardEntry(input: $input, condition: $condition) {
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
export const createAnswerEvent = /* GraphQL */ `
  mutation CreateAnswerEvent(
    $input: CreateAnswerEventInput!
    $condition: ModelAnswerEventConditionInput
  ) {
    createAnswerEvent(input: $input, condition: $condition) {
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
export const updateAnswerEvent = /* GraphQL */ `
  mutation UpdateAnswerEvent(
    $input: UpdateAnswerEventInput!
    $condition: ModelAnswerEventConditionInput
  ) {
    updateAnswerEvent(input: $input, condition: $condition) {
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
export const deleteAnswerEvent = /* GraphQL */ `
  mutation DeleteAnswerEvent(
    $input: DeleteAnswerEventInput!
    $condition: ModelAnswerEventConditionInput
  ) {
    deleteAnswerEvent(input: $input, condition: $condition) {
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
export const createLessonTags = /* GraphQL */ `
  mutation CreateLessonTags(
    $input: CreateLessonTagsInput!
    $condition: ModelLessonTagsConditionInput
  ) {
    createLessonTags(input: $input, condition: $condition) {
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
export const updateLessonTags = /* GraphQL */ `
  mutation UpdateLessonTags(
    $input: UpdateLessonTagsInput!
    $condition: ModelLessonTagsConditionInput
  ) {
    updateLessonTags(input: $input, condition: $condition) {
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
export const deleteLessonTags = /* GraphQL */ `
  mutation DeleteLessonTags(
    $input: DeleteLessonTagsInput!
    $condition: ModelLessonTagsConditionInput
  ) {
    deleteLessonTags(input: $input, condition: $condition) {
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
export const createCertificateByCategory = /* GraphQL */ `
  mutation CreateCertificateByCategory(
    $input: CreateCertificateByCategoryInput!
    $condition: ModelCertificateByCategoryConditionInput
  ) {
    createCertificateByCategory(input: $input, condition: $condition) {
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
export const updateCertificateByCategory = /* GraphQL */ `
  mutation UpdateCertificateByCategory(
    $input: UpdateCertificateByCategoryInput!
    $condition: ModelCertificateByCategoryConditionInput
  ) {
    updateCertificateByCategory(input: $input, condition: $condition) {
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
export const deleteCertificateByCategory = /* GraphQL */ `
  mutation DeleteCertificateByCategory(
    $input: DeleteCertificateByCategoryInput!
    $condition: ModelCertificateByCategoryConditionInput
  ) {
    deleteCertificateByCategory(input: $input, condition: $condition) {
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
export const createCertificateCourses = /* GraphQL */ `
  mutation CreateCertificateCourses(
    $input: CreateCertificateCoursesInput!
    $condition: ModelCertificateCoursesConditionInput
  ) {
    createCertificateCourses(input: $input, condition: $condition) {
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
export const updateCertificateCourses = /* GraphQL */ `
  mutation UpdateCertificateCourses(
    $input: UpdateCertificateCoursesInput!
    $condition: ModelCertificateCoursesConditionInput
  ) {
    updateCertificateCourses(input: $input, condition: $condition) {
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
export const deleteCertificateCourses = /* GraphQL */ `
  mutation DeleteCertificateCourses(
    $input: DeleteCertificateCoursesInput!
    $condition: ModelCertificateCoursesConditionInput
  ) {
    deleteCertificateCourses(input: $input, condition: $condition) {
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
export const createArticleRelatedCourses = /* GraphQL */ `
  mutation CreateArticleRelatedCourses(
    $input: CreateArticleRelatedCoursesInput!
    $condition: ModelArticleRelatedCoursesConditionInput
  ) {
    createArticleRelatedCourses(input: $input, condition: $condition) {
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
export const updateArticleRelatedCourses = /* GraphQL */ `
  mutation UpdateArticleRelatedCourses(
    $input: UpdateArticleRelatedCoursesInput!
    $condition: ModelArticleRelatedCoursesConditionInput
  ) {
    updateArticleRelatedCourses(input: $input, condition: $condition) {
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
export const deleteArticleRelatedCourses = /* GraphQL */ `
  mutation DeleteArticleRelatedCourses(
    $input: DeleteArticleRelatedCoursesInput!
    $condition: ModelArticleRelatedCoursesConditionInput
  ) {
    deleteArticleRelatedCourses(input: $input, condition: $condition) {
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
export const createUserCompletedLessons = /* GraphQL */ `
  mutation CreateUserCompletedLessons(
    $input: CreateUserCompletedLessonsInput!
    $condition: ModelUserCompletedLessonsConditionInput
  ) {
    createUserCompletedLessons(input: $input, condition: $condition) {
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
export const updateUserCompletedLessons = /* GraphQL */ `
  mutation UpdateUserCompletedLessons(
    $input: UpdateUserCompletedLessonsInput!
    $condition: ModelUserCompletedLessonsConditionInput
  ) {
    updateUserCompletedLessons(input: $input, condition: $condition) {
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
export const deleteUserCompletedLessons = /* GraphQL */ `
  mutation DeleteUserCompletedLessons(
    $input: DeleteUserCompletedLessonsInput!
    $condition: ModelUserCompletedLessonsConditionInput
  ) {
    deleteUserCompletedLessons(input: $input, condition: $condition) {
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
export const createLessonGlossaryTerms = /* GraphQL */ `
  mutation CreateLessonGlossaryTerms(
    $input: CreateLessonGlossaryTermsInput!
    $condition: ModelLessonGlossaryTermsConditionInput
  ) {
    createLessonGlossaryTerms(input: $input, condition: $condition) {
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
export const updateLessonGlossaryTerms = /* GraphQL */ `
  mutation UpdateLessonGlossaryTerms(
    $input: UpdateLessonGlossaryTermsInput!
    $condition: ModelLessonGlossaryTermsConditionInput
  ) {
    updateLessonGlossaryTerms(input: $input, condition: $condition) {
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
export const deleteLessonGlossaryTerms = /* GraphQL */ `
  mutation DeleteLessonGlossaryTerms(
    $input: DeleteLessonGlossaryTermsInput!
    $condition: ModelLessonGlossaryTermsConditionInput
  ) {
    deleteLessonGlossaryTerms(input: $input, condition: $condition) {
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
export const createAuthorTemplates = /* GraphQL */ `
  mutation CreateAuthorTemplates(
    $input: CreateAuthorTemplatesInput!
    $condition: ModelAuthorTemplatesConditionInput
  ) {
    createAuthorTemplates(input: $input, condition: $condition) {
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
export const updateAuthorTemplates = /* GraphQL */ `
  mutation UpdateAuthorTemplates(
    $input: UpdateAuthorTemplatesInput!
    $condition: ModelAuthorTemplatesConditionInput
  ) {
    updateAuthorTemplates(input: $input, condition: $condition) {
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
export const deleteAuthorTemplates = /* GraphQL */ `
  mutation DeleteAuthorTemplates(
    $input: DeleteAuthorTemplatesInput!
    $condition: ModelAuthorTemplatesConditionInput
  ) {
    deleteAuthorTemplates(input: $input, condition: $condition) {
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
export const createAchievementUsers = /* GraphQL */ `
  mutation CreateAchievementUsers(
    $input: CreateAchievementUsersInput!
    $condition: ModelAchievementUsersConditionInput
  ) {
    createAchievementUsers(input: $input, condition: $condition) {
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
export const updateAchievementUsers = /* GraphQL */ `
  mutation UpdateAchievementUsers(
    $input: UpdateAchievementUsersInput!
    $condition: ModelAchievementUsersConditionInput
  ) {
    updateAchievementUsers(input: $input, condition: $condition) {
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
export const deleteAchievementUsers = /* GraphQL */ `
  mutation DeleteAchievementUsers(
    $input: DeleteAchievementUsersInput!
    $condition: ModelAchievementUsersConditionInput
  ) {
    deleteAchievementUsers(input: $input, condition: $condition) {
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
export const createCohortUsers = /* GraphQL */ `
  mutation CreateCohortUsers(
    $input: CreateCohortUsersInput!
    $condition: ModelCohortUsersConditionInput
  ) {
    createCohortUsers(input: $input, condition: $condition) {
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
export const updateCohortUsers = /* GraphQL */ `
  mutation UpdateCohortUsers(
    $input: UpdateCohortUsersInput!
    $condition: ModelCohortUsersConditionInput
  ) {
    updateCohortUsers(input: $input, condition: $condition) {
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
export const deleteCohortUsers = /* GraphQL */ `
  mutation DeleteCohortUsers(
    $input: DeleteCohortUsersInput!
    $condition: ModelCohortUsersConditionInput
  ) {
    deleteCohortUsers(input: $input, condition: $condition) {
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
export const createUserWishlist = /* GraphQL */ `
  mutation CreateUserWishlist(
    $input: CreateUserWishlistInput!
    $condition: ModelUserWishlistConditionInput
  ) {
    createUserWishlist(input: $input, condition: $condition) {
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
export const updateUserWishlist = /* GraphQL */ `
  mutation UpdateUserWishlist(
    $input: UpdateUserWishlistInput!
    $condition: ModelUserWishlistConditionInput
  ) {
    updateUserWishlist(input: $input, condition: $condition) {
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
export const deleteUserWishlist = /* GraphQL */ `
  mutation DeleteUserWishlist(
    $input: DeleteUserWishlistInput!
    $condition: ModelUserWishlistConditionInput
  ) {
    deleteUserWishlist(input: $input, condition: $condition) {
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
export const createCollectionCourses = /* GraphQL */ `
  mutation CreateCollectionCourses(
    $input: CreateCollectionCoursesInput!
    $condition: ModelCollectionCoursesConditionInput
  ) {
    createCollectionCourses(input: $input, condition: $condition) {
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
export const updateCollectionCourses = /* GraphQL */ `
  mutation UpdateCollectionCourses(
    $input: UpdateCollectionCoursesInput!
    $condition: ModelCollectionCoursesConditionInput
  ) {
    updateCollectionCourses(input: $input, condition: $condition) {
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
export const deleteCollectionCourses = /* GraphQL */ `
  mutation DeleteCollectionCourses(
    $input: DeleteCollectionCoursesInput!
    $condition: ModelCollectionCoursesConditionInput
  ) {
    deleteCollectionCourses(input: $input, condition: $condition) {
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
export const createCirriculumCourses = /* GraphQL */ `
  mutation CreateCirriculumCourses(
    $input: CreateCirriculumCoursesInput!
    $condition: ModelCirriculumCoursesConditionInput
  ) {
    createCirriculumCourses(input: $input, condition: $condition) {
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
export const updateCirriculumCourses = /* GraphQL */ `
  mutation UpdateCirriculumCourses(
    $input: UpdateCirriculumCoursesInput!
    $condition: ModelCirriculumCoursesConditionInput
  ) {
    updateCirriculumCourses(input: $input, condition: $condition) {
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
export const deleteCirriculumCourses = /* GraphQL */ `
  mutation DeleteCirriculumCourses(
    $input: DeleteCirriculumCoursesInput!
    $condition: ModelCirriculumCoursesConditionInput
  ) {
    deleteCirriculumCourses(input: $input, condition: $condition) {
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
export const createCourseLessons = /* GraphQL */ `
  mutation CreateCourseLessons(
    $input: CreateCourseLessonsInput!
    $condition: ModelCourseLessonsConditionInput
  ) {
    createCourseLessons(input: $input, condition: $condition) {
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
export const updateCourseLessons = /* GraphQL */ `
  mutation UpdateCourseLessons(
    $input: UpdateCourseLessonsInput!
    $condition: ModelCourseLessonsConditionInput
  ) {
    updateCourseLessons(input: $input, condition: $condition) {
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
export const deleteCourseLessons = /* GraphQL */ `
  mutation DeleteCourseLessons(
    $input: DeleteCourseLessonsInput!
    $condition: ModelCourseLessonsConditionInput
  ) {
    deleteCourseLessons(input: $input, condition: $condition) {
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
export const createCourseInstructors = /* GraphQL */ `
  mutation CreateCourseInstructors(
    $input: CreateCourseInstructorsInput!
    $condition: ModelCourseInstructorsConditionInput
  ) {
    createCourseInstructors(input: $input, condition: $condition) {
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
export const updateCourseInstructors = /* GraphQL */ `
  mutation UpdateCourseInstructors(
    $input: UpdateCourseInstructorsInput!
    $condition: ModelCourseInstructorsConditionInput
  ) {
    updateCourseInstructors(input: $input, condition: $condition) {
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
export const deleteCourseInstructors = /* GraphQL */ `
  mutation DeleteCourseInstructors(
    $input: DeleteCourseInstructorsInput!
    $condition: ModelCourseInstructorsConditionInput
  ) {
    deleteCourseInstructors(input: $input, condition: $condition) {
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
export const createAchievementCourses = /* GraphQL */ `
  mutation CreateAchievementCourses(
    $input: CreateAchievementCoursesInput!
    $condition: ModelAchievementCoursesConditionInput
  ) {
    createAchievementCourses(input: $input, condition: $condition) {
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
export const updateAchievementCourses = /* GraphQL */ `
  mutation UpdateAchievementCourses(
    $input: UpdateAchievementCoursesInput!
    $condition: ModelAchievementCoursesConditionInput
  ) {
    updateAchievementCourses(input: $input, condition: $condition) {
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
export const deleteAchievementCourses = /* GraphQL */ `
  mutation DeleteAchievementCourses(
    $input: DeleteAchievementCoursesInput!
    $condition: ModelAchievementCoursesConditionInput
  ) {
    deleteAchievementCourses(input: $input, condition: $condition) {
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
export const createPartnerCourses = /* GraphQL */ `
  mutation CreatePartnerCourses(
    $input: CreatePartnerCoursesInput!
    $condition: ModelPartnerCoursesConditionInput
  ) {
    createPartnerCourses(input: $input, condition: $condition) {
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
export const updatePartnerCourses = /* GraphQL */ `
  mutation UpdatePartnerCourses(
    $input: UpdatePartnerCoursesInput!
    $condition: ModelPartnerCoursesConditionInput
  ) {
    updatePartnerCourses(input: $input, condition: $condition) {
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
export const deletePartnerCourses = /* GraphQL */ `
  mutation DeletePartnerCourses(
    $input: DeletePartnerCoursesInput!
    $condition: ModelPartnerCoursesConditionInput
  ) {
    deletePartnerCourses(input: $input, condition: $condition) {
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
export const createLibraryCourses = /* GraphQL */ `
  mutation CreateLibraryCourses(
    $input: CreateLibraryCoursesInput!
    $condition: ModelLibraryCoursesConditionInput
  ) {
    createLibraryCourses(input: $input, condition: $condition) {
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
export const updateLibraryCourses = /* GraphQL */ `
  mutation UpdateLibraryCourses(
    $input: UpdateLibraryCoursesInput!
    $condition: ModelLibraryCoursesConditionInput
  ) {
    updateLibraryCourses(input: $input, condition: $condition) {
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
export const deleteLibraryCourses = /* GraphQL */ `
  mutation DeleteLibraryCourses(
    $input: DeleteLibraryCoursesInput!
    $condition: ModelLibraryCoursesConditionInput
  ) {
    deleteLibraryCourses(input: $input, condition: $condition) {
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
export const createCourseGlossaryTerms = /* GraphQL */ `
  mutation CreateCourseGlossaryTerms(
    $input: CreateCourseGlossaryTermsInput!
    $condition: ModelCourseGlossaryTermsConditionInput
  ) {
    createCourseGlossaryTerms(input: $input, condition: $condition) {
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
export const updateCourseGlossaryTerms = /* GraphQL */ `
  mutation UpdateCourseGlossaryTerms(
    $input: UpdateCourseGlossaryTermsInput!
    $condition: ModelCourseGlossaryTermsConditionInput
  ) {
    updateCourseGlossaryTerms(input: $input, condition: $condition) {
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
export const deleteCourseGlossaryTerms = /* GraphQL */ `
  mutation DeleteCourseGlossaryTerms(
    $input: DeleteCourseGlossaryTermsInput!
    $condition: ModelCourseGlossaryTermsConditionInput
  ) {
    deleteCourseGlossaryTerms(input: $input, condition: $condition) {
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
export const createIndexTemplateRows = /* GraphQL */ `
  mutation CreateIndexTemplateRows(
    $input: CreateIndexTemplateRowsInput!
    $condition: ModelIndexTemplateRowsConditionInput
  ) {
    createIndexTemplateRows(input: $input, condition: $condition) {
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
export const updateIndexTemplateRows = /* GraphQL */ `
  mutation UpdateIndexTemplateRows(
    $input: UpdateIndexTemplateRowsInput!
    $condition: ModelIndexTemplateRowsConditionInput
  ) {
    updateIndexTemplateRows(input: $input, condition: $condition) {
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
export const deleteIndexTemplateRows = /* GraphQL */ `
  mutation DeleteIndexTemplateRows(
    $input: DeleteIndexTemplateRowsInput!
    $condition: ModelIndexTemplateRowsConditionInput
  ) {
    deleteIndexTemplateRows(input: $input, condition: $condition) {
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
export const createPartnerAdminUsers = /* GraphQL */ `
  mutation CreatePartnerAdminUsers(
    $input: CreatePartnerAdminUsersInput!
    $condition: ModelPartnerAdminUsersConditionInput
  ) {
    createPartnerAdminUsers(input: $input, condition: $condition) {
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
export const updatePartnerAdminUsers = /* GraphQL */ `
  mutation UpdatePartnerAdminUsers(
    $input: UpdatePartnerAdminUsersInput!
    $condition: ModelPartnerAdminUsersConditionInput
  ) {
    updatePartnerAdminUsers(input: $input, condition: $condition) {
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
export const deletePartnerAdminUsers = /* GraphQL */ `
  mutation DeletePartnerAdminUsers(
    $input: DeletePartnerAdminUsersInput!
    $condition: ModelPartnerAdminUsersConditionInput
  ) {
    deletePartnerAdminUsers(input: $input, condition: $condition) {
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
