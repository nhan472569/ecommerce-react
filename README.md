# Bookstore App 📚

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

## How to get started

1. Create .env file in _server_ directory
2. Input mandatory information includes:

| Variable Name         | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| NODE_ENV              | Production or development                                         |
| PORT                  | Running port                                                      |
| DATABASE              | Database connection string ==replace password with _<PASSWORD>_== |
| DATABASE_PASSWORD     | Database connection password                                      |
| JWT_SECRET            | JWT secret                                                        |
| JWT_EXPIRES_IN        | JWT expiration time                                               |
| JWT_COOKIE_EXPIRES_IN | Cookie expiration time                                            |
| CORS_DOMAIN           | Allowed cross-origin domain                                       |
| EMAIL_HOST            | Nodemailer host option                                            |
| EMAIL_PORT            | Nodemailer port                                                   |
| EMAIL_USERNAME        | Nodemailer credential                                             |
| EMAIL_PASSWORD        | Nodemailer credential                                             |
| EMAIL_FROM            | Nodemailer mail send from                                         |
| CLOUD_NAME            | Cloudinary credential                                             |
| API_KEY               | Cloudinary credential                                             |
| API_SECRET            | Cloudinary credential                                             |

3. From root directory, run in terminal:
   `cd server/`
   `npm start`
4. From root directory, run in terminal:
   `cd client/`
   `npm start`
