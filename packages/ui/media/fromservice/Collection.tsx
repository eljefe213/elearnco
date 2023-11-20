import { Image } from "@nextui-org/react";
import React from "react";
const Collection = (props: {
  collection: any;
  totalPages: number;
  currentPage: number;
  _handleClick: (str: string) => void;
  _handlePageChange: (val: number) => void;
}) => {
  const {
    collection,
    totalPages,
    _handleClick,
    _handlePageChange,
    currentPage,
  } = props;

  return (
    <div className="relative">
      {/* <Paginator
        paginationProps={{
          display: 'flex',
          marginBottom: '1rem',
          marginTop: '1rem',
          justifyContent: 'flex-end',

          bottom: 0,
        }}
        activeStyles={{
          bg: 'blue.300',
          color: 'white',
          _hover: {
            bg: 'blue.400',
          },
        }}
        current={currentPage}
        total={totalPages}
        onChange={(val) => _handlePageChange(val as number)}
      /> */}
      <div className="grid grid-cols-4 gap-4 mx-auto">
        {collection?.map((image): JSX.Element => {
          return (
            <div
              key={image.id}
              className="relative overflow-hidden cursor-pointer"
              onClick={() =>
                _handleClick(
                  image?.urls?.regular
                    ? image.urls.regular
                    : image.largeImageURL
                )
              }
            >
              <Image
                width="100%"
                height="auto"
                src={
                  image?.urls?.regular ? image.urls.regular : image.previewURL
                }
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Collection;
