import React from "react";
import { useForm } from "react-hook-form";

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };


  // console.log(watch());

  // console.log(errors.name)

  return (
    <div className=" login-modal container pt-5">
      <div className="row pt-5">
        <div className="col-sm-6 shadow round pb-3 login-modal">
          
          <div className="login-modal__head">
          <p className="login-text">Đăng Ký</p>
          <p>Bạn đã có tài khoản? <span> Đăng nhập </span></p>

          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label form-group__label ">Tên:</label>
              <div className="input-wrap">

              <input
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Tên là bắt buộc" })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
              </div>
            </div>
           
            <div className="form-group">
              <label className="col-form-label form-group__label">Email của bạn:</label>
              <div className="input-wrap">

              <input
                type="text"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", { required: "Email là bắt buộc" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email chưa đúng định dạng",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-label form-group__label">Số điện thoại của bạn:</label>
              <div className="input-wrap">
              <input
                type="text"
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", { required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Số điện thoại chưa đúng định dạng",
                },
               })}
               onKeyUp={() => {
                trigger("phone");
              }}
              />
              
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
                </div> 
              
            </div>
            <div className="form-group">
              <label className="col-form-label form-group__label">Mật khẩu:</label>
              <div className="input-wrap">

              <input
                type="text"
                className={`form-control ${errors.password && "invalid"}`}
                {...register("password", { required: "Mật khẩu là bắt buộc",
                minLength: {
                  value: 5,
                  message: "Minimum Required length is 5",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum allowed length is 10 ",
                }
               })}
               onKeyUp={() => {
                trigger("password");
               }}
               />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
              </div>

            </div>
            <button className="btn btn-primary my-3 login-submit-text">Đăng Ký</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;