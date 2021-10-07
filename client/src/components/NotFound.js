import React from 'react';
import {Helmet} from 'react-helmet';

const Notfound = () => {
    return (
        <>
         <Helmet>
                <title>404 - not found</title>
                <meta
                    name='description'
                    content='Oops! that page not found'
                 />
        </Helmet>
        <div className="notFound">
        <div className="notFound__container">
            <div className="notFound__container__h1">404</div>
            <div className="notFound__container__p">Oops!that page not found</div>
        </div>
            
        </div>
        </>
    )
}

export default Notfound
