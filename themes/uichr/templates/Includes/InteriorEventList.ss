<% with $Page(calendar) %>
	<% if $AllChildren %>
		<div class="interiorEventList">
			<div class="container">
				<h3 class="eventlist-heading">Calendar</h3>
				<div class="interior-events">
					<% loop $AllChildren %>
						<div class="gallery-cell clearfix">
							<% loop $DateTimes %>
								<p class="eventlist-date">
									<% with $StartDate %>
										<span class="month">$Format(M)</span>$Format(j)<% end_with %><% if $EndDate && $EndDate != $StartDate %>&ndash;<% with $EndDate %>$Format(j)
										<% end_with %>
									<% end_if %>
									<if StartTime %>
										<span class="eventlist-time">$StartTime.Format("g:i a")<% if $EndTime %><% with $EndTime %>&ndash;$Format("g:i a")<% end_with %></span>
									<% end_if %>
								</p>
							<% end_loop %>
							<h3 class="eventlist-title">
								<a href="$Link">$Title</a>
							</h3>
						</div>
			    	<% end_loop %>
		    	</div>
		    	<a href="{$BaseHref}calendar/" class="calendarlink">Full Calendar</a>
		    </div>
	   </div>
    <% end_if %>
<% end_with %>