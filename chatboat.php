<?php
// The URL of the external page
$url = 'https://page.botpenguin.com/666fea4f94b240aeed09bf93/666fe110129bd5910726fc7b';

// Use file_get_contents to fetch the page content
$pageContent = file_get_contents($url);

if ($pageContent !== false) {
    // Output the content
    echo $pageContent;
} else {
    echo 'Unable to load the chatbot page.';
}
?>
