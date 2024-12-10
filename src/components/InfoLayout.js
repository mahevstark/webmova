import React from "react";
import Layoutsettings from '../pop-ups/layout-settings'
import Layout from '../components/layout/layout'

export default function InfoLayout({ heading, content }) {
  return (
  <Layout 	page={"settings"}
  >

<div className="flex sm:flex-row flex-col ">
      <Layoutsettings />{" "}
      <div className="mx-6 mt-12 border rounded-md py-4 w-auto sm:w-full  space-y-8  sm:mt-0  sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
        <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
          <h1 className="text-xl font-semibold text-black">{heading}</h1>
        </div>
        <hr className="custom-hr" />
        <div className="px-6 sm:pb-0 pb-12" style={{margin:'0px', marginTop:'15px'}}>
          <p className="settings-p">
           {content}
          </p>
        </div>
      </div>
    </div>
  </Layout>
  );
}
