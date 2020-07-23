import React from 'react';
import { useStaticQuery, graphql} from 'gatsby';
import { Twitter} from 'react-sharingbuttons';

const Sharingbuttons = ({DataTransferItemList, url}) => {
    return(
        <>
        <Twitter url={url} ShareText={title}/>
        </>
    );
};

export default SharingButtons;