"use client";

import CandidateOverview from "@/components/CandidateOverview/CandidateOverview";
import ServerErrorCard from "@/components/card/ServerErrorCard";
import CandidateOverviewLoading from "@/components/loader/CandidateOverviewLoading";
import { useGetCandidateOverviewQuery } from "@/redux/features/candidate/candidateApi";
import { useGetRecentAppliedJobsQuery } from "@/redux/features/job/jobApi";
import { useAppSelector } from "@/redux/hooks/hooks";


const CandidateOverviewPage = () => {
 const { overview } = useAppSelector((state) => state.candidate);
 const { isLoading, isError} = useGetCandidateOverviewQuery(undefined);
 const { data, isLoading:jobLoading, isError:jobError } = useGetRecentAppliedJobsQuery([
     { name: "page", value: 1 },
     { name: "limit", value: 6 },
   ]);

  if (isLoading) {
    return <CandidateOverviewLoading/>
  }

  if (!isLoading && overview && data) {
    return <CandidateOverview/>
  }
  
  if(!isLoading && !jobLoading && (isError || jobError)){
    return <ServerErrorCard/>
  }
};

export default CandidateOverviewPage;
