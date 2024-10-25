/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTheShifts = /* GraphQL */ `
  query GetTheShifts($id: ID!) {
    getTheShifts(id: $id) {
      id
      Location
      duties
      staffId
      time
      startTime
      endTime
      startDate
      endDate
      shiftstatus
      userId
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
        Location
        duties
        staffId
        time
        startTime
        endTime
        startDate
        endDate
        shiftstatus
        userId
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
      shiftIds
      userId
      latitude
      longitude
      createdAt
      updatedAt
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
        shiftIds
        userId
        latitude
        longitude
        createdAt
        updatedAt
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
