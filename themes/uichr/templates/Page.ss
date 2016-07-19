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
	<%-- Favicon --%>
	<% include Favicon %>
	<%-- CSS --%>
	<link rel="stylesheet" href="{$ThemeDir}/css/master.css" />
	<%-- Typekit --%>
	<% include TypeKit %>
	<%-- Picturefill --%>
	<script src="https://cdn.rawgit.com/scottjehl/picturefill/3.0.2/dist/picturefill.min.js" async></script>
	<!--[if IE 9]>
		<script>var IE9 = true;</script>
		<script src="{$ThemeDir}/js/ie/site.ie9.js"></script>
	<![endif]-->
	<!--[if lt IE 9]>
		 <script src="{$ThemeDir}/js/ie/html5shiv.js"></script>
		 <script src="{$ThemeDir}/js/ie/respond.min.js"></script>
	<![endif]-->
</head>
<body class="$ClassName shifter">
	<% include GoogleAnalytics %>
	<% include Svg %>
	<div class="shifter-page">
		<a href="#main-content" class="skip-link">Skip to the main content</a>
		<a href="#primary-nav" class="skip-link">Skip to the main navigation</a>
		<% include Header %>
		$Layout
		<% include Footer %>
	</div>

	<!-- Mobile Navigation Slideout -->
	<% include ShifterNavigation %>


	<%-- JS --%>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="{$ThemeDir}/js/build/production.min.js"></script>
	$BetterNavigator
</body>
</html>