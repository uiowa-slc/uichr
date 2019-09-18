<p class="dates-times">
	<% if $Dates %>
		<% loop $Dates.Limit(1) %>
			<% with $StartDateTime %>
				<time itemprop="startDate" datetime="$URLDatetime" class="$FirstLast">$Format(MMMM d)</time>
			<% end_with %>
			<% if $EndDate %>
			 -
			<% with $EndDate %>
				<time itemprop="endDate" datetime="$URLDatetime" class="$FirstLast">$Format(MMMM d)</time>
			<% end_with %>
			<% end_if %>
		<% end_loop %>
	<% end_if %>
	<% if $Dates.Count > "1" %>
		<a href="$Link" class="button more-dates">more dates</a>
	<% end_if %>
</p>
