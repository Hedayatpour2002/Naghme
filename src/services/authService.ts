import apiClient from "@/utils/axiosInstance";

export async function registerUser(
  email: string,
  password: string,
  user_name: string,
  phone_number: string
) {
  try {
    const response = await apiClient.post("/iam/users/register", {
      email,
      password,
      user_name,
      phone_number,
      signin_date: Date.now(),
      last_login: Date.now(),
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } };
      };

      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            const errorMessage = axiosError.response.data?.message;
            if (errorMessage?.includes("Validation errors")) {
              throw new Error("داده‌های ارسالی نامعتبر هستند.");
            } else if (errorMessage?.includes("Email already exists")) {
              throw new Error("این ایمیل قبلاً ثبت شده است.");
            } else {
              throw new Error("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
            }
          case 409:
            throw new Error("این ایمیل قبلاً ثبت شده است.");
          default:
            throw new Error("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
    }
  }
}
export async function loginUser(email: string, password: string) {
  try {
    const response = await apiClient.get("/iam/users/login", {
      params: { email, password },
    });

    switch (response.status) {
      case 200:
        if (response.data.token) {
          const token = response.data.token;

          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          document.cookie = `token=${token}; path=/;`;

          return token;
        }
        break;
      default:
        throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } };
      };

      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            const errorMessage = axiosError.response.data?.message;
            if (errorMessage?.includes("Validation errors")) {
              throw new Error("داده‌های ارسالی نامعتبر هستند.");
            } else if (errorMessage?.includes("NOT found")) {
              throw new Error("کاربری با این ایمیل یافت نشد.");
            } else if (errorMessage?.includes("NOT correct")) {
              throw new Error("گذرواژه وارد شده صحیح نیست.");
            } else {
              throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
            }
          case 401:
            throw new Error(
              "ایمیل یا گذرواژه وارد شده صحیح نیست. لطفاً دوباره تلاش کنید."
            );
          case 500:
            throw new Error("خطای سرور. لطفاً دوباره تلاش کنید.");
          default:
            throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await apiClient.get("/iam/users/login", {
      params: { email, password },
    });

    switch (response.status) {
      case 200:
        if (response.data.token) {
          const token = response.data.token;

          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          document.cookie = `token=${token}; path=/;`;

          return token;
        }
        break;
      default:
        throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } };
      };

      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            const errorMessage = axiosError.response.data?.message;
            if (errorMessage?.includes("Validation errors")) {
              throw new Error("داده‌های ارسالی نامعتبر هستند.");
            } else if (errorMessage?.includes("NOT found")) {
              throw new Error("کاربری با این ایمیل یافت نشد.");
            } else if (errorMessage?.includes("NOT correct")) {
              throw new Error("گذرواژه وارد شده صحیح نیست.");
            } else {
              throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
            }
          case 401:
            throw new Error(
              "ایمیل یا گذرواژه وارد شده صحیح نیست. لطفاً دوباره تلاش کنید."
            );
          case 500:
            throw new Error("خطای سرور. لطفاً دوباره تلاش کنید.");
          default:
            throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const response = await apiClient.put("/api/change-password", {
      oldPassword,
      newPassword,
    });

    switch (response.status) {
      case 200:
        return response.data;
      case 400:
        throw new Error("رمز عبور قدیمی نادرست است.");
      default:
        throw new Error("خطای ناشناخته در تغییر رمز عبور.");
    }
  } catch (error: unknown) {
    console.error("Error in changePassword:", error);
    throw new Error("خطا در تغییر رمز عبور. لطفاً دوباره تلاش کنید.");
  }
}

export async function resetPassword(
  email: string,
  phoneNumber: string,
  otp: string,
  newPassword: string
) {
  console.log({
    email,
    phone_number: phoneNumber,
    auth: otp,
    new_password: newPassword,
  });

  try {
    const response = await apiClient.put("/iam/users/retrieve-password", {
      email,
      phone_number: phoneNumber,
      auth: otp,
      new_password: newPassword,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطای ناشناخته در بازنشانی گذرواژه.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } };
      };
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            const errorMessage = axiosError.response.data?.message;
            if (errorMessage?.includes("Validation errors")) {
              throw new Error("داده‌های ارسالی نامعتبر هستند.");
            } else if (errorMessage?.includes("NOT found")) {
              throw new Error("کاربری با این ایمیل یافت نشد.");
            } else if (
              errorMessage?.includes("User phone number is NOT correct")
            ) {
              throw new Error("شماره تلفن وارد شده صحیح نیست.");
            } else if (errorMessage?.includes("OTP has expired")) {
              throw new Error("کد وارد شده منقضی شده است!");
            } else if (
              errorMessage?.includes("authentication code is NOT correct")
            ) {
              throw new Error("کد وارد شده اشتباه است!");
            } else {
              throw new Error("خطا در تغییر گذرواژه. لطفاً دوباره تلاش کنید.");
            }
          case 500:
            throw new Error("خطای سرور. لطفاً دوباره تلاش کنید.");
          default:
            throw new Error("خطا در تغییر گذرواژه. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطای ناشناخته. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function sendOtp(email: string, phoneNumber: string) {
  try {
    const response = await apiClient.get("/iam/users/retrieve-otp", {
      params: { email, phone_number: phoneNumber },
    });

    switch (response.status) {
      case 200:
        return response.data;

      default:
        throw new Error("خطای ناشناخته. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as {
        response?: { status: number; data?: { message?: string } };
      };
      console.log(axiosError);
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            const errorMessage = axiosError.response.data?.message;
            if (errorMessage?.includes("Validation errors")) {
              throw new Error("داده‌های ارسالی نامعتبر هستند.");
            } else if (errorMessage?.includes("NOT found")) {
              throw new Error("کاربری با این ایمیل یافت نشد.");
            } else if (errorMessage?.includes("NOT correct")) {
              throw new Error("شماره تلفن وارد شده صحیح نیست.");
            } else {
              throw new Error("خطا در ارسال کد. لطفاً دوباره تلاش کنید.");
            }
          case 500:
            throw new Error("خطای سرور. لطفاً دوباره تلاش کنید.");
          default:
            throw new Error("خطا در ارسال کد. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطای ناشناخته. لطفاً دوباره تلاش کنید.");
    }
  }
}
