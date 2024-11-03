import React from 'react';
import { Form } from '@components/Issue/Form/index';
import { HeaderTitle } from '@components/HeaderTitle';
const Issue = () => {
    return (
        <>
            <HeaderTitle title="Nuevo Incidente" imagePath={require('@assets/check.png')} />
            <Form />
        </>
    );
};

export { Issue };
