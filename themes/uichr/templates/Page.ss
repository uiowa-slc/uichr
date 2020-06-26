<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
	<% include GoogleTagManager %>
	<% base_tag %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="<% if $MetaDescription %>$MetaDescription<% else %>$Content.LimitCharacters(150).ATT<% end_if %>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title | $SiteConfig.Title<% end_if %></title>

	<!-- Favicon -->
	<% include Favicon %>

	<!-- CSS -->
	<link rel="stylesheet" href="{$ThemeDir}/css/master.css" />

    <!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

</head>
<body class="$ClassName shifter">
	<% include GoogleTagManagerNoscript %>
	<% include Svg %>
	<div class="shifter-page">
		<a href="#main-content" class="skip-link">Skip to the main content</a>
		<a href="#primary-nav" class="skip-link">Skip to the main navigation</a>
        <% include UiowaBar %>
		<% include Header %>
		$Layout
		<% include Footer %>
	</div>

	<!-- Mobile Navigation Slideout -->
	<% include ShifterNavigation %>



	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="{$ThemeDir}/js/build/production.min.js"></script>

</body>
</html>