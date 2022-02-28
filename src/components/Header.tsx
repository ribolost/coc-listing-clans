import '../assets/css/header.css';

export const Header = () => {
  return (
    <header className=''>
      <div className='container-fluid'>
        <img src='logo.png' className='App-logo' alt='logo' />
        <h1 className='h1'>
          Clash of Clans: <span className='subtitle'>listing the clans</span>
        </h1>
      </div>
    </header>
  );
};
