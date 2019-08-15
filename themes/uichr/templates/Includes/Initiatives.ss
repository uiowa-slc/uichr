<%-- Show 3 random initiative pages if parent url equals what-we-do --%>
<% if $Parent.URLSegment=="what-we-do" %>
<div class="initiatives">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h2 class="text-center">More Initiatives</h2>
				<ul class="justify justify-3">
				<% loop $Parent.RandomChildren(3) %>
					<li class="justify-item">
						<a href="$Link" class="initiative-block">
							<div class="initiative-img">
								<div class="scale" style="background-image: url($PageSummaryImg.Fill(340,225).URL);"></div>
							</div>
							<div class="initiative-body">
								$Title
							</div>
						</a>
					</li>
				<% end_loop %>
					<li class="justify-item justify-filler"></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<% end_if %>

<%-- Show 3 random initiative pages if url equals what-we-do --%>
<%-- <% if $URLSegment=="what-we-do" %>
<div class="initiatives">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h2 class="text-center">More Initiatives</h2>
				<ul class="justify justify-3">
				<% loop $RandomChildren(3) %>
					<li class="justify-item">
						<a href="$Link" class="initiative-block">
							<div class="initiative-img">
								<div class="scale" style="background-image: url($PageSummaryImg.Fill(330,225).URL);"></div>
							</div>
							<div class="initiative-body">
								$Title
							</div>
						</a>
					</li>
				<% end_loop %>
					<li class="justify-item justify-filler"></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<% end_if %> --%>