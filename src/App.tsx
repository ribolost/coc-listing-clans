import React from 'react';
import './App.css';
import { Home } from './components/Home';
import { Layout } from './layout/Layout';

function App() {
  return (
    <>
      <div className='App'>
        <Layout>
          <Home></Home>
        </Layout>
      </div>
    </>
  );
}

export default App;
