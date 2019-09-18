<% with $StartDateTime %>
	<time itemprop="startDate" datetime="$URLDatetime">
		$Format(MMMM d)
	</time>
	at $Format("h:mm a")
<% end_with %>
<% if $EndTime %>
	<% with $EndTime %>
		to $Format("h:mm a")
	<% end_with %>
<% end_if %>
<% if $EndDate %>
	until
	<% with $EndDate %>
		<time itemprop="endDate" datetime="$URLDatetime">
			$Format(MMMM d)
		</time>
		 $Format("h:mm a")
	<% end_with %>
<% end_if %>