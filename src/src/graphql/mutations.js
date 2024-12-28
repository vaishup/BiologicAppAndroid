/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMainShift = /* GraphQL */ `
  mutation CreateMainShift(
    $input: CreateMainShiftInput!
    $condition: ModelMainShiftConditionInput
  ) {
    createMainShift(input: $input, condition: $condition) {
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
export const updateMainShift = /* GraphQL */ `
  mutation UpdateMainShift(
    $input: UpdateMainShiftInput!
    $condition: ModelMainShiftConditionInput
  ) {
    updateMainShift(input: $input, condition: $condition) {
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
export const deleteMainShift = /* GraphQL */ `
  mutation DeleteMainShift(
    $input: DeleteMainShiftInput!
    $condition: ModelMainShiftConditionInput
  ) {
    deleteMainShift(input: $input, condition: $condition) {
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
export const createTheShifts = /* GraphQL */ `
  mutation CreateTheShifts(
    $input: CreateTheShiftsInput!
    $condition: ModelTheShiftsConditionInput
  ) {
    createTheShifts(input: $input, condition: $condition) {
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
export const updateTheShifts = /* GraphQL */ `
  mutation UpdateTheShifts(
    $input: UpdateTheShiftsInput!
    $condition: ModelTheShiftsConditionInput
  ) {
    updateTheShifts(input: $input, condition: $condition) {
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
export const deleteTheShifts = /* GraphQL */ `
  mutation DeleteTheShifts(
    $input: DeleteTheShiftsInput!
    $condition: ModelTheShiftsConditionInput
  ) {
    deleteTheShifts(input: $input, condition: $condition) {
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
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      name
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTheStaff = /* GraphQL */ `
  mutation CreateTheStaff(
    $input: CreateTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    createTheStaff(input: $input, condition: $condition) {
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
export const updateTheStaff = /* GraphQL */ `
  mutation UpdateTheStaff(
    $input: UpdateTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    updateTheStaff(input: $input, condition: $condition) {
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
export const deleteTheStaff = /* GraphQL */ `
  mutation DeleteTheStaff(
    $input: DeleteTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    deleteTheStaff(input: $input, condition: $condition) {
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
export const createTheAdminStaffUser = /* GraphQL */ `
  mutation CreateTheAdminStaffUser(
    $input: CreateTheAdminStaffUserInput!
    $condition: ModelTheAdminStaffUserConditionInput
  ) {
    createTheAdminStaffUser(input: $input, condition: $condition) {
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
export const updateTheAdminStaffUser = /* GraphQL */ `
  mutation UpdateTheAdminStaffUser(
    $input: UpdateTheAdminStaffUserInput!
    $condition: ModelTheAdminStaffUserConditionInput
  ) {
    updateTheAdminStaffUser(input: $input, condition: $condition) {
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
export const deleteTheAdminStaffUser = /* GraphQL */ `
  mutation DeleteTheAdminStaffUser(
    $input: DeleteTheAdminStaffUserInput!
    $condition: ModelTheAdminStaffUserConditionInput
  ) {
    deleteTheAdminStaffUser(input: $input, condition: $condition) {
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
