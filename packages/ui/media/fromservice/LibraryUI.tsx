"use client";
import { Pagination, Spinner } from "@nextui-org/react";
import useLocalStorage from "customhooks/use-local-storage";
import UnsplashApi from "lib/services/unsplash";
import React, { useEffect, useState } from "react";
import { EActionsMedia } from "schemas";
import { useCourseStore } from "store";

import SearchUI from "../../search/SearchUI";
import Collection from "./Collection";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
}
export const unsplashApi = process.env.UNSPLASH_KEY
  ? new UnsplashApi(process.env.UNSPLASH_KEY)
  : new UnsplashApi("DgRJiwmtsvDgvZl2NCCKOey1Scam6iOir-B-nUzyxbQ");

interface IProps {
  action: string;
  onClose: () => void;
}

export const LibraryUI = (props: IProps) => {
  const { onClose, action } = props;
  const { updateBanner } = useCourseStore();
  const [isSearch, setSearch] = useLocalStorage<string>(
    "search_in_library",
    "dog"
  );
  const [error, setError] = useState<string>("");
  const [medias, setMedias] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _handleClick = (id: string): void => {
    if (action === (EActionsMedia.UPDATE_IMAGE_BANNER as string)) {
      updateBanner(id);
    }
    onClose();
  };

  const _handleChange = async (value: string): Promise<void> => {
    // await e.preventDefault();
    await _handleSearch(value);
  };

  const _handleSearch = async (query: string): Promise<void> => {
    setIsLoading(true);
    setSearch(query);
    if (unsplashApi) {
      const [fetchedPhotos, fetchedTotalPages] = await unsplashApi.searchPhotos(
        query,
        1,
        12
      );

      setMedias(fetchedPhotos);
      setTotalPages(fetchedTotalPages);
    } else {
      setError("error");
    }
    setIsLoading(false);
  };

  async function _handlePageChange(newPage: number): Promise<void> {
    setIsLoading(true);
    if (unsplashApi) {
      const [fetchedPhotos] = await unsplashApi.searchPhotos(
        isSearch,
        newPage,
        12
      );
      setMedias(fetchedPhotos);
      setCurrentPage(newPage);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    _handleSearch(isSearch ? isSearch : "dog");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error !== "") return error;

  return (
    <>
      <div className="sticky top-0 bg-default-50 z-50 p-2 flex items-center justify-between">
        <SearchUI placeholder="Search an image" callback={_handleChange} />

        <Pagination
          onChange={_handlePageChange}
          total={totalPages}
          initialPage={1}
          page={currentPage}
          size="sm"
          radius="full"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <Collection
          {...{
            _handleClick: _handleClick,
            collection: medias,
            _handlePageChange,
            totalPages,
            currentPage,
          }}
        />
      )}
    </>
  );
};

export default LibraryUI;
