<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
			</section>
			<% include ChildPages %>
		</div><!-- end .col -->

		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-3  col-lg-pull-9 sidebar">
				<% include SideNav %>
				<% include Testimonial %>
			</div>
		<% end_if %>
	</div><!-- end .row -->
</main><!-- end .container -->
<!-- Show news articles with similar tags -->
<% if $RelatedNewsEntries %>
<div class="relatednews">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<aside>
					<h2>Related News</h2>
					<% loop $RelatedNewsEntries(3) %>
						<% include RelatedNewsContent %>
					<% end_loop %>
				</aside>
			</div>
		</div>
	</div>
</div>
<% end_if %><!-- end related news -->
<% include PhotoGallery %>
<% include Enroll %>
