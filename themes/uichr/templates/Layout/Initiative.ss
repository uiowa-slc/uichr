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
<%-- Show random initiative pages --%>
<div class="initiatives">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h2 class="text-center">More Initiatives</h2>
				<% with $Page(what-we-do) %>
					<ul class="justify justify-3">
					<% loop $Children.Limit(3) %>
						<li class="justify-item">$Title</li>
					<% end_loop %>
						<li class="justify-item justify-filler"></li>
					</ul>
				<% end_with %>
			</div>
		</div>
	</div>
</div>