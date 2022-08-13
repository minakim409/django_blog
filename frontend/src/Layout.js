import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Header, Content } = Layout;

const LayoutApp = () => {
  const nav = [
  // { label: 
  //   (
  //     <a href="/" rel="noopener noreferrer">
  //       Home
  //     </a>
  //   ),
    
  //   key: '1', }, // remember to pass the key prop
    
    
    { label: 
    (
      <a href="/articles" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: '1' }, // which is required

    { label: 
      (
        <a href="/login" rel="noopener noreferrer">
          Login
        </a>
      ),
      key: '2' },

      { label: 
        (
          <a href="/register" rel="noopener noreferrer">
            Register
          </a>
        ),
        key: '3' },

        { label: 
          (
            <a href="/logout" rel="noopener noreferrer" >
              Logout
            </a>
          ),
          key: '4' },

  ];
  
  
  return (
    <Header>
          <div className="logo" />
            
            <Menu items={nav} 
              theme="dark"
              mode="horizontal"
            >
              {/* <Menu.Item>Home</Menu.Item> */}
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>Login</Menu.Item>
              <Menu.Item>Register</Menu.Item>
              <Menu.Item>Logout</Menu.Item>

              {/* <Menu.SubMenu title="sub menu">
                <Menu.Item>item 3</Menu.Item>
              </Menu.SubMenu> */}
            </Menu>
            
    </Header>
    // <div>
    //   <header style={{ background: 'lightgray', padding: 16, fontSize: 24 }}>
    //     <button onClick={goBack}> Previous Page </button>
    //     <button onClick={goArticles}> Posts </button>
    //     <button onClick={goLogin}> LogIn </button>
    //     {/* <button onClick={goRegister}> Logout </button> */}
    //     <button onClick={goRegister}> Register </button>
        
    //   </header>
    //   <main>
    //     <Outlet />
    //   </main>
    // </div>
  );
};

export default LayoutApp;