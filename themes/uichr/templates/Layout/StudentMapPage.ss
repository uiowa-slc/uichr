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
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="content <% if $Children || $Parent %>col-lg-8 children<% else %>col-md-10 col-md-offset-1<% end_if %>">

				<div id="map" style="width:1010px;height:600px;"></div>

				<% loop $Students %>
				<div class="students" data-name="$Name" data-title="$Title" data-internship="$Internship" data-internshiplink="$InternshipLink" data-content="$Content" <% if $Image %>data-image="$Image.URL"<% end_if %> data-lat="$Lat" data-lng="$Lng"> 
				$InternshipLink
				</div>
				<% end_loop %>

				$Content
				$Form
				<% include ChildPages %>
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<% include SideBar %>
			<% end_if %>
		</div><!-- end .row -->
	</section>
</main><!-- end .container -->

<% include Initiatives %>

<script id="info-window-template" type="text/x-handlebars-template">
	<div class="info-window">
		{{#if ImageURL}}<img src="{{ImageURL}}" alt="" role="presentation" />{{/if}}
		<p>{{Name}} - {{Title}}</p>
		<p>{{Internship}} - {{InternshipLink}}</p>
		{{{Content}}}
	</div>			
</script>

<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBCHMZeNAs_TKVb44f1XIEqCD-BIt5QaM4"></script>

