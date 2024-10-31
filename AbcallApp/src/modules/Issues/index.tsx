import React from 'react';
import {HeaderTitle} from '@components/HeaderTitle';
import {SecondaryHeader} from '@components/Issues/SecondaryHeader';
import {IssueList} from '@components/Issues/IssueList';

const dataMocked = [
  {
    id: '89e91232-daac-4482-b2be-f32a7707b3fb',
    authUserId: 'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    status: 'Created',
    subject: 'Errores de autenticación',
    description: 'Lorem Ipsum 534',
    createdAt: '2023-10-25 05:00:00+00:00',
    closedAt: '2024-09-29 05:00:00+00:00',
    channelPlanId: '6938edfe-9f4b-445b-8dd5-fbaa570a273a',
  },
  {
    id: '4c69dc07-7e1a-4de2-8095-8aa5a7a9cc60',
    authUserId: 'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    status: 'In Progress',
    subject: 'Error de conexión',
    description: 'Lorem Ipsum 241',
    createdAt: '2023-10-26 05:00:00+00:00',
    closedAt: '2024-09-07 05:00:00+00:00',
    channelPlanId: '3a46cc3e-b2ee-4aa0-8498-163e04eb1430',
  },
  {
    id: '0383a946-09b6-4814-be2f-72d6629b1913',
    authUserId: 'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    status: 'Solved',
    subject: 'Errores de autenticación',
    description: 'Lorem Ipsum 396',
    createdAt: '2023-10-26 05:00:00+00:00',
    closedAt: '2023-12-05 05:00:00+00:00',
    channelPlanId: '6938edfe-9f4b-445b-8dd5-fbaa570a273a',
  },
  {
    id: '0383a946-09b6-4814-be2f-72d6629b1914',
    authUserId: 'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    status: 'Solved',
    subject: 'Errores de autenticación',
    description: 'Lorem Ipsum 396',
    createdAt: '2023-10-26 05:00:00+00:00',
    closedAt: '2023-12-05 05:00:00+00:00',
    channelPlanId: '6938edfe-9f4b-445b-8dd5-fbaa570a273a',
  },
  {
    id: '0383a946-09b6-4814-be2f-72d6629b1915',
    authUserId: 'f7d0b546-94cb-468f-acf9-a3f287ba1b77',
    status: 'Solved',
    subject: 'Errores de autenticación',
    description: 'Lorem Ipsum 396',
    createdAt: '2023-10-26 05:00:00+00:00',
    closedAt: '2023-12-05 05:00:00+00:00',
    channelPlanId: '6938edfe-9f4b-445b-8dd5-fbaa570a273a',
  },
];

const Issues = () => {
  return (
    <>
      <HeaderTitle
        imagePath={require('@assets/issue.png')}
        title="Incidentes"
      />
      <SecondaryHeader />
      <IssueList list={dataMocked} />
    </>
  );
};

export {Issues};
