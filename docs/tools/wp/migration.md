# Migration

This wordpress tool helps you import and export of your wordpress site


#### How does import work ?
It basically import data from zip file, database from sql file inside zip file and update all the old links with current link in database.

#### How does Export work ?
First it generate a sql file and then create a zip file with all files in the wordpress root directory.

```bash
webli tools wordpress migration
```

## Import

1. Create a folder inside your `www, html or htdocs folder` and then inside that folder open your terminal and type the above command.

2. Then Select `File` option.

3. Select the `zipfile` from which you want to import.

4. After that it will prompt you to `Enter your database host`. The database host is generally `localhost` but some web server uses different host for security purpose. Enter your database host if yours is different else leave it to default `localhost`.

5. Then it will ask for `Enter your database name`, here you need to enter database name you want to use for your project. If database name already exists in `phpmyadmin` it will select that or else it will create a new database with the name you provided in your phpmyadmin.

6. Then `Enter your database user`, here you need to enter the database user name associated with your database or you can also use the username of your phpmyadmin. Default is `root`.

7. Then `Enter your database password`, here you need to enter the database password associated with your database or you can also use the password of your phpmyadmin.

8. Then `Enter your old domain`, here you need to enter the old site link from where you have exported the zip file. It's required to update all the old links in database automatically. E.g http://localhost/oldsite , http://oldsite.com

9. Then `Enter your new domain`, here you need to enter the new domain you want to use. E.g http://localhost/newsite , http://newsite.com *Note: If you are createing this in your localhost your folder name and localhost link should be same and in lowercase. 


## Export

1. Open your terminal inside your wordpress root directory.

2. Type the above command.

3. Select `Export a site`

4. Now just enter the  `Name of the export file`.

*Shortcut: `webli t wp m`*