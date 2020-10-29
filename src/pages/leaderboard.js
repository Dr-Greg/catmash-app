import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'gatsby';

const { BASE_URL } = process.env;

const LeaderBoard = () => {
  const [leaderboard, setLeadearboard] = useState([]);

  const fetchLeaderboard = async () => {
    const response = await axios.get(`${BASE_URL}/leaderboard`);

    if (response.status === 200 && response.data) {
      setLeadearboard(response.data);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <>
      <header className="pt-2 text-center">
        <h1 className="text-4xl">CatMash - Leaderboard</h1>
        <Link to="/" className="hover:underline focus:underline">
          Vote
        </Link>
      </header>
      <main className="container pt-12">
        <ul>
          {leaderboard.map((cat) => (
            <li className="flex flex-col items-center justify-center m-5">
              <div className="text-center">
                <img src={cat.url} alt={cat.score} className="thumbnail" />
                <span className="pb-5 text-3xl">{`Score: ${cat.score}`}</span>
                <hr />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default LeaderBoard;
