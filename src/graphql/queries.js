/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWorktravel = /* GraphQL */ `
  query GetWorktravel($id: ID!) {
    getWorktravel(id: $id) {
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
export const listWorktravels = /* GraphQL */ `
  query ListWorktravels(
    $filter: ModelWorktravelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorktravels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        created
        updated
        title
        comment
        departureDateTime
        returnDateTime
        routeCar
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWorktravels = /* GraphQL */ `
  query SyncWorktravels(
    $filter: ModelWorktravelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorktravels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        created
        updated
        title
        comment
        departureDateTime
        returnDateTime
        routeCar
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getReceipt = /* GraphQL */ `
  query GetReceipt($id: ID!) {
    getReceipt(id: $id) {
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
export const listReceipts = /* GraphQL */ `
  query ListReceipts(
    $filter: ModelReceiptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReceipts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncReceipts = /* GraphQL */ `
  query SyncReceipts(
    $filter: ModelReceiptFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReceipts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getAgreement = /* GraphQL */ `
  query GetAgreement($id: ID!) {
    getAgreement(id: $id) {
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
export const listAgreements = /* GraphQL */ `
  query ListAgreements(
    $filter: ModelAgreementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgreements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        workers
        client
        createdAt
        userId
        workspaceId
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAgreements = /* GraphQL */ `
  query SyncAgreements(
    $filter: ModelAgreementFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAgreements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        workers
        client
        createdAt
        userId
        workspaceId
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTasks = /* GraphQL */ `
  query GetTasks($id: ID!) {
    getTasks(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTasksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        username
        time
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTasksFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        description
        username
        time
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTimeEntry = /* GraphQL */ `
  query GetTimeEntry($id: ID!) {
    getTimeEntry(id: $id) {
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
export const listTimeEntries = /* GraphQL */ `
  query ListTimeEntries(
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        userId
        workspaceId
        isActive
        isLocked
        paidAt
        confirmedAt
        isSent
        isConfirmed
        isPaused
        pauseStart
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTimeEntries = /* GraphQL */ `
  query SyncTimeEntries(
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTimeEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        description
        userId
        workspaceId
        isActive
        isLocked
        paidAt
        confirmedAt
        isSent
        isConfirmed
        isPaused
        pauseStart
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAllWorkSpaces = /* GraphQL */ `
  query GetAllWorkSpaces($id: ID!) {
    getAllWorkSpaces(id: $id) {
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
export const listAllWorkSpaces = /* GraphQL */ `
  query ListAllWorkSpaces(
    $filter: ModelAllWorkSpacesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAllWorkSpaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageUrl
        name
        workers
        adminId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAllWorkSpaces = /* GraphQL */ `
  query SyncAllWorkSpaces(
    $filter: ModelAllWorkSpacesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAllWorkSpaces(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        imageUrl
        name
        workers
        adminId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserCredentials = /* GraphQL */ `
  query GetUserCredentials($id: ID!) {
    getUserCredentials(id: $id) {
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
export const listUserCredentials = /* GraphQL */ `
  query ListUserCredentials(
    $filter: ModelUserCredentialsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCredentials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        identityId
        userId
        activeTimeEntry
        status
        defaultWorkspace
        formChecked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserCredentials = /* GraphQL */ `
  query SyncUserCredentials(
    $filter: ModelUserCredentialsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserCredentials(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        identityId
        userId
        activeTimeEntry
        status
        defaultWorkspace
        formChecked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
