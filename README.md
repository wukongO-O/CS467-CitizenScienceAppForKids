# CS467-CitizenScienceApp
To run the server on http://127.0.0.1:5000
- Navigate to project directory
- Create/activate virtual environment

    ```bash
    python -m venv venv
    ```

    - On Mac: 

    ```bash
    source venv/bin/activate
    ```  

    - On Windows: 

    ```bash
    venv\Scripts\activate
    ```

- Install dependencies
    - For Python3: 
    
    ```bash    
    pip3 install -r requirements.txt
    ```
  
- Create database and tables 
    ```bash
    flask --app main db upgrade
    ```

- Run Flask server
    ```bash
    flask --app main run
    ```


# To interact with REST API:
- Create/activate a virtual environment (see commands above)
- Install flask_swagger_ui package
    ```bash
    pip3 install flask_swagger_ui
    ```
  - Start Flask server 
      ```bash
      flask --app main run
      ```
  
    - Open http://127.0.0.1:5000/swagger:
    ![alt text](backend/static/swaggerUI.png "API UI")
      - Click open an API endpoint, customize parameters to try it out  
        - To request data, send a http request to `http://127.0.0.1:5000`. For example,
          - If `curl` is installed, you can use `curl` command to send a post request to add a new observation (customize parameters for your application):
            ```bash
            curl -X 'POST' \
              'http://127.0.0.1:5000/observations' \
              -H 'accept: application/json' \
              -H 'Content-Type: application/json' \
              -d '{
              "project_id": 5,
              "anon_user_id": 2,
              "data": {"test":"test"}
            }'
            ```
          - To use the same example request via React Native fetch:
            ```js
            fetch('http://127.0.0.1:5000/observations', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                project_id: 5,
                anon_user_id: 2,
                data: {"test":"test"}
              })
            })
            ```
-  [Summary of API endpoints](backend/static/API_documentation.md)


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
