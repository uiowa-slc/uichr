<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">
		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-3 sidebar">
				<% include SideNav %>
			</div>
		<% end_if %>

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form

				<% if Events %>
				<div id="event-calendar-events">
					<% include EventList %>
				</div>
				<% else %>
					<p>There are no upcoming events.</p>
				<% end_if %>
			</section>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->
<% include PhotoGallery %>
<% include InteriorEventList %>
<% include Enroll %>

