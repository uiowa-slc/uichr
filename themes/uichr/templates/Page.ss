<!DOCTYPE html>
<!--[if lt IE 10]><html lang="en" class="lt-ie10 no-js"> <![endif]-->
<!--[if lt IE 9]><html lang="en" class="lt-ie9 no-js"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<% base_tag %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="<% if $MetaDescription %>$MetaDescription<% else %>$Content.LimitCharacters(150)<% end_if %>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title | $SiteConfig.Title<% end_if %></title>
	<script src="{$ThemeDir}/js/modernizr.js"></script>
	<!-- Favicon -->
	<link rel="shortcut icon" href="{$BaseHref}favicon.ico" type="image/x-icon">
	<!-- CSS -->
	<link rel="stylesheet" href="{$ThemeDir}/css/master.css" />
	<!-- Typekit -->
	<% include TypeKit %>
	<!-- Picturefill -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/picturefill/2.3.1/picturefill.min.js" async></script>
	<!--[if lt IE 9]>
		 <script src="{$ThemeDir}/js/ie/html5shiv.js"></script>
		 <script src="{$ThemeDir}/js/ie/respond.min.js"></script>
	<![endif]-->
</head>
<body class="$ClassName">
	<% include UiowaBarBootstrap %>
	<% include Header %>
	$Layout
	<% include Footer %>
<%-- For use with shifternavigation:
	<div class="shifter-page">
		<a id="skiptocontent" class="visuallyhidden focusable" href="#main-content">Skip to main content</a>
		<% include Header %>
		$Layout
		<% include Footer %>
	</div> --%>

	<!-- Mobile Navigation Slideout -->
	<%-- <% include ShifterNavigation %> --%>


	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="{$ThemeDir}/js/build/production.min.js"></script>
	<% include GoogleAnalytics %>
	$BetterNavigator
</body>
</html>