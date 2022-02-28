import ClashOfClans from '../services/coc';
import { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { clans } from '../data/clans';

const clansInfo = clans.items;

const columns = [
  {
    dataField: 'tag',
    text: 'Clan tag',
  },
  {
    dataField: 'name',
    text: 'Clan Name',
  },
  {
    dataField: 'type',
    text: 'Clan type',
  },
  {
    dataField: 'clanLevel',
    text: 'Clan level',
  },
];

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
        <BootstrapTable
          bootstrap4
          keyField='id'
          data={clansInfo}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 1 })}
        />
      </div>
    </div>
  );
};
