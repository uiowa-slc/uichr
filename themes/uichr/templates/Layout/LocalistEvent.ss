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
			<div class="col-md-8">

				<% if $Dates.Count > 1 %><h5 class="event-title">Next Date:</h5><% else %><h5 class="event-title">Date and Time:</h5><% end_if %>
				<% if $Dates %>
					<% loop $Dates.Limit(1) %>
						<% include DateTimesList %>
					<% end_loop %>
				<% else %>
						No upcoming dates.
				<% end_if %>

				<%-- Venue --%>
				<% if $Venue.Title %>
					<h5 class="event-title">Venue:</h5>
					<p class="event-venue">$Venue.Title
					<% if $Venue.Address %><br>$Venue.Address<% end_if %>
					<% if $Venue.WebsiteLink %><br><a href="$Venue.WebsiteLink">View Map</a><% end_if %>
					</p>
				<% end_if %>

				<%-- Content --%>
				<% if $Content %>
					<h5 class="event-title">Event Description</h5>
					$Content
				<% end_if %>

				<%-- <p><strong>Link to events.uiowa:</strong><br>
					<a href="$LocalistLink">View event on events.uiowa.edu</a>
				</p> --%>

				<%-- Contact Info --%>
				<div class="row">
					<div class="col-md-6">
						<% if $ContactName %>
							<h5 class="event-title">Contact Name:</h5>
							<p>$ContactName</p>
						<% end_if %>
					</div>
					<div class="col-md-6">
						<% if $ContactEmail %>
							<h5 class="event-title">Contact Email:</h5>
							<p><a href="mailto:$ContactEmail">$ContactEmail</a></p>
						<% end_if %>
					</div>
				</div>

				<% if $Cost %>
					<p><strong>Cost:</strong> $Cost </p>
				<% end_if %>

				<% if $Sponsor %>
					<p><strong>Sponsor:</strong><br> $Sponsor </p>
				<% end_if %>

				<% if $MoreInfoLink %>
					<p><a href="$MoreInfoLink" target="_blank" class="btn btn-default">More information</a></p>
				<% end_if %>

				<%-- Upcoming Dates --%>
				<% if $Dates.Count > 1 %>
					<h5 class="event-title">All Dates</h5>
					<ul>
					<% loop $Dates %>
						<li class="$FirstLast">
							<% include DateTimesList %>
						</li>
					<% end_loop %>
					</ul>
				<% end_if %>

			</div><!-- end .col -->
			<div class="col-md-4">
				<% if $Image %>
					<img src="$Image.URL" alt="$Title" class="right event-img">
				<% else_if $Venue.ImageURL %>
					<img src="$Venue.ImageURL" alt="$Title" class="right event-img">
				<% end_if %>
				<p><a href="{$LocalistLink}.ics">Add to iCal or Outlook</a></p>
			</div>

		</div><!-- end .row -->
	</section>
</main><!-- end .container -->
<% if RelatedEvents %>
	<div class="relatedevents">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<h2 class="relatedevents-title">Related Events</h2>
					<ul class="justify justify-2">
						<% loop RelatedEvents.Limit(4) %>
							<li class="justify-item">
								<% include EventCard %>
							</li>
						<% end_loop %>
						<li class="justify-item justify-filler"></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
<% end_if %>