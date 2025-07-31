# How to Deploy the Backend to Render

This guide will walk you through the process of deploying the backend of this application to Render.

## Prerequisites

* A GitHub account with the project repository.
* A Render account.

## Deployment Steps

1. **Create a new Web Service on Render:**
   - Log in to your Render account.
   - Click the "New +" button and select "Web Service".
   - Connect your GitHub account and select the repository for this project.

2. **Configure the Web Service:**
   - **Name:** Give your web service a name (e.g., `my-app-backend`).
   - **Root Directory:** Set the "Root Directory" to `backend`. This is important because our backend code is in the `backend` subdirectory.
   - **Environment:** Select "Node".
   - **Build Command:** The build command should be `npm install`.
   - **Start Command:** The start command should be `npm start`.

3. **Add Environment Variables:**
   - In the "Environment" section of your web service settings, click "Add Environment Variable".
   - Add the following environment variable:
     - **Key:** `JWT_SECRET`
     - **Value:** Your JWT secret. You can generate a strong secret using a tool like [https://www.grc.com/passwords.htm](https://www.grc.com/passwords.htm).

4. **Deploy:**
   - Click the "Create Web Service" button.
   - Render will now build and deploy your application. You can monitor the progress in the "Events" tab.

5. **Verify the Deployment:**
   - Once the deployment is complete, you will see a "Live" status.
   - You can access your deployed backend at the URL provided by Render (e.g., `https://my-app-backend.onrender.com`).
   - You can test the `/api/doctors` endpoint using a tool like Postman or `curl`. Remember to include the `x-auth-token` header with a valid JWT.

## Additional Notes

* **CORS:** The backend is configured to allow requests from any origin. For a production environment, you should restrict this to your frontend's domain.
* **Database:** This backend uses mock data. If you add a database, you will need to add the database connection string as an environment variable as well.
* **Troubleshooting:** If you encounter any issues, you can check the logs in the "Logs" tab of your web service on Render.
