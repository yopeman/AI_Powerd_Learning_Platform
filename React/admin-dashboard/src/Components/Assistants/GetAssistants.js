import React, { useEffect, useState } from 'react';
import { api } from "../../Utilities/api";
import { Link } from "react-router-dom";

export default function GetAssistants() {
  const [assistants, setAssistants] = useState([]);
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [assistantsResponse, usersResponse, fieldsResponse] = await Promise.all([
          api.get("/assistants"),
          api.get("/users"),
          api.get("/fields"),
        ]);

        setAssistants(assistantsResponse.data.data);
        setUsers(usersResponse.data.data);
        setFields(fieldsResponse.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paginatedAssistants = () => assistants.slice(offset, offset + limit);

  const getUserById = (uid) => users.find((user) => user.id === uid);
  const getFieldById = (fid) => fields.find((field) => field.id === fid);

  const handleNextPage = () => {
    if (offset + limit < assistants.length) {
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
      <h1>Get Assistants</h1>
      <table border={1}>
        <thead>
        <tr>
          <th>User Name</th>
          <th>Field</th>
          <th>User Detail</th>
          <th>Field Detail</th>
          <th>Detail</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {paginatedAssistants().map((assistant) => {
          const user = getUserById(assistant.userId);
          const field = getFieldById(assistant.fieldId);
          return (
            <tr key={assistant.id}>
              <td>{user ? `${user.first_name} ${user.last_name}` : 'Unknown User'}</td>
              <td>{field ? field.title : 'Unknown Field'}</td>
              <td>
                {user && <Link to={`/users/get/${user.id}`}>User Detail</Link>}
              </td>
              <td>
                {field && <Link to={`/fields/get/${field.id}`}>Field Detail</Link>}
              </td>
              <td>
                <Link to={`/assistants/get/${assistant.id}`}>Detail</Link>
              </td>
              <td>
                <Link to={`/assistants/update/${assistant.id}`}>Update</Link>
              </td>
              <td>
                <Link to={`/assistants/delete/${assistant.id}`}>Delete</Link>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
        <button onClick={handleNextPage} disabled={offset + limit >= assistants.length}>&gt;</button>
      </div>
    </div>
  );
}