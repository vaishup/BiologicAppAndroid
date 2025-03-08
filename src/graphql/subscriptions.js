/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMainShift = /* GraphQL */ `
  subscription OnCreateMainShift(
    $filter: ModelSubscriptionMainShiftFilterInput
  ) {
    onCreateMainShift(filter: $filter) {
      id
      locationID
      shiftName
      duties
      shiftDate
      shiftStartTime
      shiftEndTime
      createdBy
      startDate
      endDate
      shiftstatus
      userId
      staffIds
      shifts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMainShift = /* GraphQL */ `
  subscription OnUpdateMainShift(
    $filter: ModelSubscriptionMainShiftFilterInput
  ) {
    onUpdateMainShift(filter: $filter) {
      id
      locationID
      shiftName
      duties
      shiftDate
      shiftStartTime
      shiftEndTime
      createdBy
      startDate
      endDate
      shiftstatus
      userId
      staffIds
      shifts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMainShift = /* GraphQL */ `
  subscription OnDeleteMainShift(
    $filter: ModelSubscriptionMainShiftFilterInput
  ) {
    onDeleteMainShift(filter: $filter) {
      id
      locationID
      shiftName
      duties
      shiftDate
      shiftStartTime
      shiftEndTime
      createdBy
      startDate
      endDate
      shiftstatus
      userId
      staffIds
      shifts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheShifts = /* GraphQL */ `
  subscription OnCreateTheShifts(
    $filter: ModelSubscriptionTheShiftsFilterInput
  ) {
    onCreateTheShifts(filter: $filter) {
      id
      duties
      staffId
      time
      startTime
      endTime
      startDate
      endDate
      shiftstatus
      userId
      checkInTIme
      checkOutTime
      AdminTime
      AssignStatus
      locationID
      amendment
      mainShiftID
      mainShift {
        id
        locationID
        shiftName
        duties
        shiftDate
        shiftStartTime
        shiftEndTime
        createdBy
        startDate
        endDate
        shiftstatus
        userId
        staffIds
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
export const onUpdateTheShifts = /* GraphQL */ `
  subscription OnUpdateTheShifts(
    $filter: ModelSubscriptionTheShiftsFilterInput
  ) {
    onUpdateTheShifts(filter: $filter) {
      id
      duties
      staffId
      time
      startTime
      endTime
      startDate
      endDate
      shiftstatus
      userId
      checkInTIme
      checkOutTime
      AdminTime
      AssignStatus
      locationID
      amendment
      mainShiftID
      mainShift {
        id
        locationID
        shiftName
        duties
        shiftDate
        shiftStartTime
        shiftEndTime
        createdBy
        startDate
        endDate
        shiftstatus
        userId
        staffIds
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
export const onDeleteTheShifts = /* GraphQL */ `
  subscription OnDeleteTheShifts(
    $filter: ModelSubscriptionTheShiftsFilterInput
  ) {
    onDeleteTheShifts(filter: $filter) {
      id
      duties
      staffId
      time
      startTime
      endTime
      startDate
      endDate
      shiftstatus
      userId
      checkInTIme
      checkOutTime
      AdminTime
      AssignStatus
      locationID
      amendment
      mainShiftID
      mainShift {
        id
        locationID
        shiftName
        duties
        shiftDate
        shiftStartTime
        shiftEndTime
        createdBy
        startDate
        endDate
        shiftstatus
        userId
        staffIds
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onCreateLocation(filter: $filter) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onUpdateLocation(filter: $filter) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
    onDeleteLocation(filter: $filter) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheStaff = /* GraphQL */ `
  subscription OnCreateTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onCreateTheStaff(filter: $filter) {
      id
      name
      phoneNumber
      email
      DOB
      photourl
      isBiomatritcs
      profileStatus
      Location
      IsActive
      latitude
      longitude
      shiftIds
      userId
      employeeId
      staffStatus
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheStaff = /* GraphQL */ `
  subscription OnUpdateTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onUpdateTheStaff(filter: $filter) {
      id
      name
      phoneNumber
      email
      DOB
      photourl
      isBiomatritcs
      profileStatus
      Location
      IsActive
      latitude
      longitude
      shiftIds
      userId
      employeeId
      staffStatus
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheStaff = /* GraphQL */ `
  subscription OnDeleteTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onDeleteTheStaff(filter: $filter) {
      id
      name
      phoneNumber
      email
      DOB
      photourl
      isBiomatritcs
      profileStatus
      Location
      IsActive
      latitude
      longitude
      shiftIds
      userId
      employeeId
      staffStatus
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheAdminStaffUser = /* GraphQL */ `
  subscription OnCreateTheAdminStaffUser(
    $filter: ModelSubscriptionTheAdminStaffUserFilterInput
  ) {
    onCreateTheAdminStaffUser(filter: $filter) {
      id
      name
      phoneNumber
      email
      userType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheAdminStaffUser = /* GraphQL */ `
  subscription OnUpdateTheAdminStaffUser(
    $filter: ModelSubscriptionTheAdminStaffUserFilterInput
  ) {
    onUpdateTheAdminStaffUser(filter: $filter) {
      id
      name
      phoneNumber
      email
      userType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheAdminStaffUser = /* GraphQL */ `
  subscription OnDeleteTheAdminStaffUser(
    $filter: ModelSubscriptionTheAdminStaffUserFilterInput
  ) {
    onDeleteTheAdminStaffUser(filter: $filter) {
      id
      name
      phoneNumber
      email
      userType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheViewIDUser = /* GraphQL */ `
  subscription OnCreateTheViewIDUser(
    $filter: ModelSubscriptionTheViewIDUserFilterInput
  ) {
    onCreateTheViewIDUser(filter: $filter) {
      id
      name
      employeeId
      profileStatus
      attachment
      isLogin
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheViewIDUser = /* GraphQL */ `
  subscription OnUpdateTheViewIDUser(
    $filter: ModelSubscriptionTheViewIDUserFilterInput
  ) {
    onUpdateTheViewIDUser(filter: $filter) {
      id
      name
      employeeId
      profileStatus
      attachment
      isLogin
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheViewIDUser = /* GraphQL */ `
  subscription OnDeleteTheViewIDUser(
    $filter: ModelSubscriptionTheViewIDUserFilterInput
  ) {
    onDeleteTheViewIDUser(filter: $filter) {
      id
      name
      employeeId
      profileStatus
      attachment
      isLogin
      scanNumber
      createdAt
      updatedAt
      __typename
    }
  }
`;
