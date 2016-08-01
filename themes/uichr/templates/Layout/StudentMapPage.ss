<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">$Title</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
			<% include HeaderPhoto %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">

			<%-- Sub Navigation --%>
			<% if $Children || $Parent %>
				<% include SideNav %>
			<% end_if %>

			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="content <% if $Children || $Parent %>col-lg-8 children<% else %>col-md-10 col-md-offset-1<% end_if %>">

				$Content
				$Form

			</div><!-- end .col -->

			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<% include SideBar %>
			<% end_if %>
		</div><!-- end .row -->
	</section>
</main><!-- end .container -->
<div id="map" style="width:100%;height:0;padding-top: 56.25%;"></div>

<% loop $Students %>
<div class="students" data-name="$Name" data-title="$Title" data-internship="$Internship" data-content="$Content" <% if $Image %>data-image="$Image.SetWidth(150).URL"<% end_if %> data-lat="$Lat" data-lng="$Lng">
<%-- $InternshipLink --%>
</div>
<% end_loop %>

<script id="info-window-template" type="text/x-handlebars-template">
	<div class="info-window">
		{{#if ImageURL}}<img src="{{ImageURL}}" alt="" role="presentation" />{{/if}}
		<p><strong>{{Name}}</strong><br>{{Title}}</p>
		<p>{{Internship}}</p>

		{{{Content}}}
	</div>
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCHMZeNAs_TKVb44f1XIEqCD-BIt5QaM4"></script>

