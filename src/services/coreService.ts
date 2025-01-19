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

export async function getGenres() {
  try {
    const response = await apiClient.get("/core/common/Genres");

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در دریافت ژانرها. لطفاً دوباره تلاش کنید.");
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
              throw new Error("هیچ ژانری یافت نشد!");
            } else {
              throw new Error("خطا در دریافت ژانرها. لطفاً دوباره تلاش کنید.");
            }
          default:
            throw new Error("خطا در دریافت ژانرها. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید!");
      }
    } else {
      throw new Error("خطا در دریافت ژانرها. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function addBook(
  token: string,
  title: string,
  price: number,
  off: number,
  format: string,
  descriptions: string,
  publishDate: string,
  book_likes: number = 0,
  book_views: number = 0
) {
  try {
    const response = await apiClient.post("/core/admin/new-book", {
      token,
      title,
      price,
      is_off: off,
      book_likes,
      book_views,
      format,
      descriptions,
      publish_date: publishDate,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در ایجاد کتاب. لطفاً دوباره تلاش کنید.");
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
            } else {
              throw new Error("خطا در ایجاد کتاب. لطفاً دوباره تلاش کنید.");
            }
          default:
            throw new Error("خطا در ایجاد کتاب. لطفاً دوباره تلاش کنید.");
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ایجاد کتاب. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function addAuthorToBook(
  token: string,
  bookId: number,
  authorId: number
) {
  try {
    const response = await apiClient.post("/core/admin/book-author", {
      token,
      book_id: bookId,
      author_id: authorId,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error(
          "خطا در ایجاد نویسنده برای کتاب. لطفاً دوباره تلاش کنید."
        );
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
              throw new Error(
                "نویسنده‌ی مورد نظر در لیست نویسندگان کتاب موجود میباشد!"
              );
            } else {
              throw new Error(
                "خطا در ایجاد نویسنده برای کتاب. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در ایجاد نویسنده برای کتاب. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error(
        "خطا در ایجاد نویسنده برای کتاب. لطفاً دوباره تلاش کنید."
      );
    }
  }
}

export async function addPublisherToBook(
  token: string,
  bookId: number,
  publisher_id: number
) {
  try {
    const response = await apiClient.post("/core/admin/book-publisher", {
      token,
      book_id: bookId,
      publisher_id,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در ایجاد ناشر برای کتاب. لطفاً دوباره تلاش کنید.");
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
              throw new Error(
                "ناشر مورد نظر در لیست ناشران کتاب موجود میباشد!"
              );
            } else {
              throw new Error(
                "خطا در ایجاد ناشر برای کتاب. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در ایجاد ناشر برای کتاب. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ایجاد ناشر برای کتاب. لطفاً دوباره تلاش کنید.");
    }
  }
}

export async function addCategoryToBook(
  token: string,
  bookId: number,
  categoryId: number
) {
  try {
    const response = await apiClient.post("/core/admin/book-category", {
      token,
      book_id: bookId,
      category_id: categoryId,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error(
          "خطا در ایجاد دسته بندی برای کتاب. لطفاً دوباره تلاش کنید."
        );
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
              throw new Error(
                "دسته بندی مورد نظر در لیست دسته بندی های کتاب موجود میباشد!"
              );
            } else {
              throw new Error(
                "خطا در ایجاد دسته بندی برای کتاب. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در ایجاد دسته بندی برای کتاب. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error(
        "خطا در ایجاد دسته بندی برای کتاب. لطفاً دوباره تلاش کنید."
      );
    }
  }
}

export async function addGenreToBook(
  token: string,
  bookId: number,
  genreId: number
) {
  try {
    const response = await apiClient.post("/core/admin/book-genre", {
      token,
      book_id: bookId,
      genre_id: genreId,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error("خطا در ایجاد ژانر برای کتاب. لطفاً دوباره تلاش کنید.");
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
              throw new Error(
                "ژانر مورد نظر در لیست ژانر های کتاب موجود میباشد!"
              );
            } else {
              throw new Error(
                "خطا در ایجاد ژانر برای کتاب. لطفاً دوباره تلاش کنید."
              );
            }
          default:
            throw new Error(
              "خطا در ایجاد ژانر برای کتاب. لطفاً دوباره تلاش کنید."
            );
        }
      } else {
        throw new Error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      }
    } else {
      throw new Error("خطا در ایجاد ژانر برای کتاب. لطفاً دوباره تلاش کنید.");
    }
  }
}
