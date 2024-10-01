import React, { useEffect, useState } from 'react';
import MultiLangApi from '../services/api/general-apis/multilanguage-api';
import { CONSTANTS } from '../services/config/app-config';
import { useDispatch } from 'react-redux';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';
import MetaTag from '../services/api/general-apis/meta-tag-api';
import PageMetaData from '../components/PageMetaData';
import HomePageMaster from '../components/Hompage/HomePageMaster';

const Home = ({ fetchedDataFromServer }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchedDataFromServer?.multiLingualListTranslationTextList) {
      dispatch(setMultiLingualData(fetchedDataFromServer.multiLingualListTranslationTextList));
    }
  }, []);
  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <PageMetaData meta_data={fetchedDataFromServer?.metaTagsData} />}
      <HomePageMaster />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { SUMMIT_APP_CONFIG } = CONSTANTS;
  let fetchedDataFromServer: any = {};
  const method = 'get_meta_tags';
  const version = SUMMIT_APP_CONFIG.version;
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;
  if (CONSTANTS.ENABLE_META_TAGS) {
    let metaData: any = await MetaTag(`${CONSTANTS.API_BASE_URL}${SUMMIT_APP_CONFIG.app_name}${params}&page_name=${url}`);
    if (metaData.status === 200 && metaData?.data?.message?.msg === 'success' && metaData?.data?.message?.data !== 'null') {
      fetchedDataFromServer.metaTagsData = metaData?.data?.message?.data;
    }
  }
  const multiLangParams = {
    appConfig: SUMMIT_APP_CONFIG,
  };
  const MultilanguageData = await MultiLangApi(multiLangParams.appConfig);
  if (MultilanguageData?.length > 0) {
    fetchedDataFromServer.multiLingualListTranslationTextList = MultilanguageData;
  }

  return {
    props: {
      fetchedDataFromServer,
    },
  };
}

export default Home;
