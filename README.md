# Running Server (GO)

## 0. Installation Steps (if GO isn't installed)

Follow the steps below to install Go:
1. Visit the official Go website at [https://golang.org/dl/](https://golang.org/dl/).
2. Download the installation package for your operating system from the **Featured downloads** section.
3. Run the installer package and follow the on-screen instructions for your operating system.
4. After the installation is complete, run the following command(in a terminal) to check if installed properly:
   >`go version`
   >>If Go is installed correctly, it will display the installed Go version.

## 1. Running the server
1. Ensure you're in the /server directory.
   >You can do this by running the following command:
    >> `cd server`
2. Get all dependencies.
   >Run the following command:
    >> `go mod tidy`
3. Ensure the `.env` file is in the `/server` directory.
4. Run the following command to start the server:
   >`go run main.go`

## Alternatively, for live reloading in GO (nodemon-like)
1. Visit the official Air repository at [https://github.com/cosmtrek/air](https://github.com/cosmtrek/air).
2. Follow the instructions to install the air package
3. Verify the installation with the command:
   > `air -v`
4. To start live-reloading, in the /server directory, run the command:
   > `air`


