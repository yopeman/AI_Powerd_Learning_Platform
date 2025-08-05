import React, {useEffect, useState} from 'react'
import {api, authApi} from "../../Utilities/api";
import {Link} from "react-router-dom";

export default function GetCertificates() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [resultsResponse, usersResponse] = await Promise.all([
          api.get("/certifications/results"),
          api.get("/users"),
        ]);

        setResults(resultsResponse.data.data);
        setUsers(usersResponse.data.data);
        console.log(resultsResponse.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginatedResults = () => results.slice(offset, offset + limit);

  const getUserById = (uid) => users.find((user) => user.id === uid);
  const handleNextPage = () => {
    if (offset + limit < results.length) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Get Certificates</h1>
      <table border={1}>
        <thead>
        <tr>
          <th>User Name</th>
          <th>User Detail</th>
          <th>Score</th>
          <th>Certifications</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {paginatedResults().map((result) => {
          const user = getUserById(result.userId);
          return (
            <tr key={result.id}>
              <td>{user ? `${user.first_name} ${user.last_name}` : 'Unknown User'}</td>
              <td>
                {user && <Link to={`/users/get/${user.id}`}>User Detail</Link>}
              </td>
              <td>{result.value}%</td>
              <td>
                <a href={`${authApi.getUri()}/results/${result.id}/link`} target="_blank" rel="noopener noreferrer">Certifications</a>
              </td>
              <td>
                <Link to={`/certificates/delete/${result.id}`}>Delete</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= results.length}>&gt;</button>
      </div>
    </div>
  );
}