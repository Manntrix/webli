# Media

The media tool will help you in removing and regenerating the images.


```bash
webli tools wordpress media
```

#### Delete Duplicate Images

This tool is best to remove the duplicate images generated by the wordpress. This is one of the most frequently used tool by me. Whenever a image is uploaded from the backend it creates multiple images with different sizes for e.g if i upload a image with the name `abcd.jpg` it will also create `abcd-200x300.jpg`, `abcd-1200x600.jpg`, `abcd-500x200.jpg` and many more because of `set_post_thumbnail_size` defined in our theme or plugin. So to remove all those `abcd-200x300.jpg`, `abcd-1200x600.jpg`, `abcd-500x200.jpg` files you just need to select `Delete Duplicate Images` option from wordpress media tool.

#### Regenarate Thumbnails

This tool will regenerate the thumbnail images as per `set_post_thumbnail_size` defined in our theme and plugin.

*Shortcut: You can also use `webli t wp md` to open the wordpress tools*
