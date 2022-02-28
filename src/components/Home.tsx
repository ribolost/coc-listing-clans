import ClashOfClans from '../services/coc';
import { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { clans } from '../data/clans';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const clansInfo = clans.items;

const columns = [
  {
    dataField: 'tag',
    text: 'Clan tag',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'name',
    text: 'Clan Name',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'type',
    text: 'Clan type',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'clanLevel',
    text: 'Clan level',
    sort: true,
    filter: textFilter(),
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
      <div className='container table-responsive'>
        <BootstrapTable
          bootstrap4
          keyField='tag'
          data={clansInfo}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 10, paginationSize: 1 })}
          filter={filterFactory()}
        />
      </div>
    </div>
  );
};
