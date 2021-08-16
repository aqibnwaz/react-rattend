import * as React from 'react';
import {useState,useEffect} from 'react';
import { PageSection,Title, Form, FormGroup, TextInput,Button
 } from '@patternfly/react-core';
 import attendServices from '../../services/attend.services';

export const RecordAttendance: React.FC = () => {
  const [code,setCode]= useState('');
  const [codeError,setcodeError]=useState('');
    const data= 
      {
        "code": "1230",
        "grade": "1",
        "match": ""
    }
    
    function submitAttendance(){
     if(code=="1230"){
      attendServices.RecordAttendance(data);
      setcodeError('Success');
     }else
     {
      setcodeError("Your code is invalid/Enter 1230 for success");
    }
  }
  return (
    <>
  <PageSection>
  <Title headingLevel="h1" size="lg">Record Attendance </Title>
  <div className="attendance-container">
  <Form>
        
        <FormGroup
          label="Enter Code"
         
          isRequired
          fieldId="simple-form-name-01"
          helperText=""
        >
          <TextInput
            isRequired
            type="text"
            id="simple-form-name-01"
            name="simple-form-name-01"
            aria-describedby="simple-form-name-01-helper"
            value={code}
            onChange={(e)=>{
              
              setCode(e)
            }}
          />
          <Button onClick={ submitAttendance } variant="primary">Record Attandence</Button>
        </FormGroup>
        <FormGroup
          label={codeError}
          fieldId="simple-form-name-01"
          helperText=""
        ></FormGroup>
        
        </Form>
        </div>
  </PageSection>
  </>
)
  }

