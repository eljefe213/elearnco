"use client";
import { Pagination } from "@nextui-org/react";
import useLocalStorage from "customhooks/use-local-storage";
import React, { useEffect, useState } from "react";
import { EActionsMedia } from "schemas";
import { useCourseStore } from "store";

import { LoadingSpinnerUI } from "../../loading";
import SearchUI from "../../search/SearchUI";
import Collection from "./Collection";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
}

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
    await _handleSearch(value);
  };

  const fetchData = async (query, page, perpage) => {
    try {
      const response = await fetch(
        `/api/unsplash?query=${query}&page=${page}&perPage=${perpage}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const { photos: fetchedPhotos, totalPages: fetchedTotalPages } =
        await response.json();

      setMedias(fetchedPhotos);
      setTotalPages(fetchedTotalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data from Unsplash API route", error);
    }
  };

  const _handleSearch = async (query: string): Promise<void> => {
    setIsLoading(true);
    setSearch(query);
    fetchData(query, 1, 12);
  };

  async function _handlePageChange(newPage: number): Promise<void> {
    setIsLoading(true);
    fetchData(isSearch, newPage, 12);
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
        <LoadingSpinnerUI />
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
