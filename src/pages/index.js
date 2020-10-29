import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'gatsby';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const IndexPage = () => {
  const [previous, setPrevious] = useState([]);
  const [pictures, setPictures] = useState(undefined);
  const [voteSubmit, setVoteSubmit] = useState(false);

  const fetchPictures = async () => {
    const response = await axios.post(`${BASE_URL}/round`, { previous });

    if (response.status === 200 && response.data) {
      setPictures(response.data);
      setVoteSubmit(false);
    }
  };

  const voteForPicture = async (_id) => {
    if (voteSubmit) return;
    setVoteSubmit(true);
    setPrevious([...previous, pictures[0]._id, pictures[1]._id]);

    const vote = pictures.map((p) => ({ _id: p._id, score: p.score, win: p._id === _id }));

    const response = await axios.put(`${BASE_URL}/vote`, { vote });
    if (response.status === 200) fetchPictures();
  };

  if (previous.length >= 100) setPrevious([]);

  useEffect(() => {
    fetchPictures();
  }, []);

  if (!pictures)
    return (
      <header className="pt-2 text-center">
        <h1 className="text-4xl">CatMash</h1>
        <Link to="/leaderboard" className="hover:underline focus:underline">
          Leaderboard
        </Link>
        <div>Loading Round...</div>
      </header>
    );

  return (
    <>
      <header className="pt-2 text-center">
        <h1 className="text-4xl">CatMash</h1>
        <Link to="/leaderboard" className="hover:underline focus:underline">
          Leaderboard
        </Link>
      </header>
      <main className="container flex items-center justify-center py-24">
        <div className="grid grid-cols-6 gap-12 md:grid-cols-12">
          <div className="flex items-center col-span-6">
            <button
              type="button"
              aria-label="Vote for id"
              onClick={() => voteForPicture(pictures[0]._id)}
            >
              <img className="thumbnail" src={pictures[0].url} alt="Vote for left" />
            </button>
          </div>
          <div className="flex items-center col-span-6">
            <button
              type="button"
              aria-label="Vote for id"
              onClick={() => voteForPicture(pictures[1]._id)}
            >
              <img className="thumbnail" src={pictures[1].url} alt="Vote for right" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndexPage;
