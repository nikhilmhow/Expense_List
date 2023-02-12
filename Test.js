// const handleClick = async ()=>{
//     try{
//       //Check for Permission if Permission is already given or not
//       let isPermitedExternalStorage = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );   
//       if(!isPermitedExternalStorage){
//         //ask for permission
//         const granted =await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {  
//             title:"Storage permission needed",
//             buttonNeutral:"Ask Me Later",
//             buttonNegative:"Cancel",
//             buttonPositive:"OK",
//           }
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED){
//           //PERMISSION GRANTED
//             exportDataToExcel();
//             console.log('permission granted');
//           }else{
//             //permission denied
//               console.log("per denied");
//             }
//           }else{
//             //Already have Permmission(calling our exportData Toexcel function)
//             exportDataToExcel();
//         }  
//       }catch(e){
//         console.log('Error while checking permission');
//         console.log(e);
//         return;

//       }
//     }
  
