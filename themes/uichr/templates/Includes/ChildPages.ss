<!-- Loop Children -->
<% if $Children %>
	<br />
	<% loop $Children %>
		<section class="child-block <% if $PageSummaryImg %>withphoto<% end_if %>">
			<a href="$Link" class="blocklink">
				<% if $PageSummaryImg %>
					<img src="$PageSummaryImg.Fill(250,225).URL" alt="" class="child-block-img">
				<% end_if %>
				<div class="child-block-content">
					<h3 class="title">$Title</h3>
					<% if $PageSummary %>
						<p>$PageSummary.LimitCharacters(180)</p>
						<span class="link">Learn More</span>
					<% else %>
						<p>$Content.LimitCharacters(180)</p>
						<span class="link">Learn More</span>
					<% end_if %>
				</div>
			</a>
		</section>
	<% end_loop %>
<% end_if %>
<!-- end Loop Children -->