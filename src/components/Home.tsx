import ClashOfClans from '../services/coc';
import { useEffect } from 'react';
export const Home = () => {
  useEffect(() => {
    async function fetchData() {
      const coc = new ClashOfClans();
      console.log(coc.getClans({ limit: 2, name: 'aaa' }));
    }
    fetchData();
  }, []);
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
