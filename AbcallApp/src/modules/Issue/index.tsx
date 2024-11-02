import { Form } from '@components/Issue/Form/index';
import { HeaderTitle } from '@components/HeaderTitle';
import React from 'react';
const Issue = () => {
    return (
        <>
            <HeaderTitle title="Nuevo Incidente" imagePath={require('@assets/check.png')} />
            <Form />
        </>
    );
};

export { Issue };
