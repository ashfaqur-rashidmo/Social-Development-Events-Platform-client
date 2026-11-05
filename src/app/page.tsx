import React from 'react';

import Banner from "@/components/Home/Banner";
import FeatureSection from "@/components/Home/FeatureSelection";
import ImpactStats from "@/components/Home/ImpactStats";
import RecentEventsSection from "@/components/Home/RecentEventsSection";

import GallerySection from "../components/Home/GallerySection";
import NewsletterSection from "../components/Home/NewsletterSection"

const page = () => {
  return (
    <div>
       <Banner />
      <ImpactStats />
      <FeatureSection />
      <RecentEventsSection />
      <GallerySection />
      <NewsletterSection />
    </div>
  );
};

export default page;