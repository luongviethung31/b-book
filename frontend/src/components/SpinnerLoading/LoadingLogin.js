import React, {CSSProperties} from 'react';
import { RotateLoader} from "react-spinners";

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff33',
    zIndex: 2000,
}

const loadingIcon = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
}

function LoadingLogin(props) {
    return (
        <div className='loading-screen' style={style}>
            <RotateLoader color={"#5584AC"} loading={true} cssOverride={loadingIcon} />
        </div>
    );
}

export default LoadingLogin;