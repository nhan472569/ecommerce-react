# 📚 Bookstore App

A simple project of bookstore application.
Live demo here ➡️: [Bookstore App](https://bookstore-client-react.vercel.app/)

## Techstack

**Client side:**

- React (Create react app)
- Axios
- Formik
- Yup
- Swiper

**Server side:**

- Nodejs (v18.\*)
- Express
- MongoDB
- Cloudinary
- JWT
- Nodemailer

**[⬆ back to top](#-bookstore-app)**

## 🤖 Functions

**⚙️ Admin Role** 

- Change password and account detail (current admin account).
- Manage books (create, modify, delete).
- Manage users (create, modify, delete).
- Delete user's comments (create, modify, delete).

**🙍 User Role**

- Change password
- Change account detail (avatar, email, username, ...).
- Rating and comment on book (can delete).
- Add book to wishlist.
- Add book to cart.

**🟰 Common**

- Sign up, login
- Search book by name.
- Skeleton loading.
- Scroll to top button.

**[⬆ back to top](#-bookstore-app)**

## How to get started

1. Create .env file in _server_ directory
2. Input mandatory information includes:

| Variable Name         | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| NODE_ENV              | Production or development                                             |
| PORT                  | Running port                                                          |
| DATABASE              | Database connection string. `Replace password with <PASSWORD> string` |
| DATABASE_PASSWORD     | Database connection password                                          |
| JWT_SECRET            | JWT secret                                                            |
| JWT_EXPIRES_IN        | JWT expiration time                                                   |
| JWT_COOKIE_EXPIRES_IN | Cookie expiration time                                                |
| CORS_DOMAIN           | Allowed cross-origin domain                                           |
| EMAIL_HOST            | Nodemailer host option                                                |
| EMAIL_PORT            | Nodemailer port                                                       |   
| EMAIL_USERNAME        | Nodemailer credential                                                 |
| EMAIL_PASSWORD        | Nodemailer credential                                                 |
| EMAIL_FROM            | Nodemailer mail send from                                             |
| CLOUD_NAME            | Cloudinary credential                                                 |
| API_KEY               | Cloudinary credential                                                 |
| API_SECRET            | Cloudinary credential                                                 |

3. From root directory, run in terminal:
```bash
cd server/
```
```bash
npm start
```
5. From root directory, run in terminal:
```bash
cd client/
```
```bash
npm start
```

**[⬆ back to top](#-bookstore-app)**
