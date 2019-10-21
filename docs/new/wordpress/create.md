# Create

This will help you create a wordpress starter project. To create a wordpress project go to your www, html or htdocs folder and then open your terminal there and type

```bash
webli new wordpress create
```
1. You will be prompted with `Are you on your www, html, htdocs folder ?` click yes if you do or no to exit. Default is `Yes`.

2. After that it will ask `Enter your site name`, here enter the name of your wordpress project. Basically it will create a folder with the project name in your www, html or htdocs folder. Default is `webli`

3. Then it will ask for `Enter your database name`, here you need to enter database name you want to use for your project. If database name already exists in `phpmyadmin` it will select that or else it will create a new database with the name you provided in your phpmyadmin.

4. Then `Enter your database user`, here you need to enter the database user name associated with your database or you can the use the username of your phpmyadmin. Deafult is `root`.

5. Then `Enter your database password`, here you need to enter the database password associated with your database or you can the use the password of your phpmyadmin.

6. Then `Enter your website url`, here enter the url you want to use for the project. If you are building the project on your local machine you need to enter http://localhost/nameoftheproject else enter the url from where you can access the project like http://www.wpsite.com or http://www.wpsite.com/subdirectory. Note: nameoftheproject should be same name you used for `Enter your site name`. e.g http://localhost/webli.

7. Now after that `Enter your site title`, `Enter your Admin Username`, `Enter your desire Admin Password` and `Enter your Admin Email` for your wordpress project. Note:  The Password should be 8 characters and must contain a special character

This will automatically create a wordpress project for you. Now no need to download wordpress then extract it and then create a database and assign it. This is simple interface to create a wordpress project in your machine.

*Shortcut: `webli n wp c`*