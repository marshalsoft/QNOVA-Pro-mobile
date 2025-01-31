import { View, Text } from 'react-native'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import BaseSelect from '../../components/baseSelect'
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import useHttp from '../../includes/http.hooks';
import { BankProp } from '../dashboard/home/components/walletTransfer/ListOfBanks';
import BaseInput from '../../components/baseInput';
import { ReturnAllNumbers } from '../../includes/functions';
import { MockInput } from '../dashboard/home/components/walletTransfer/preview';
import BaseButton from '../../components/baseButton';
import { BaseModalLoader } from '../../components/baseLoader';
const FormSchema = y.object({
    bankCode:y.string().required('Bank is required.'),
    accountNumber:y.string().required('Acount number is required.').max(10,'Maximum of 10 digits.'),
});
const NewAccountComponent = ({onSuccess}:{onSuccess:()=>void;}) => {
const {GetBanks,LinkNewAccount,VerifyBankAccount} = useHttp();
const [fetching,setFetching] = useState<boolean>(false);
const [listOfBanks,setListOfBanks] = useState<BankProp[]>([]);
const thisBnkForm = useRef() as RefObject<FormikProps<FormikValues>>;
useEffect(()=>{
    GetBanks().then((response)=>{
        if(response.status)
        {
            setListOfBanks(response.data);
        }
    });
},[])
  return (<View >
    <Formik
    innerRef={thisBnkForm}
    initialValues={{
      bankCode:"",
      bankName:"",
      accountNumber:"",
      accountName:"" 
    }}
    onSubmit={(values:FormikValues, actions:any) => {
        setFetching(true);
        if(values.accountName === "")
        {
            return VerifyBankAccount({
                accountNumber:values.accountNumber,
                channel:"IBAN",
                bankCode:values.bankCode
            }).then((res)=>{
                setFetching(false);
                if(res.data?.isValid)
                {
                 thisBnkForm.current?.setFieldValue("accountName",res.data?.data?.accountName)
                }
            })
        }
        LinkNewAccount({
            
        }).then(()=>{
            setFetching(false);
            onSuccess();
        })
    }}
    validationSchema={FormSchema}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>( 
    <View>
<BaseSelect 
searchBar
style={{marginTop:20}}
 label="Select Bank"
 placeholder="Please select a bank"
 list={listOfBanks.map((bank:BankProp,i:number)=>{
    return {title:bank.bank_name,value:bank.bank_code}
 })}
 onChange={(data)=>{
    setFieldValue("bankName",data.title);
    setFieldValue("bankCode",data.value);
    setFieldValue("accountName","");
 }}
 type="custom"
 errorMessage={touched.bankName && errors.bankName}
 />
  <BaseInput 
  type="number-pad"
 label="Account number"
 placeholder="1234567890"
 value={ReturnAllNumbers(values.accountNumber)}
 onChange={(data)=>{
    setFieldValue("accountNumber",data);
    setFieldValue("accountName","");
 }}
 max={10}
 errorMessage={touched.accountNumber && errors.accountNumber}
 />
 {values.accountName !== "" ?<MockInput
 style={{marginTop:-15}}
label='Account Name'
value={values.accountName}
 />:null}
 <BaseButton 
 title={values.accountName !== ""?'Continue':'Verify account'}
 onPress={handleSubmit}
 />
    </View>)}
    </Formik>
    {fetching && <BaseModalLoader
    modal
    />}
    </View>
  )
}

export default NewAccountComponent;