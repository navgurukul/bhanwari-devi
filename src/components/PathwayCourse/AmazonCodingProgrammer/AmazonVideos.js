import React, { useState } from "react";
import YouTubePlaylist from "./YouTubePlaylist";
import { Typography, Box, Container } from "@mui/material";
import ReactPaginate from "react-paginate";

const AmazonVideos = () => {
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [slicedVideos, setSlicedVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 6;
  const totalCount = playlistVideos?.length;
  const pageCount = Math.ceil(totalCount / limit);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, marginTop: "64px", display: "flex" }}>
          <Typography variant="h5">Amazon Coding Programmers</Typography>
          <div className="last-item">
            <ReactPaginate
              previousLabel={<i className="fa fa-angle-left"></i>}
              nextLabel={<i className="fa fa-angle-right"></i>}
              initialPage={0}
              marginPagesDisplayed={0}
              onPageChange={changePage}
              pageCount={pageCount}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </div>
        </Box>

        <Box sx={{ flexGrow: 1, marginTop: "32px" }}>
          <Typography variant="h6" margin="32px 0px">
            Batch 1
          </Typography>
          <YouTubePlaylist
            setPlaylistVideos={setPlaylistVideos}
            playlistVideos={playlistVideos}
            slicedVideos={slicedVideos}
            setSlicedVideos={setSlicedVideos}
            pageNumber={pageNumber}
            limit={limit}
          />
        </Box>
      </Container>
    </>
  );
};

export default AmazonVideos;
