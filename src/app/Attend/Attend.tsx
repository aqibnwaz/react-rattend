import * as React from 'react';
import { useState, useEffect } from 'react';
import { SettingModal } from './SettingModal';
import { RecordAttendance } from './RecordAttendence';
import attendServices from '../../services/attend.services';
import { Page, PageHeader, PageHeaderTools, PageSection, Title, Button } from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { TsugiDone } from '@app/tsugi_local';
import './attend.css';
import { bool } from 'prop-types';

export interface rowsInterfact {
  cells: any;
}
const Attend: React.FunctionComponent = () => {
  const [columns, setColumn] = useState([
    { title: 'User' },
    { title: 'Attendence' },
    {
      title: 'IP Address',
    },
  ]);
  const [rows, setRows] = useState<rowsInterfact[]>([]);

  const Header = (
    <PageHeader
      logo={<TsugiDone />}
      // logoProps={logoProps}
      headerTools={
        <Button variant="primary" onClick={() => setisModalOPen(true)}>
          Settings
        </Button>
      }
      // topNav="Navigation"
    />
  );
  const [isModalOpen, setisModalOPen] = useState(false);
  useEffect(() => {
    //console.log(window.sessionStorage.getItem("_old_code"))
    if (_TSUGI.instructor) {
      const result = attendServices.GetAttendData();
      result
        .then((data) => {
          //console.log(data)
          setRows(
            data.map((data1) => {
              console.log(data1);
              return { cells: [data1.displayname || 'anonymous', data1.attend, data1.ipaddr] };
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, []);
  if (_TSUGI.instructor) {
    return (
      <>
        <Page header={Header}>
          <PageSection>
            <div className="page-header">
              <p>
                Welcome {_TSUGI.user_displayname} from {_TSUGI.context_title} (instructor)
              </p>
              <div className="header-btns">
                <Button
                  variant="primary"
                  onClick={() => {
                    const result = attendServices.ClearData();
                    result.then((data) => {
                      setRows([]);
                      setColumn([]);
                    });
                  }}
                >
                  Clear data
                </Button>
              </div>
            </div>

            <Table aria-label="Simple Table" cells={columns} rows={rows}>
              <TableHeader />

              <TableBody />
            </Table>

            <SettingModal isModalOpen={isModalOpen} setisModalOPen={setisModalOPen} />
          </PageSection>
        </Page>
      </>
    );
  } else {
    return (
      <PageSection>
        <RecordAttendance />
      </PageSection>
    );
  }
};

export { Attend };
