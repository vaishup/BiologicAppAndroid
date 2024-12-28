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
  subscription OnCreateTheStaff(
    $filter: ModelSubscriptionTheStaffFilterInput
    $owner: String
  ) {
    onCreateTheStaff(filter: $filter, owner: $owner) {
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
      shiftstatus
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateTheStaff = /* GraphQL */ `
  subscription OnUpdateTheStaff(
    $filter: ModelSubscriptionTheStaffFilterInput
    $owner: String
  ) {
    onUpdateTheStaff(filter: $filter, owner: $owner) {
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
      shiftstatus
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteTheStaff = /* GraphQL */ `
  subscription OnDeleteTheStaff(
    $filter: ModelSubscriptionTheStaffFilterInput
    $owner: String
  ) {
    onDeleteTheStaff(filter: $filter, owner: $owner) {
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
      shiftstatus
      createdAt
      updatedAt
      owner
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
