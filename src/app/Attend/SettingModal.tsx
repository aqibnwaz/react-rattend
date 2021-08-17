import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  PageSection,
  Button,
  Modal,
  ModalVariant,
  Form,
  FormGroup,
  TextInput,
  Checkbox,
  Popover,
  ActionGroup,
} from '@patternfly/react-core';
import attendServices from '../../services/attend.services';
import { Table, TableHeader, TableBody, textCenter } from '@patternfly/react-table';

interface settingprops {
  isModalOpen: boolean;
  setisModalOPen: Function;
}
export const SettingModal: React.FC<settingprops> = ({ isModalOpen, setisModalOPen }) => {
  const old_code = window.sessionStorage.getItem('_old_code') || '';
  console.log('Retrieve code from session_storage');
  const [code, setcode] = useState(old_code);
  const [grade, setgrade] = useState(0);
  const [ipaddr, setipaddr] = useState('');

  function submitSetting() {
    const data = {
      code: code,
      grade: grade,
      match: '',
    };
    window.sessionStorage.setItem('_old_code', code);

    const result = attendServices.UpdateSettings(data);
    setisModalOPen(false);
  }

  return (
    <>
      <PageSection>
        <Modal
          variant={ModalVariant.medium}
          title="React Attent Settings"
          isOpen={isModalOpen}
          onClose={() => setisModalOPen(false)}
          actions={[]}
        >
          <Form>
            <FormGroup isRequired fieldId="simple-form-name-01" helperText="Configure the LTI Tool :D"></FormGroup>
            <FormGroup label="Code" isRequired fieldId="simple-form-name-01" helperText="">
              <TextInput
                isRequired
                type="text"
                id="simple-form-name-01"
                name="simple-form-name-01"
                aria-describedby="simple-form-name-01-helper"
                value={code}
                onChange={(e) => {
                  setcode(e);
                }}
              />
            </FormGroup>
            <FormGroup fieldId="checkbox01">
              <Checkbox
                label="Send a Grade"
                id="checkbox01"
                name="checkbox01"
                aria-label="Update via email"
                isChecked={grade === 1 ? true : false}
                onChange={(e) => {
                  console.log(e);
                  e ? setgrade(1) : setgrade(0);
                }}
              />
            </FormGroup>
            <FormGroup
              label="Limit access by IP address. This can be a prefix of an IP address
           like '142.16.41' or if it starts with a '/' it can be a regular expression (PHP syntax)"
              isRequired
              fieldId="simple-form-name-01"
              helperText="Your current IP address is ::1"
            >
              <TextInput
                isRequired
                type="text"
                id="simple-form-name-01"
                name="simple-form-name-01"
                aria-describedby="simple-form-name-01-helper"
                value={ipaddr}
                onChange={(e) => setipaddr(e)}
              />
            </FormGroup>
            <ActionGroup>
              <Button variant="primary" onClick={submitSetting}>
                Submit form
              </Button>
              <Button variant="link" onClick={() => setisModalOPen(false)}>
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        </Modal>
      </PageSection>
    </>
  );
};
