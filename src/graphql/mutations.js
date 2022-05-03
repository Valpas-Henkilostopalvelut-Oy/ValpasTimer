/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTimeEntry = /* GraphQL */ `
  mutation CreateTimeEntry(
    $input: CreateTimeEntryInput!
    $condition: ModelTimeEntryConditionInput
  ) {
    createTimeEntry(input: $input, condition: $condition) {
      id
      description
      userId
      workspaceId
      timeInterval {
        duration
        end
        start
      }
      isActive
      isLocked
      isSent
      isConfirmed
      billable
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTimeEntry = /* GraphQL */ `
  mutation UpdateTimeEntry(
    $input: UpdateTimeEntryInput!
    $condition: ModelTimeEntryConditionInput
  ) {
    updateTimeEntry(input: $input, condition: $condition) {
      id
      description
      userId
      workspaceId
      timeInterval {
        duration
        end
        start
      }
      isActive
      isLocked
      isSent
      isConfirmed
      billable
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTimeEntry = /* GraphQL */ `
  mutation DeleteTimeEntry(
    $input: DeleteTimeEntryInput!
    $condition: ModelTimeEntryConditionInput
  ) {
    deleteTimeEntry(input: $input, condition: $condition) {
      id
      description
      userId
      workspaceId
      timeInterval {
        duration
        end
        start
      }
      isActive
      isLocked
      isSent
      isConfirmed
      billable
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAllWorkSpaces = /* GraphQL */ `
  mutation CreateAllWorkSpaces(
    $input: CreateAllWorkSpacesInput!
    $condition: ModelAllWorkSpacesConditionInput
  ) {
    createAllWorkSpaces(input: $input, condition: $condition) {
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
      customOwner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateAllWorkSpaces = /* GraphQL */ `
  mutation UpdateAllWorkSpaces(
    $input: UpdateAllWorkSpacesInput!
    $condition: ModelAllWorkSpacesConditionInput
  ) {
    updateAllWorkSpaces(input: $input, condition: $condition) {
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
      customOwner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteAllWorkSpaces = /* GraphQL */ `
  mutation DeleteAllWorkSpaces(
    $input: DeleteAllWorkSpacesInput!
    $condition: ModelAllWorkSpacesConditionInput
  ) {
    deleteAllWorkSpaces(input: $input, condition: $condition) {
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
      customOwner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUserCredentials = /* GraphQL */ `
  mutation CreateUserCredentials(
    $input: CreateUserCredentialsInput!
    $condition: ModelUserCredentialsConditionInput
  ) {
    createUserCredentials(input: $input, condition: $condition) {
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
        profile_picture
        first_name
        last_name
        username
        phone_number
        address
        zip_code
        contry
        email
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserCredentials = /* GraphQL */ `
  mutation UpdateUserCredentials(
    $input: UpdateUserCredentialsInput!
    $condition: ModelUserCredentialsConditionInput
  ) {
    updateUserCredentials(input: $input, condition: $condition) {
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
        profile_picture
        first_name
        last_name
        username
        phone_number
        address
        zip_code
        contry
        email
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserCredentials = /* GraphQL */ `
  mutation DeleteUserCredentials(
    $input: DeleteUserCredentialsInput!
    $condition: ModelUserCredentialsConditionInput
  ) {
    deleteUserCredentials(input: $input, condition: $condition) {
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
        profile_picture
        first_name
        last_name
        username
        phone_number
        address
        zip_code
        contry
        email
      }
      formChecked
      settings {
        timeFormat
        timeZone
        dateFormat
        modalSendConfirm
        modalConfirmConfirm
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
