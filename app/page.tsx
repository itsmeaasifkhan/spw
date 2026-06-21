"use client";
import { loveData } from "@/data/loveData";
import { PageLoader } from "@/components/PageLoader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HeartCursorTrail } from "@/components/HeartCursorTrail";
import { HeroSection } from "@/components/HeroSection";
import { LoveLetterSection } from "@/components/LoveLetterSection";
import { ReasonsSection } from "@/components/ReasonsSection";
import { MemoriesTimeline } from "@/components/MemoriesTimeline";
import { LoveMeterSection } from "@/components/LoveMeterSection";
import { FutureDreamsSection } from "@/components/FutureDreamsSection";
import { RelationshipCounter } from "@/components/RelationshipCounter";
import { SecretMessageSection } from "@/components/SecretMessageSection";
import { FinalSection } from "@/components/FinalSection";
import { MusicToggle } from "@/components/MusicToggle";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <HeartCursorTrail />
      <MusicToggle />

      <main>
        <HeroSection
          girlfriendName={loveData.girlfriendName}
          romanticMessages={loveData.romanticMessages}
        />

        <LoveLetterSection
          letter={loveData.loveLetter}
          girlfriendName={loveData.girlfriendName}
        />

        <ReasonsSection
          reasons={loveData.reasonsILoveHer}
          girlfriendName={loveData.girlfriendName}
        />

        <MemoriesTimeline memories={loveData.memoryCards} />

        <LoveMeterSection />

        <FutureDreamsSection dreams={loveData.futureDreams} />

        <RelationshipCounter
          startDate={loveData.relationshipStartDate}
          girlfriendName={loveData.girlfriendName}
        />

        <SecretMessageSection
          specialQuote={loveData.specialQuote}
          girlfriendName={loveData.girlfriendName}
        />

        <FinalSection
          girlfriendName={loveData.girlfriendName}
          specialQuote={loveData.specialQuote}
        />
      </main>
    </>
  );
}
