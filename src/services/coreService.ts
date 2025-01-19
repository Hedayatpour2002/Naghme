import apiClient from "@/utils/axiosInstance";

export async function addAuthor(token: string, authorName: string) {
  try {
    const response = await apiClient.post("/core/admin/new-author", {
      token,
      author_name: authorName,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در افزدون نویسنده. لطفاً دوباره تلاش کنید!");
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
              throw new Error("داده‌های ارسالی نامعتبر هستند!");
            } else if (errorMessage?.includes("token is expired")) {
              throw new Error(
                "توکن ارسالی نامعتبر میباشد. لطفا دوباره وارد حساب خود شوید!"
              );
            } else if (errorMessage?.includes("Access denied")) {
              throw new Error("شما مجوز دسترسی به این صفحه را ندارید!");
            } else if (
              errorMessage?.includes("Your access (as Admin) has been revoked")
            ) {
              throw new Error("شما دیگر مجوز دسترسی به این صفحه را ندارید!");
            } else if (errorMessage?.includes("already exists")) {
              throw new Error("نویسنده ای با این نام وجود دارد!");
            } else {
              throw new Error("خطا در افزدون نویسنده. لطفاً دوباره تلاش کنید!");
            }
          default:
            throw new Error("خطا در افزدون نویسنده. لطفاً دوباره تلاش کنید!");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا در افزدون نویسنده. لطفاً دوباره تلاش کنید!");
    }
  }
}

export async function addPublisher(token: string, publisherName: string) {
  try {
    const response = await apiClient.post("/core/admin/new-publisher", {
      token,
      publisher_name: publisherName,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا درافزودن ناشر. لطفاً دوباره تلاش کنید.");
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
              throw new Error("داده‌های ارسالی نامعتبر هستند!");
            } else if (errorMessage?.includes("token is expired")) {
              throw new Error(
                "توکن ارسالی نامعتبر میباشد. لطفا دوباره وارد حساب خود شوید!"
              );
            } else if (errorMessage?.includes("Access denied")) {
              throw new Error("شما مجوز دسترسی به این صفحه را ندارید!");
            } else if (
              errorMessage?.includes("Your access (as Admin) has been revoked")
            ) {
              throw new Error("شما دیگر مجوز دسترسی به این صفحه را ندارید!");
            } else if (errorMessage?.includes("already exists")) {
              throw new Error("ناشری با این نام وجود دارد!");
            } else {
              throw new Error("خطا درافزودن ناشر. لطفاً دوباره تلاش کنید.");
            }
          default:
            throw new Error("خطا درافزودن ناشر. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا درافزودن ناشر. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function getAuthors() {
  try {
    const response = await apiClient.get("/core/common/Authors");

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در دریافت نویسنده ها. لطفاً دوباره تلاش کنید.");
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
            if (errorMessage?.includes("NOT found")) {
              throw new Error("هیچ نویسنده ای یافت نشد!");
            } else {
              throw new Error(
                "خطا در دریافت نویسنده ها. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در دریافت نویسنده ها. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا در دریافت نویسنده ها. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function getPublishers() {
  try {
    const response = await apiClient.get("/core/common/Publishers");

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در دریافت ناشرها. لطفاً دوباره تلاش کنید.");
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
            if (errorMessage?.includes("NOT found")) {
              throw new Error("هیچ ناشری یافت نشد!");
            } else {
              throw new Error("خطا در دریافت ناشرها. لطفاً دوباره تلاش کنید.");
            }
          default:
            throw new Error("خطا در دریافت ناشرها. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا در دریافت ناشرها. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function getCategories() {
  try {
    const response = await apiClient.get("/core/common/Categories");

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در دریافت دسته بندی ها. لطفاً دوباره تلاش کنید.");
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
            if (errorMessage?.includes("NOT found")) {
              throw new Error("هیچ دسته بندی ای یافت نشد!");
            } else {
              throw new Error(
                "خطا در دریافت دسته بندی ها. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در دریافت دسته بندی ها. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا در دریافت دسته بندی ها. لطفاً دوباره تلاش کنید.");
    }
  }
}
