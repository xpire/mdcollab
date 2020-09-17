import React from "react";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Iframe from 'react-iframe'


import {CODIMD_URL} from '../../hooks/function'

const AboutPage = () => {
  let { category, task } = useParams();
  const codimdIframe = {__html: `<iframe width="100%" height="1000px" src="${CODIMD_URL}/${category}_${task}" frameborder="0" />`}
  alert(codimdIframe.__html)
  return (
    <div>
      <div dangerouslySetInnerHTML={codimdIframe}/>
    </div>

  );
};

export default AboutPage;
