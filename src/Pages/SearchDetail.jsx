import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { SearchService } from "../services/search.service";
import SinglePostLoop from "../components/SinglePostLoop/SinglePostLoop";

function SearchDetail() {
  const { searchDetail } = useParams();

  const { data: searchPostData, isLoading: searchPostDataLoading } = useQuery(
    ["search", searchDetail],
    () => SearchService.searchPost({ query_custom: searchDetail }),
    {
      enabled: Boolean(searchDetail),
    }
  );

  const searchPostDataMemo = useMemo(
    () => searchPostData?.data?.results,
    [searchPostData?.data?.results]
  );

  if (searchPostDataLoading) {
    return "Loading....";
  }
  return (
    <div>
      <h1 class="page-header">Searching this post : {searchDetail}</h1>
      {searchPostDataMemo?.length > 0 ? (
        searchPostDataMemo?.map((singlePost) => {
          return <SinglePostLoop singlePost={singlePost} />;
        })
      ) : (
        <h2>No Post Found!</h2>
      )}
    </div>
  );
}

export default SearchDetail;
