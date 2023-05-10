/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWorktravel = /* GraphQL */ `
  subscription OnCreateWorktravel(
    $filter: ModelSubscriptionWorktravelFilterInput
    $userId: String
  ) {
    onCreateWorktravel(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      title
      comment
      departureDateTime
      returnDateTime
      routeCar
      routePoints {
        id
        comment
        address
        lat
        lng
      }
      attachments {
        id
        receiptId
        userId
        placeOfPurchase
        dateOfPurchase
        price
        currency
        tax
        isTravel
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateWorktravel = /* GraphQL */ `
  subscription OnUpdateWorktravel(
    $filter: ModelSubscriptionWorktravelFilterInput
    $userId: String
  ) {
    onUpdateWorktravel(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      title
      comment
      departureDateTime
      returnDateTime
      routeCar
      routePoints {
        id
        comment
        address
        lat
        lng
      }
      attachments {
        id
        receiptId
        userId
        placeOfPurchase
        dateOfPurchase
        price
        currency
        tax
        isTravel
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteWorktravel = /* GraphQL */ `
  subscription OnDeleteWorktravel(
    $filter: ModelSubscriptionWorktravelFilterInput
    $userId: String
  ) {
    onDeleteWorktravel(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      title
      comment
      departureDateTime
      returnDateTime
      routeCar
      routePoints {
        id
        comment
        address
        lat
        lng
      }
      attachments {
        id
        receiptId
        userId
        placeOfPurchase
        dateOfPurchase
        price
        currency
        tax
        isTravel
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateReceipt = /* GraphQL */ `
  subscription OnCreateReceipt(
    $filter: ModelSubscriptionReceiptFilterInput
    $userId: String
  ) {
    onCreateReceipt(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      dateOfPurchase
      placeOfPurchase
      receiptNumber
      class
      price
      currency
      receiptImage
      tax
      paymentMethod
      otherPayment
      comment
      isTravel
      isConfirmed
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateReceipt = /* GraphQL */ `
  subscription OnUpdateReceipt(
    $filter: ModelSubscriptionReceiptFilterInput
    $userId: String
  ) {
    onUpdateReceipt(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      dateOfPurchase
      placeOfPurchase
      receiptNumber
      class
      price
      currency
      receiptImage
      tax
      paymentMethod
      otherPayment
      comment
      isTravel
      isConfirmed
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteReceipt = /* GraphQL */ `
  subscription OnDeleteReceipt(
    $filter: ModelSubscriptionReceiptFilterInput
    $userId: String
  ) {
    onDeleteReceipt(filter: $filter, userId: $userId) {
      id
      userId
      created
      updated
      dateOfPurchase
      placeOfPurchase
      receiptNumber
      class
      price
      currency
      receiptImage
      tax
      paymentMethod
      otherPayment
      comment
      isTravel
      isConfirmed
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAgreement = /* GraphQL */ `
  subscription OnCreateAgreement(
    $filter: ModelSubscriptionAgreementFilterInput
    $userId: String
  ) {
    onCreateAgreement(filter: $filter, userId: $userId) {
      id
      name
      workers
      client
      createdAt
      userId
      user {
        userId
        name
        family_name
        icon
      }
      aditionalInfo {
        name
        description
        id
      }
      userAgreement {
        id
        status
      }
      workspaceId
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAgreement = /* GraphQL */ `
  subscription OnUpdateAgreement(
    $filter: ModelSubscriptionAgreementFilterInput
    $userId: String
  ) {
    onUpdateAgreement(filter: $filter, userId: $userId) {
      id
      name
      workers
      client
      createdAt
      userId
      user {
        userId
        name
        family_name
        icon
      }
      aditionalInfo {
        name
        description
        id
      }
      userAgreement {
        id
        status
      }
      workspaceId
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAgreement = /* GraphQL */ `
  subscription OnDeleteAgreement(
    $filter: ModelSubscriptionAgreementFilterInput
    $userId: String
  ) {
    onDeleteAgreement(filter: $filter, userId: $userId) {
      id
      name
      workers
      client
      createdAt
      userId
      user {
        userId
        name
        family_name
        icon
      }
      aditionalInfo {
        name
        description
        id
      }
      userAgreement {
        id
        status
      }
      workspaceId
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTasks = /* GraphQL */ `
  subscription OnCreateTasks(
    $filter: ModelSubscriptionTasksFilterInput
    $username: String
  ) {
    onCreateTasks(filter: $filter, username: $username) {
      id
      title
      description
      username
      user {
        userId
        name
        family_name
        icon
      }
      time
      status
      workplace {
        workId
        name
      }
      interval {
        end
        start
      }
      comments {
        title
        comment
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateTasks = /* GraphQL */ `
  subscription OnUpdateTasks(
    $filter: ModelSubscriptionTasksFilterInput
    $username: String
  ) {
    onUpdateTasks(filter: $filter, username: $username) {
      id
      title
      description
      username
      user {
        userId
        name
        family_name
        icon
      }
      time
      status
      workplace {
        workId
        name
      }
      interval {
        end
        start
      }
      comments {
        title
        comment
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteTasks = /* GraphQL */ `
  subscription OnDeleteTasks(
    $filter: ModelSubscriptionTasksFilterInput
    $username: String
  ) {
    onDeleteTasks(filter: $filter, username: $username) {
      id
      title
      description
      username
      user {
        userId
        name
        family_name
        icon
      }
      time
      status
      workplace {
        workId
        name
      }
      interval {
        end
        start
      }
      comments {
        title
        comment
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTimeEntry = /* GraphQL */ `
  subscription OnCreateTimeEntry(
    $filter: ModelSubscriptionTimeEntryFilterInput
    $userId: String
  ) {
    onCreateTimeEntry(filter: $filter, userId: $userId) {
      id
      description
      userId
      workspaceId
      timeInterval {
        end
        start
      }
      isActive
      isLocked
      paidAt
      confirmedAt
      confirmedBy {
        userId
        name
        family_name
        icon
      }
      isSent
      isConfirmed
      isPaused
      pauseStart
      break {
        id
        reason
        end
        start
      }
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateTimeEntry = /* GraphQL */ `
  subscription OnUpdateTimeEntry(
    $filter: ModelSubscriptionTimeEntryFilterInput
    $userId: String
  ) {
    onUpdateTimeEntry(filter: $filter, userId: $userId) {
      id
      description
      userId
      workspaceId
      timeInterval {
        end
        start
      }
      isActive
      isLocked
      paidAt
      confirmedAt
      confirmedBy {
        userId
        name
        family_name
        icon
      }
      isSent
      isConfirmed
      isPaused
      pauseStart
      break {
        id
        reason
        end
        start
      }
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteTimeEntry = /* GraphQL */ `
  subscription OnDeleteTimeEntry(
    $filter: ModelSubscriptionTimeEntryFilterInput
    $userId: String
  ) {
    onDeleteTimeEntry(filter: $filter, userId: $userId) {
      id
      description
      userId
      workspaceId
      timeInterval {
        end
        start
      }
      isActive
      isLocked
      paidAt
      confirmedAt
      confirmedBy {
        userId
        name
        family_name
        icon
      }
      isSent
      isConfirmed
      isPaused
      pauseStart
      break {
        id
        reason
        end
        start
      }
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAllWorkSpaces = /* GraphQL */ `
  subscription OnCreateAllWorkSpaces(
    $filter: ModelSubscriptionAllWorkSpacesFilterInput
  ) {
    onCreateAllWorkSpaces(filter: $filter) {
      id
      hourlyRate {
        amount
        currency
      }
      imageUrl
      memberships {
        membershipType
        membershipStatus
        userId
        targetId
      }
      name
      workspaceSettings {
        shortBreak
        dinnerBreak
      }
      workers
      adminId
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAllWorkSpaces = /* GraphQL */ `
  subscription OnUpdateAllWorkSpaces(
    $filter: ModelSubscriptionAllWorkSpacesFilterInput
  ) {
    onUpdateAllWorkSpaces(filter: $filter) {
      id
      hourlyRate {
        amount
        currency
      }
      imageUrl
      memberships {
        membershipType
        membershipStatus
        userId
        targetId
      }
      name
      workspaceSettings {
        shortBreak
        dinnerBreak
      }
      workers
      adminId
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAllWorkSpaces = /* GraphQL */ `
  subscription OnDeleteAllWorkSpaces(
    $filter: ModelSubscriptionAllWorkSpacesFilterInput
  ) {
    onDeleteAllWorkSpaces(filter: $filter) {
      id
      hourlyRate {
        amount
        currency
      }
      imageUrl
      memberships {
        membershipType
        membershipStatus
        userId
        targetId
      }
      name
      workspaceSettings {
        shortBreak
        dinnerBreak
      }
      workers
      adminId
      work {
        name
        description
        id
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserCredentials = /* GraphQL */ `
  subscription OnCreateUserCredentials(
    $filter: ModelSubscriptionUserCredentialsFilterInput
    $userId: String
  ) {
    onCreateUserCredentials(filter: $filter, userId: $userId) {
      id
      identityId
      userId
      activeTimeEntry
      status
      defaultWorkspace
      memberships {
        membershipStatus
        membershipType
        userId
        targetId
      }
      profile {
        iban
        id_number
        profile_picture
        first_name
        last_name
        email
        email_verified
        phone_number
        birthdate
        locale
        nationality
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      workcards {
        id
        cardend
        type
        drivinglicense
        owncar
        othercard
        files
      }
      ownCars {
        description
        id
        plate
        class
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserCredentials = /* GraphQL */ `
  subscription OnUpdateUserCredentials(
    $filter: ModelSubscriptionUserCredentialsFilterInput
    $userId: String
  ) {
    onUpdateUserCredentials(filter: $filter, userId: $userId) {
      id
      identityId
      userId
      activeTimeEntry
      status
      defaultWorkspace
      memberships {
        membershipStatus
        membershipType
        userId
        targetId
      }
      profile {
        iban
        id_number
        profile_picture
        first_name
        last_name
        email
        email_verified
        phone_number
        birthdate
        locale
        nationality
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      workcards {
        id
        cardend
        type
        drivinglicense
        owncar
        othercard
        files
      }
      ownCars {
        description
        id
        plate
        class
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserCredentials = /* GraphQL */ `
  subscription OnDeleteUserCredentials(
    $filter: ModelSubscriptionUserCredentialsFilterInput
    $userId: String
  ) {
    onDeleteUserCredentials(filter: $filter, userId: $userId) {
      id
      identityId
      userId
      activeTimeEntry
      status
      defaultWorkspace
      memberships {
        membershipStatus
        membershipType
        userId
        targetId
      }
      profile {
        iban
        id_number
        profile_picture
        first_name
        last_name
        email
        email_verified
        phone_number
        birthdate
        locale
        nationality
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      workcards {
        id
        cardend
        type
        drivinglicense
        owncar
        othercard
        files
      }
      ownCars {
        description
        id
        plate
        class
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
