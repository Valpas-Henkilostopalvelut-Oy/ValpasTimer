/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAgreement = /* GraphQL */ `
  subscription OnCreateAgreement($Clients: String, $Workers: String) {
    onCreateAgreement(Clients: $Clients, Workers: $Workers) {
      id
      name
      workers
      clients
      createdAt
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
      Clients
      Workers
    }
  }
`;
export const onUpdateAgreement = /* GraphQL */ `
  subscription OnUpdateAgreement($Clients: String, $Workers: String) {
    onUpdateAgreement(Clients: $Clients, Workers: $Workers) {
      id
      name
      workers
      clients
      createdAt
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
      Clients
      Workers
    }
  }
`;
export const onDeleteAgreement = /* GraphQL */ `
  subscription OnDeleteAgreement($Clients: String, $Workers: String) {
    onDeleteAgreement(Clients: $Clients, Workers: $Workers) {
      id
      name
      workers
      clients
      createdAt
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
      Clients
      Workers
    }
  }
`;
export const onCreateTasks = /* GraphQL */ `
  subscription OnCreateTasks($username: String) {
    onCreateTasks(username: $username) {
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
export const onUpdateTasks = /* GraphQL */ `
  subscription OnUpdateTasks($username: String) {
    onUpdateTasks(username: $username) {
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
export const onDeleteTasks = /* GraphQL */ `
  subscription OnDeleteTasks($username: String) {
    onDeleteTasks(username: $username) {
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
export const onCreateTimeEntry = /* GraphQL */ `
  subscription OnCreateTimeEntry($owner: String) {
    onCreateTimeEntry(owner: $owner) {
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
export const onUpdateTimeEntry = /* GraphQL */ `
  subscription OnUpdateTimeEntry($owner: String) {
    onUpdateTimeEntry(owner: $owner) {
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
export const onDeleteTimeEntry = /* GraphQL */ `
  subscription OnDeleteTimeEntry($owner: String) {
    onDeleteTimeEntry(owner: $owner) {
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
export const onCreateAllWorkSpaces = /* GraphQL */ `
  subscription OnCreateAllWorkSpaces {
    onCreateAllWorkSpaces {
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
export const onUpdateAllWorkSpaces = /* GraphQL */ `
  subscription OnUpdateAllWorkSpaces {
    onUpdateAllWorkSpaces {
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
export const onDeleteAllWorkSpaces = /* GraphQL */ `
  subscription OnDeleteAllWorkSpaces {
    onDeleteAllWorkSpaces {
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
export const onCreateUserCredentials = /* GraphQL */ `
  subscription OnCreateUserCredentials($owner: String) {
    onCreateUserCredentials(owner: $owner) {
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
      agreement {
        id
        status
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
export const onUpdateUserCredentials = /* GraphQL */ `
  subscription OnUpdateUserCredentials($owner: String) {
    onUpdateUserCredentials(owner: $owner) {
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
      agreement {
        id
        status
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
export const onDeleteUserCredentials = /* GraphQL */ `
  subscription OnDeleteUserCredentials($owner: String) {
    onDeleteUserCredentials(owner: $owner) {
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
      agreement {
        id
        status
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
