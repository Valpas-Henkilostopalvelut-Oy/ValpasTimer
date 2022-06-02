/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        duration
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
        duration
        end
        start
      }
      isActive
      isLocked
      isSent
      isConfirmed
      billable
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
        isSent
        isConfirmed
        billable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
      clientId
      adminId
      managerId
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
        clientId
        adminId
        managerId
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
        clientId
        adminId
        managerId
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
