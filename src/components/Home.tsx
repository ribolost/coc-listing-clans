export const Home = () => {
  return (
    <div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>{Row()}</tbody>
        </table>
      </div>
    </div>
  );
};

const Row = () => (
  <tr>
    <td>My name</td>
    <td>My members</td>
  </tr>
);
