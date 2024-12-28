/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMainShift = /* GraphQL */ `
  query GetMainShift($id: ID!) {
    getMainShift(id: $id) {
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
export const listMainShifts = /* GraphQL */ `
  query ListMainShifts(
    $filter: ModelMainShiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMainShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTheShifts = /* GraphQL */ `
  query GetTheShifts($id: ID!) {
    getTheShifts(id: $id) {
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
export const listTheShifts = /* GraphQL */ `
  query ListTheShifts(
    $filter: ModelTheShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const theShiftsByMainShiftIDAndStartDate = /* GraphQL */ `
  query TheShiftsByMainShiftIDAndStartDate(
    $mainShiftID: ID!
    $startDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTheShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theShiftsByMainShiftIDAndStartDate(
      mainShiftID: $mainShiftID
      startDate: $startDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTheStaff = /* GraphQL */ `
  query GetTheStaff($id: ID!) {
    getTheStaff(id: $id) {
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
export const listTheStaffs = /* GraphQL */ `
  query ListTheStaffs(
    $filter: ModelTheStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTheAdminStaffUser = /* GraphQL */ `
  query GetTheAdminStaffUser($id: ID!) {
    getTheAdminStaffUser(id: $id) {
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
export const listTheAdminStaffUsers = /* GraphQL */ `
  query ListTheAdminStaffUsers(
    $filter: ModelTheAdminStaffUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheAdminStaffUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phoneNumber
        email
        userType
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
