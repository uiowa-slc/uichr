<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">
		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				<div class="vevent">

					<% with CurrentDate %>
						<p class="dates">$DateRange<% if StartTime %> $TimeRange<% end_if %></p>
						<p><a href="$ICSLink" title="<% _t('CalendarEvent.ADD','Add to Calendar') %>">Add this to Calendar</a></p>
					<% end_with %>

					$Content

					<% if OtherDates %>
					<div class="event-calendar-other-dates">
					 <h4><% _t('CalendarEvent.ADDITIONALDATES','Additional Dates for this Event') %></h4>
					 <ul>
					   <% loop OtherDates %>
					   <li><a href="$Link" title="$Event.Title">$DateRange<% if StartTime %> $TimeRange<% end_if %></a></li>
					   <% end_loop %>
					 </ul>
					</div>
					<% end_if %>
				</div>
			</section>
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