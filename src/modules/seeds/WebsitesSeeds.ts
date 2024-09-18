import { WebsiteEntity } from "@foudroyer/interfaces"

export const WebsitePremium: WebsiteEntity = {
  id: "www.sudoku.academy",
  search_console_domain: "sudoku.academy",
  sitemap: "https://www.sudoku.academy/sitemap-index.xml",
  already_activated: true,
  image:
    "https://www.sudoku.academy/favicon-32x32.png?v=db867b827bb53317e9978af476122ebc",
  yandex_domain: null,
  bing_domain: null,
  is_premium: true,
  index_now_installed: true,
  index_now_key: "1234",
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: false,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteForDemo: WebsiteEntity = {
  id: "www.japon-et-decouvertes.fr",
  search_console_domain: "www.japon-et-decouvertes.fr",
  sitemap: "",
  already_activated: true,
  image:
    "https://www.japon-et-decouvertes.fr/favicon.svg?v=d30494b70eb1226115b50ef982f38ab9",
  yandex_domain: "www.japon-et-decouvertes.fr",
  bing_domain: "www.japon-et-decouvertes.fr",
  is_premium: false,
  index_now_installed: true,
  index_now_key: "www.japon-et-decouvertes.fr",
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: true,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteNotActivated: WebsiteEntity = {
  image: "null",
  sitemap: "https://already_activated:false",
  search_console_domain: "sc-domain:already_activated:false",
  id: "already_activated:false",
  already_activated: false,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: false,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteActivated: WebsiteEntity = {
  image: "null",
  sitemap: "https://already_activated:true",
  search_console_domain: "sc-domain:already_activated:true",
  id: "already_activated:true",
  already_activated: false,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: false,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteNoSitemap: WebsiteEntity = {
  image: "null",
  sitemap: null,
  search_console_domain: "sc-domain:sitemap:false",
  id: "sitemap:false",
  already_activated: true,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: true,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteNotActivatedAndNotPremium: WebsiteEntity = {
  image: "null",
  sitemap: null,
  search_console_domain: "sc-domain:WebsiteNotActivatedAndNotPremium",
  id: "WebsiteNotActivatedAndNotPremium",
  already_activated: true,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: false,
  // @ts-ignore
  is_analytics_sync_done: true,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [
    {
      id: "5417",
      google_cloud_api_key:
        '{\n  "type": "service_account",\n  "project_id": "foudroyer-com",\n  "private_key_id": "52abd00e4a6a58e7e3ce4551f92d52d5c60b36bf",\n  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDxQNqxLVHYi3t\\n/capHCIZmQMWFBVfnfFw15V3UyMTfCL5zYpWYeC35LfN9UaPmqhaDvZgPs+apTVg\\nAAiHNCCELT58qhjmj8diT5+dUwh5D7CIq4NHHjLzUYBYd6wMTwF5P3eo4Tq3woqS\\nOj7QG5kEfaeDRyjezSqOh51919xm7yilEf+SridXT4apaaZ3CZhrijeY4uTcZudy\\nqGOsByCkJhtzRnWGpnpG5c6UFEx49CI3Vq58ZY461cnYrxMYCcBC7jaGgwyPNRYX\\ntSXgx4YSnGK7CUg1uHRSkyoNE86Jet3mg39YIBtJ4r6z1TaqzIzG8GT95nD6Cjy8\\nAeQrqft1AgMBAAECggEAJ9Gguky8WoKbuPaPO8JfJTm8KPd4yXQEseEHo7ejQMlV\\nC95ErwFFheHdiOTEr1zTtU2pyzW7YEcOLjKTiXyOyJOzTAQFAJBqC5MKciN7a7RH\\nQeUw1HxN/LOtGVFuCyrer9y65/y3xrypFskGEaorW4B7W/ZTV83/Q/JNlFUdnUnY\\niEUb7nSX+BIdMMumyaj+Eo8ZRIbFT4PFbF60t9ojMRPwvdcsma2JhW25/AP03eSc\\n9cFrrzT4dl4AKWzb+lOTpaVDLDm9l35k8+20vijh3iRcNSSmsLORos3qu682+k5V\\nUAhamJJyvhdU1OI0AVAIkyz1nxpcNFLGHPj2pYpXWQKBgQDudYyyn8koaSdM16U1\\nesOsjTWdfUa4DTG1hZWLZcUsl11JRYg5L1SZejux+tlIUNBu/PUNbyZ7fnlIA4J9\\n+jwYiFbEVBJq3dGJ881/gK2quWboeQxIbWNxhp/b/DKQXsViexUQEie9ek9i51dw\\nrN8HMmnQSrNChDHIJkCskDym5wKBgQDSK5JHdu/H4Genf/BQKJBJmLW0bPX61UF3\\n1C6EamJ3WVn5cABUhdTLHi8irBc9bau7BKOW0p7pV8vO2uCofZEpG3tGsFRAG9xM\\nc3BCjSmkhK8nCKBR6ip8KfKB2YhZrWRAzLDfBwkCzuIA9LmFjMW7Sr/zEjnDSM+J\\nNz8XwYKrQwKBgQDPYtJjw02qZJF2ZhHbyhIFrqXTe1GW3nq9+RjPLEpodpf+Eoff\\n3AcCl+j06Eoyd35fGIZzEZjxTFRkShEiSRAc8e4sP0XpRVNoW+38FshzM12Jj0Uc\\ndG5JHKFJLDQ5lQKrnIn7+R4wzv/d737/kolBdBnMujre/aNiA8q5iZQGPwKBgFzI\\n+aJtQrymOHy9QdXRoqmrLoUCGbJsVaPWW9b/tIrmOo+hv7ORBfnKUJrpCLWI5mkB\\nSkt6nsd7iDHBda9NCDnytQDnNbq70g06ZZQsB/dm0IDWERk43RrF1hc3dzfIEdt9\\nwpQj4fmIZkRvxjvMgzsFbCqeoDuzuFPmvQb62npLAoGBAMlhZ/SdXVREw/Hba7aR\\n4hl9dv33AOc8rRCVJJ3lY6hLQbx3I2Hi37IBLTwPheZqHM4bqgYHQX1S7pKGFnYy\\nQnGx+C3V1b+WGYX+j0tJ1RyuBrEyjMbK2/C+iLzkZoBW2n/ep8wYePocWqfLkoLV\\nUQ7ZJn9mfk8Kh6yj9tRHf3WE\\n-----END PRIVATE KEY-----\\n",\n  "client_email": "blog-foudroyer@foudroyer-com.iam.gserviceaccount.com",\n  "client_id": "104916948595986191011",\n  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n  "token_uri": "https://oauth2.googleapis.com/token",\n  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/blog-foudroyer%40foudroyer-com.iam.gserviceaccount.com",\n  "universe_domain": "googleapis.com"\n}\n',
      fk_website_id: "www.sudoku.academy",
      created_at: new Date(),
      updated_at: new Date(),
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
    },
  ],
}

export const WebsiteNoCredentials: WebsiteEntity = {
  image: "null",
  sitemap: null,
  search_console_domain: "sc-domain:www.no-credentials.fr",
  id: "www.no-credentials.fr",
  already_activated: true,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: true,
  // @ts-ignore
  is_analytics_sync_done: false,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [],
}

export const WebsiteNotAnalyticsActivated: WebsiteEntity = {
  // @ts-ignore
  image: null,
  sitemap: null,
  search_console_domain: "sc-domain:www.no-analytics_activated.fr",
  id: "www.no-analytics.fr",
  already_activated: true,
  yandex_domain: null,
  bing_domain: null,
  index_now_key: "1234",
  index_now_installed: false,
  is_premium: false,
  is_analytics_activated: false,
  // @ts-ignore
  is_analytics_sync_done: false,
  sitemap_updated_at: new Date(),
  deleted_at: null,
  is_public: true,
  indexation_auto_activated: false,
  indexation_auto_activated_sources: ["google"],
  google_api_keys: [],
}

export const WebsitesBasic: WebsiteEntity[] = [WebsitePremium]

export const AllWebsiteSeeds: WebsiteEntity[] = [
  ...WebsitesBasic,
  WebsiteForDemo,
  WebsiteNoSitemap,
  WebsiteNotAnalyticsActivated,
]
