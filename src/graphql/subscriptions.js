/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
