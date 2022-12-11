import './App.css';
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import UserRoutes from 'route/UserRoutes';
import { ReactNotifications } from 'react-notifications-component'
import { useDispatch, useSelector } from 'react-redux';
import { handleShowLoginModal, setAccountInfo, setLoading } from 'redux/reducers/auth/action';
import userAPI from 'api/userAPI';
import useNotification from 'hooks/notification';
import { setAccessToken, setUser } from 'hooks/localAuth';
import LoginModal from 'components/modal/LoginModal';
import { useEffect } from 'react';
import { ROUTE_CONTROL_GENRE } from 'route/Types';
function App() {
  const dispatch = useDispatch()
  const { isShowLoginModal } = useSelector(store => store.auth)
  const handleLogin = (data) => {
    dispatch(setLoading(true))
    userAPI.login(data)
      .then(rs => {
        if (rs.status === 200) {
          dispatch(setLoading(false))
          setAccessToken(rs.data.token);
          setUser(JSON.stringify({
            last_name: rs.data.last_name,
            first_name: rs.data.first_name,
            is_admin: rs.data.is_admin,
            user_id: rs.data.user_id,
            email: rs.data.email
          }))
          dispatch(setAccountInfo({
            last_name: rs.data.last_name,
            first_name: rs.data.first_name,
            is_admin: rs.data.is_admin,
            user_id: rs.data.user_id,
            email: rs.data.email
          }))
          if(rs.data.is_admin) window.open(ROUTE_CONTROL_GENRE, '_self')
          else window.location.reload();
        }
      })
      .catch(e => {
        dispatch(setLoading(false))
        useNotification.Error({
          title: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG!",
          message: "Email hoặc mật khẩu không đúng!"
        })
      })
  }
  const {userInfo} = useSelector(store => store.auth)
  useEffect(() => {
      if(userInfo.is_admin) window.open(ROUTE_CONTROL_GENRE, '_self')
    },[])
  // useEffect(() => {
  //   setAccessToken('494bfaf5f44d9021f2db86caeaf79541b0c0fde4');
  //   setUser(JSON.stringify({
  //     last_name: 'Hung',
  //     first_name:  'Luong',
  //     is_admin: false,
  //     user_id: 2,
  //   }))
  // },[])
  return (
    <BrowserRouter>
      <div className="App">
        <ReactNotifications />
        <UserRoutes />
        <LoginModal show={isShowLoginModal} handleClose={() => dispatch(handleShowLoginModal(false))} handleLogin={handleLogin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
