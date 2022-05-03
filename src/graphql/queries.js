/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTimeEntry = /* GraphQL */ `
  query GetTimeEntry($id: ID!) {
    getTimeEntry(id: $id) {
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
export const listTimeEntrys = /* GraphQL */ `
  query ListTimeEntrys(
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        userId
        workspaceId
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
      customOwner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAllWorkSpacess = /* GraphQL */ `
  query ListAllWorkSpacess(
    $filter: ModelAllWorkSpacesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAllWorkSpacess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageUrl
        name
        customOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
        customOwner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
export const listUserCredentialss = /* GraphQL */ `
  query ListUserCredentialss(
    $filter: ModelUserCredentialsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCredentialss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        activeTimeEntry
        status
        defaultWorkspace
        formChecked
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
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
        userId
        activeTimeEntry
        status
        defaultWorkspace
        formChecked
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
