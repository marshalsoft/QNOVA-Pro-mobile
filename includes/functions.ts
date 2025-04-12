// import { navigationRef } from "../App";
import { Clipboard, Platform } from "react-native";
import { APIResponse } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASEUrl, LOCALSTORAGE } from "./constants";
import {PERMISSIONS, request } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import FilePickerManager from 'react-native-file-picker';
import DocumentPicker,{pickSingle} from "react-native-document-picker";
export function RemoveSpecialCharaters(d: string) {
  d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}@ ]/g, '');
  }
  export function ReturnAllNumbers(d: string) {
    d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
  }
  export function ReturnUsername(d: string) {
    d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
  }
  export function ReturnAccountUsername(d: string) {
    d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} ]/g, '');
  }
  export function ReturnBusinessName(d: string) {
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}]/g, '');
  }
  export function ReturnDOB(d: string) {
    d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} ]/g, '');
  }
  export function ReturnAllNumbersWithComma(d: string) {
    d = String(d).trim();
    return d.replace(/[-+&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
  }
  export function ReturnMobile(d: string) {
    d = String(d).trim();
    d = String(d[0]) == '0' ? d.replace('0', '') : d;
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{}A-Z a-z]/g, '');
  }
  export function ReturnAllLetter(d: string) {
    d = String(d).trim();
    return d.replace(/[-+,&\/\\#()$~%.;'":*?<>{} 0-9]/g, '');
  }
  export function ReturnComma(str: string) {
    if (str === '' || str === ' ' || `${str[0]}` == "0") {
      return "";
    }
    if (str === '.') {
      return String(str).replace('.', '0');
    }
    
    str = String(str).replace(/[^0-9.]/g, '');
    var getDot = String(str).split('.');
    var firstPart = getDot[0];
    if (firstPart.length >= 4) {
      firstPart = firstPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (getDot.length >= 2) {
      return firstPart + '.' + getDot[1];
    }
    if (String(firstPart) === '.00') {
      return '';
    }
    return firstPart;
  }
  export function PostDATA(
    url: string,
    data: any,
    appTYPE: 'json' | 'image' = 'json',
  ) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "y3286wdy9132gdyv32efvy9d2egf2pdco8wtev2yekcvefcs");
    var formData = new FormData();
    var method = "post";
    var method = "post";
    if(url.includes(":"))
    {
      const splitString = String(url).split(":");
      method = splitString[0];
      url = splitString[1];
    }
    
    return new Promise<APIResponse>((resolve, _reject) => {
          if (appTYPE !== 'json') {
            for (var a in data) {
              formData.append(a, data[a]);
              console.log(a, ':', data[a]);
            }
          }
          AsyncStorage.getItem(LOCALSTORAGE.accessToken).then((token: any) => {
              myHeaders.append('Authorization', `Bearer ${token}`);
            if (appTYPE !== 'json') {
              myHeaders.append('Content-Type', 'multipart/form-data');
            } else {
              myHeaders.append('Content-Type', 'application/json');
            }
            var raw = JSON.stringify(data);
            var requestOptions: any = {
              method: method,
              headers: myHeaders,
              body: appTYPE == 'json' ? raw : formData,
              redirect: 'follow',
            };
            console.log(
              'requestOptions:',
              requestOptions,
              '|',
              `${BASEUrl}${url}`,
              '|'
            );
            fetch(`${BASEUrl}${url}`, requestOptions)
              .then((res)=>res.json())
              .then((result: APIResponse) => {
                console.log(`${BASEUrl}${url}`, '| response->', result);
                if(result.data?.tokens)
                  {
                    AsyncStorage.setItem(LOCALSTORAGE.accessToken, result.data.tokens.accessToken);
                  }
                resolve(result);
              }).catch(error => {
                console.log(error);
                resolve({
                  status: "failed",
                  message: error.message,
                });
              });
          });
          // })
        });
  }
  export function PutDATA(
      url: string,
      data: any,
      appTYPE: 'json' | 'image' = 'json',
    ) {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "y3286wdy9132gdyv32efvy9d2egf2pdco8wtev2yekcvefcs"); 
      var formData = new FormData();
      return new Promise<APIResponse>((resolve, _reject) => {
            if (appTYPE !== 'json') {
              for (var a in data) {
                formData.append(a, data[a]);
                // data[a] = data[a]
                console.log(a, '|', data[a]);
              }
            }
            AsyncStorage.getItem(LOCALSTORAGE.accessToken).then((token: any) => {
              // AsyncStorage.getItem(LOCALSTORAGE.apiKey).then((apiKey: any) => {
                if(String(token)) {
                  myHeaders.append('Authorization', `Bearer ${token}`);
                }
               
                if (appTYPE !== 'json') {
                  myHeaders.append('Content-Type', 'multipart/form-data');
                } else {
                  myHeaders.append('Content-Type', 'application/json');
                }
              var raw = JSON.stringify(data);
              var requestOptions: any = {
                method: 'PUT',
                headers: myHeaders,
                body: appTYPE == 'json' ? raw : formData,
                redirect: 'follow',
              };
              console.log(
                'requestOptions:',
                requestOptions,
                '|',
                `${BASEUrl}${url}`,
                '|'
              );
              fetch(`${BASEUrl}${url}`, requestOptions)
                .then((res)=>res.json())
                .then((result: APIResponse) => {
                  console.log(`${BASEUrl}${url}`, '| respons->', result);
                  resolve(result);
                }).catch(error => {
                  console.log(error);
                  resolve({
                    status: "failed",
                    message: error.message,
                  });
                });
            });
          // });
        })
  }
  export function GetDATA(
      url: string,
      data: any,
      appTYPE: 'json' | 'image' = 'json',
    ) {
      var myHeaders = new Headers();
      var formData = new FormData();
      myHeaders.append("x-api-key", "y3286wdy9132gdyv32efvy9d2egf2pdco8wtev2yekcvefcs");  
      return new Promise<APIResponse>((resolve, _reject) => {
            if (appTYPE !== 'json') {
              for (var a in data) {
                formData.append(a, data[a]);
                // data[a] = data[a]
                console.log(a, '|', data[a]);
              }
            }
            AsyncStorage.getItem(LOCALSTORAGE.accessToken).then((token: any) => {
              // AsyncStorage.getItem(LOCALSTORAGE.apiKey).then((apiKey: any) => {
                if(String(token)) {
                  myHeaders.append('Authorization', `Bearer ${token}`);
                }
                if (appTYPE !== 'json') {
                  myHeaders.append('Content-Type', 'multipart/form-data');
                } else {
                  myHeaders.append('Content-Type', 'application/json');
                }
            var params:string[] = [];
            if(data !== undefined)
              {
                Object.keys((a:string)=>{
                  params.push(`${a}=${data[a]}`);
                })
              }
              var requestOptions: any = {
                method: 'GET',
                headers: myHeaders
              };
              console.log(
                'requestOptions:',
                requestOptions,
                '|',
                `${BASEUrl}${url}${params.length !== 0?"?":""}${params.join("&")}`,
                '|'
              );
              fetch(`${BASEUrl}${url}${params}`, requestOptions)
                .then(res => res.json())
                .then((result: APIResponse) => {
                  console.log(`${BASEUrl}${url}`, '| respons->', result);
                  resolve(result);
                }).catch(error => {
                 
                  console.log(error);
                  resolve({
                    status: "failed",
                    message: error.message,
                  });
                });
            });
          });
        // })
  }
  export function DeleteDATA(
    url: string,
    data: any,
    appTYPE: 'json' | 'image' = 'json',
  ) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "y3286wdy9132gdyv32efvy9d2egf2pdco8wtev2yekcvefcs"); 
    var formData = new FormData();
    var ServerStatus:boolean = true;
    return new Promise<APIResponse>((resolve, _reject) => {
          if (appTYPE !== 'json') {
            for (var a in data) {
              formData.append(a, data[a]);
              // data[a] = data[a]
              console.log(a, '|', data[a]);
            }
          }
          AsyncStorage.getItem('token').then((token: any) => {
            if (String(token) !== 'null') {
              myHeaders.append('Authorization', `Bearer ${token}`);
            }
            if (appTYPE !== 'json') {
              myHeaders.append('Content-Type', 'multipart/form-data');
            } else {
              myHeaders.append('Content-Type', 'application/json');
            }
            var raw = JSON.stringify(data);
            var requestOptions: any = {
              method: 'DELETE',
              headers: myHeaders,
              body: appTYPE == 'json' ? raw : formData,
              redirect: 'follow',
            };
            console.log(
              'requestOptions:',
              requestOptions,
              '|',
              `${BASEUrl}${url}`,
              '|'
            );
            fetch(`${BASEUrl}${url}`, requestOptions)
              .then((res)=>res.json())
              .then((result: APIResponse) => {
                console.log(`${BASEUrl}${url}`, '| respons->', result.data);
                resolve(result);
              }).catch(error => {
                console.log(error);
                resolve({
                  status: "failed",
                  message: error.message,
                });
              });
          });
        });
}
  export function ReturnMaskAll(s:string,asterick?:boolean){
    var mask:string = String(s).split("").map((a)=>{
    if(a === ".")
      {
        return "."
      }
      if(a === ",")
        {
          return ","
        }
      return  asterick?"*":"X"
    }).join("")
    return mask;
  }
  export function ReturnNumberMask(s:string){
    var mask:string[] = String(s).split("")
      return mask.map((a,i,self)=>{
        if(i >= 4 && i < self.length - 2 )
          {
            return "*"
          }
          return a
        }).join("");
  }
  export function CopyText(s:string){
    return new Promise((resolve)=>{
      Clipboard.setString(s);
      resolve(true)
    })
  }
export function GetMime(uri:string,fmt:string[])
{
var spl = String(uri).toLowerCase().split(".");
if(fmt.includes(String(spl[spl.length - 1]).toLowerCase()))
{
  return true;
}else{
  return false;
}
}
  export function UploadFile(){
    return new Promise<APIResponse>((resolve)=>{
      request(Platform.OS === "android"?
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE:PERMISSIONS.IOS.PHOTO_LIBRARY,
        {
            title: 'Storage Permission',
            message: 'QNOVA-Pro needs access to your storage to save files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    ).then((granted)=>{
    if(granted === "granted")
    {
      try {
      pickSingle({
        type:DocumentPicker.types.allFiles
      }).then((response) => {
        if (response.name) {
          if(GetMime(response.name,["csv"]))
          {
          // read file content
          RNFS.readFile(response.uri,'utf8').then((fileContent)=>{
           // Parse the CSV data
          Papa.parse(fileContent, {
            complete: (results) => {
            console.log('Parsed CSV results:', results.data);
            resolve({status:"success",message:response.name!,data:results.data})
            },
            header: true, // Use this if your CSV has headers
          });
          }).catch((err)=>{
            resolve({status:"failed",message:err.message})
          })
          }else{
            resolve({status:"failed",message:"The required file type is (XLSX) "})
          }
        }
        }).catch((e)=>{
          // alert(JSON.stringify(e.message))
        })
      } catch (error) {
        // alert(JSON.stringify(error))
      }
      }else{
        resolve({status:"failed",message:"Permission rejected."})
      }
      })
  });
  }
export const SaveTemplateFile = async (fileName:string) => {
    const filePath = `${RNFS.DownloadDirectoryPath}/QNova-Pro-${fileName}.csv`;
    try {
      const granted = await request(Platform.OS === "android"?
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE:PERMISSIONS.IOS.PHOTO_LIBRARY,
        {
            title: 'Storage Permission',
            message: 'QNOVA-Pro needs access to your storage to save files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );
    if(granted === "granted")
    {
    
    const csvData = [
      ['accountNumber','accountName','bankName','bankCode','amount','isQNovaAccount'],
      [ '0400000000','John Paul','GTB','044','1000','false']
    ];
    const csvString = csvData.map(row => row.join(',')).join('\n');
    try {
        // Write the buffer to the file
        await RNFS.writeFile(filePath, csvString, 'ascii');
        return filePath;
    } catch (error) {
        console.error('Failed to save the file:', error);
        return null;
    }
    
};
} catch (error) {
  console.error('Failed to save the file:', error);
  return null;
}
}
export const SaveStaffTemplateFile = async (fileName:string) => {
  const fileDir = RNFS.DownloadDirectoryPath;
  const filePath = `${fileDir}/QNova_Pro_${fileName}.csv`;
  const csvData = [
    ['staffId','amount'],
    [ 'RTV001','100000']
  ];
  const csvString = csvData.map(row => row.join(',')).join('\n');
  try {
    const granted = await request(Platform.OS === "android"?
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE:PERMISSIONS.IOS.PHOTO_LIBRARY,
      {
          title: 'Storage Permission',
          message: 'QNOVA-Pro needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
      }
  );
  if(granted === "granted")
  {
  try {
      // Write the buffer to the file
      await RNFS.writeFile(filePath, csvString, 'ascii');
      return filePath;
  } catch (error) {
      console.error('Failed to save the file:', error);
      return error;
  }
  
};
} catch (error) {
console.error('Failed to save the file:', error);
return null;
}
}
export const FileExplorer = ()=>{
  const FilePickerOptions = {
    type:DocumentPicker.types.allFiles
  }
  pickSingle(FilePickerOptions);
}
export const CapitalizeFirstLetter = (str:string)=> {
  if (str.length === 0) return str; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  