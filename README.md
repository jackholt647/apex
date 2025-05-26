# Project Title

This is a brief description of the project.

## Loading `training.css` and `training.js`

The files `training.css` and `training.js` are loaded directly into a PHP web application. This is done by fetching the raw files from this GitHub repository.

The following PHP code snippet demonstrates how these files are loaded:

```php
<?php
function load_raw_github($filename) {
    $base_url = 'https://raw.githubusercontent.com/jackholt647/apex/main/';
    $url = $base_url . $filename;
    $content = @file_get_contents($url);
    return $content ? $content : "/* Failed to load $filename */";
}

// Inline CSS
echo "<style>" . load_raw_github("training.css") . "</style>";

// Inline JS
echo "<script>" . load_raw_github("training.js") . "</script>";
?>
```

**Note:** The specific training application that utilizes these files is scheduled to be rewritten.
