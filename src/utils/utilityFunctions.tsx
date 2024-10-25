import dayjs from 'dayjs';

export const getFormatEstTime = (minutes?: number): string => {
  try {
    if (minutes === undefined || minutes <= 0) return '0 min';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours} hr ` : ``}${remainingMinutes} min`;
  } catch (e) {
    return ` - `;
  }
};

export const getFormatTime = (datetime?: string) => {
  if (datetime === undefined) return '';
  return dayjs(datetime).format('ddd MMMM D, h:mm A');
};

export const getTdyWorkingHr = (shopDetail: any): string => {
  try {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const todayIndex = new Date().getDay();
    return shopDetail?.openingTime[daysOfWeek[todayIndex]];
  } catch (e) {
    return `-`;
  }
};

export const getFormatPhoneNum = (phoneNum: string): string => {
  const cleaned = phoneNum.startsWith('+1') ? phoneNum.slice(2) : phoneNum;
  const digitsOnly = cleaned.replace(/\D/g, '');
  const match = digitsOnly.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNum;
};

export const formatPhoneNumber = (input: string) => {
  const inputNum = input.replace(/[^0-9]/g, '');
  const value = inputNum;

  if (value.length === 0) {
    return ``;
  } else if (value.length < 4) {
    return `(${value.slice(0, 3)}`;
  } else if (value.length < 7) {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}`;
  } else {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
};

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const convertRouteDistance = (totalRouteDistance_mm: string): string => {
  // const totalRouteDistance_m: number = parseFloat(totalRouteDistance_mm) / 1000; // convert to meters
  const totalRouteDistance_km: number =
    parseFloat(totalRouteDistance_mm) / 1000; // convert to kilometers

  if (totalRouteDistance_km >= 1) {
    return totalRouteDistance_km.toFixed(1) + ' km';
  } else {
    return parseFloat(totalRouteDistance_mm).toFixed(1) + ' m';
  }
};

export const convertRouteDuration = (
  totalRouteDuration_sec: string,
): string => {
  const totalRouteDuration_sec_num: number = parseFloat(totalRouteDuration_sec);
  const hours: number = Math.floor(totalRouteDuration_sec_num / 3600);
  const minutes: number = Math.floor((totalRouteDuration_sec_num % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} mins`;
  } else {
    return `${minutes} mins`;
  }
};

// AWS Upload To S3
import {getTableID} from '../hooks/authServices';
import {generateClient} from 'aws-amplify/api';
import {uploadData, getUrl, list, remove} from 'aws-amplify/storage';

export const downloadFromS3 = async ({
  folder,
  subFolder,
  fullPath,
  setFileUrl,
}: {
  folder?: string;
  subFolder?: string;
  fullPath?: string;
  setFileUrl: (url: string) => void;
}) => {
  try {
    const userId = await getTableID();

    if (fullPath) {
      const url = (await getUrl({path: fullPath})).url;
      setFileUrl(`${url}`);
    } else {
      const folderPath = `public/User/${folder}/${userId}/${
        subFolder ? `${subFolder}/` : ''
      }`;
      const filePath = (await list({path: folderPath})).items[0]?.path;
      const url = (await getUrl({path: filePath})).url;
      setFileUrl(`${url}`);
    }
  } catch (Error) {
    console.log('Error downloading from S3 ', Error);
  }
};

export const downloadFromS3Others = async ({
  folder,
  subFolder,
  fullPath,
  setFileUrl,
  userId,
}: {
  folder?: string;
  subFolder?: string;
  fullPath?: string;
  userId: string;
  setFileUrl: (url: string) => void;
}) => {
  try {
    //const userId = await getTableID();

    if (fullPath) {
      const url = (await getUrl({path: fullPath})).url;
      setFileUrl(`${url}`);
    } else {
      const folderPath = `public/User/${folder}/${userId}/${
        subFolder ? `${subFolder}/` : ''
      }`;
      const filePath = (await list({path: folderPath})).items[0]?.path;
      const url = (await getUrl({path: filePath})).url;
      setFileUrl(`${url}`);
    }
  } catch (Error) {
    console.log('Error downloading from S3 ', Error);
  }
};
export const uploadToS3 = async (
  fileUri: string,
  folder: string,
  subFolder?: string,
  fullPath?: string,
) => {
  try {
    const userId = await getTableID();
    const filePath = fullPath
      ? `public/${fullPath}`
      : `public/User/${folder}/${userId}${subFolder ? `/${subFolder}` : ''}`;
    const extension = fileUri.split('.').pop()?.toLowerCase();
    const fileName = `${subFolder || folder}.${extension}`;
    const blob = await uriToBlob(fileUri);

    // Step 1 - Fetch list of existing files
    const listResult = await list({path: filePath});
    // Step 2 - Remove all exixting files
    for (const item of listResult.items) {
      await remove({path: item.path});
    }
    
    // Step 3 - Upload new file
    uploadData({
      path: `${filePath}/${fileName}`,
      data: blob,
      options: {
        onProgress: ({transferredBytes, totalBytes}) => {
          if (totalBytes) {
            console.log(
              `Upload progress ${Math.round(
                (transferredBytes / totalBytes) * 100,
              )} %`,
            );
          }
        },
      },
    });

    return `${filePath}/${fileName}`;
  } catch (Err) {
    console.log("Error in uploadToS3 ");
    
    console.log('Error in uploadToS3 : ', Err);
  }
};

const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export const handleProgressUpdate = async (
  onboardingId: string,
  step: string,
  nextStep: string,
  nextPage: string,
): Promise<string | undefined> => {
  const client = generateClient();
  try {
    // Fetch current onboarding progress
    const getQuery = `
      query MyQuery {
        getOnBoardDocChecker(id: "${onboardingId}") {
          appOnboardingProgress
        }
      }
    `;
    const response = await client.graphql({query: getQuery});
    const data = (response as any).data.getOnBoardDocChecker;

    // Update onboarding progress
    try {
      const updatedProgress = [...(data.appOnboardingProgress || []), step];
      const updateQuery = `
        mutation MyMutation {
          updateOnBoardDocChecker(input: {
            id: "${onboardingId}",
            appOnboardingProgress: ${JSON.stringify(updatedProgress)}
          }) {
            id
          }
        }
      `;
      await client.graphql({query: updateQuery});
    } catch (err) {
      console.log('Error in utility updateOnBoardDocChecker - ', err);
    }

    // Determine the next page
    return (data.appOnboardingProgress || []).includes(nextStep)
      ? 'Onboarding'
      : nextPage;
  } catch (err) {
    console.log('Error in utility getOnBoardDocChecker - ', err);
  }
};