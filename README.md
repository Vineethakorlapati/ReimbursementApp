Expense Submission App
This is a small web app where employees can submit their expense receipts. It has a front-end made with Angular 19 and a back-end built using .NET 8 Web API.

What You Can Do
Fill a form to:

Pick a date for when you bought something

Enter how much it cost

Write a short description of what it was

Upload a receipt (photo or PDF)

Change the status (like approved or pending)

Delete a receipt if needed

All this data is saved in a database using SQLite

How to Use It
Back-End (.NET 8)
Open the ExpenseSubmissionApp folder in Visual Studio or VS Code

Run this command in terminal:

arduino
Copy
Edit
dotnet run
Front-End (Angular)
Go to the expense-app folder

Run these commands:

nginx
Copy
Edit
npm install
ng serve
About the Database
I used SQLite because it’s simple and easy to use. It will make the database file by itself when you run the app.

Tools I Used
Angular 19 – Good for making forms and web pages

.NET 8 Web API – Helps build the server-side part of the app

SQLite – A small database that doesn’t need setup

Problems I Had
File upload didn’t work at first between Angular and .NET

Fixed it by changing some settings (like CORS) and checking file size and type

Extra Info
I only allow .jpg, .png, and .pdf files

I kept the code simple so it’s easy to read and change

The app works well for small projects

"# ReimbursementApp" 
"# ReimbursementApp" 
"# ReimbursementApp" 
"# ReimbursementApp" 
"# expense-receipt-app" 
