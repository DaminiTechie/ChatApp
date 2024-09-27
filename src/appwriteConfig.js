import { Client,Databases, Account } from 'appwrite';
export const PROJECT_ID ='6698b0bf000aa375ee14';
export const DATABASES_ID='6698b25c001ab5c6eba8';
export const COLLECTION_ID_MESSAGES='6698b27900015feca0a7';
const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6698b0bf000aa375ee14');
  export  const databases = new Databases(client);
  export const account = new Account(client);
export default client; 