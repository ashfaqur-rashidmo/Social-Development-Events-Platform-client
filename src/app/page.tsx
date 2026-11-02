import Banner from '@/components/Home/Banner';
import FeatureSection from '@/components/Home/FeatureSelection';
import ImpactStats from '@/components/Home/ImpactStats';
import React from 'react';
import GallerySection from '../components/Home/GallerySection';
import NewsletterSection from "../components/Home/NewsletterSection"

const page = () => {
  return (
    <div>
       <Banner />
      <ImpactStats />
      <FeatureSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
};

export default page;