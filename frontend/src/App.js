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
function App() {
  const dispatch = useDispatch()
  const { isShowLoginModal } = useSelector(store => store.auth)
  const handleLogin = (data) => {
    dispatch(setLoading(true))
    userAPI.login(data)
      .then(rs => {
        console.log(rs);
        if (rs.status === 200) {
          dispatch(setLoading(false))
          setAccessToken(rs.data.token);
          setUser(JSON.stringify({
            last_name: rs.data.last_name,
            first_name: rs.data.first_name,
            is_admin: rs.data.is_admin
          }))
          dispatch(setAccountInfo({
            last_name: rs.data.last_name,
            first_name: rs.data.first_name,
            is_admin: rs.data.is_admin
          }))
          window.location.reload();
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
